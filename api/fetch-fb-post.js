export default async function handler(req, res) {
  // Support both GET and POST
  const inputUrl = req.query?.url || req.body?.url;

  if (!inputUrl) {
    return res.status(400).json({ error: "URL query parameter is required" });
  }

  try {
    let targetUrl = inputUrl;

    // 1. Resolve 301/302 redirect header if this is a share URL
    try {
      const redirectRes = await fetch(inputUrl, {
        headers: {
          "User-Agent":
            "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
        },
        redirect: "manual",
      });

      if (redirectRes.status === 301 || redirectRes.status === 302) {
        const loc = redirectRes.headers.get("location");
        if (loc) {
          targetUrl = loc;
        }
      }
    } catch (e) {
      console.warn("Redirect resolution warning:", e.message);
    }

    // 2. Convert to mobile URL to access lightweight meta-rich page
    const mobileUrl = targetUrl.replace(
      /https?:\/\/(?:www\.|web\.)?facebook\.com/,
      "https://m.facebook.com"
    );

    // 3. Fetch mobile page with mobile browser user agent
    const pageRes = await fetch(mobileUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    const html = await pageRes.text();

    // 4. Extract OpenGraph image and description
    const imgMatch =
      html.match(/<meta\s+property=["']og:image["']\s+content=["']([\s\S]*?)["']/i) ||
      html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([\s\S]*?)["']/i);

    const descMatch =
      html.match(/<meta\s+property=["']og:description["']\s+content=["']([\s\S]*?)["']/i) ||
      html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);

    function decodeHtml(str) {
      return str
        .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
          String.fromCodePoint(parseInt(hex, 16))
        )
        .replace(/&#(\d+);/g, (_, dec) =>
          String.fromCodePoint(parseInt(dec, 10))
        )
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");
    }

    const imageUrl = imgMatch ? imgMatch[1].replace(/&amp;/g, "&") : null;
    const rawDesc = descMatch ? descMatch[1] : "";
    const caption = decodeHtml(rawDesc).trim();

    // Generate clean title from caption header
    let title = "Leaf Me a Fact";
    if (caption) {
      const cleanLines = caption
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      // Check if line 2 contains topic subtitle
      if (cleanLines.length >= 2 && cleanLines[1].length < 60) {
        title = `Leaf Me a Fact - ${cleanLines[1].replace(/^[^\w\s]+/, "").trim()}`;
      } else if (cleanLines.length >= 1) {
        title = cleanLines[0].substring(0, 60);
      }
    }

    return res.status(200).json({
      success: true,
      imageUrl,
      title,
      caption,
      canonicalUrl: targetUrl,
    });
  } catch (err) {
    console.error("API extract error:", err);
    return res.status(500).json({
      error: "Failed to extract Facebook post data",
      message: err.message,
    });
  }
}
