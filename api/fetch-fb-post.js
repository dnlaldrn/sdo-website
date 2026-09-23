export default async function handler(req, res) {
  const inputUrl = req.query?.url || req.body?.url;

  if (!inputUrl) {
    return res.status(400).json({ error: "URL query parameter is required" });
  }

  try {
    let targetUrl = inputUrl;

    // 1. If it's a share URL, resolve 301/302 redirect header
    if (inputUrl.includes("/share/")) {
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
          if (loc && !loc.includes("/login") && !loc.includes("checkpoint")) {
            targetUrl = loc;
          }
        }
      } catch (e) {
        console.warn("Redirect resolution warning:", e.message);
      }
    }

    // Clean tracking query parameters
    try {
      const urlObj = new URL(targetUrl);
      urlObj.searchParams.delete("rdid");
      urlObj.searchParams.delete("share_url");
      targetUrl = urlObj.toString();
    } catch (e) {}

    const mobileUrl = targetUrl
      .replace("www.facebook.com", "m.facebook.com")
      .replace("web.facebook.com", "m.facebook.com");
    const wwwUrl = targetUrl
      .replace("m.facebook.com", "www.facebook.com")
      .replace("touch.facebook.com", "www.facebook.com");

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

    function extractMeta(html) {
      if (!html) return { imageUrl: null, caption: "" };
      const imgMatch =
        html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
        html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i) ||
        html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i) ||
        html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i);

      const descMatch =
        html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i) ||
        html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:description["']/i) ||
        html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
        html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);

      const imageUrl = imgMatch ? imgMatch[1].replace(/&amp;/g, "&") : null;
      const caption = descMatch ? decodeHtml(descMatch[1]).trim() : "";
      return { imageUrl, caption };
    }

    const strategies = [
      {
        url: mobileUrl,
        ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
        name: "Mobile Safari",
      },
      {
        url: wwwUrl,
        ua: "Twitterbot/1.0",
        name: "Twitterbot",
      },
      {
        url: mobileUrl,
        ua: "WhatsApp/2.21.12.21 A",
        name: "WhatsApp",
      },
      {
        url: wwwUrl,
        ua: "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
        name: "FacebookExternalHit",
      },
      {
        url: wwwUrl,
        ua: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        name: "Googlebot",
      },
      {
        url: wwwUrl,
        ua: "Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)",
        name: "Slackbot",
      },
    ];

    let bestData = { imageUrl: null, caption: "" };

    for (const s of strategies) {
      try {
        const res = await fetch(s.url, {
          headers: {
            "User-Agent": s.ua,
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
          },
          redirect: "manual",
        });

        // Skip if redirected to login or checkpoint
        if (res.status === 301 || res.status === 302) {
          const loc = res.headers.get("location") || "";
          if (loc.includes("/login") || loc.includes("checkpoint")) {
            continue;
          }
        }

        if (res.status !== 200) continue;

        const html = await res.text();
        const meta = extractMeta(html);

        if (meta.caption && !bestData.caption) {
          bestData.caption = meta.caption;
        }

        if (meta.imageUrl) {
          bestData.imageUrl = meta.imageUrl;
          break;
        }
      } catch (err) {
        console.warn(`Strategy ${s.name} error:`, err.message);
      }
    }

    let title = "Leaf Me a Fact";
    if (bestData.caption) {
      const cleanLines = bestData.caption
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      if (cleanLines.length >= 2 && cleanLines[1].length < 60) {
        title = `Leaf Me a Fact - ${cleanLines[1].replace(/^[^\w\s]+/, "").trim()}`;
      } else if (cleanLines.length >= 1) {
        title = cleanLines[0].substring(0, 60);
      }
    }

    return res.status(200).json({
      success: true,
      imageUrl: bestData.imageUrl,
      title,
      caption: bestData.caption,
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
