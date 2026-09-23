import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function devFbExtractorPlugin() {
  return {
    name: "dev-fb-extractor",
    configureServer(server) {
      server.middlewares.use("/api/fetch-fb-post", async (req, res) => {
        try {
          const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
          const inputUrl = parsedUrl.searchParams.get("url");

          if (!inputUrl) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "URL query parameter is required" }));
            return;
          }

          let targetUrl = inputUrl;

          // 1. Resolve redirect if share link
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
          } catch {
            // ignore redirect error
          }

          // 2. Fetch using Twitterbot user agent first
          let html = "";
          try {
            const botRes = await fetch(targetUrl, {
              headers: {
                "User-Agent": "Twitterbot/1.0",
                Accept:
                  "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
              },
            });
            html = await botRes.text();
          } catch (err) {
            console.warn("Twitterbot dev fetch error:", err.message);
          }

          let imgMatch =
            html.match(/<meta\s+property=["']og:image["']\s+content=["']([\s\S]*?)["']/i) ||
            html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([\s\S]*?)["']/i);

          let descMatch =
            html.match(/<meta\s+property=["']og:description["']\s+content=["']([\s\S]*?)["']/i) ||
            html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);

          if (!imgMatch || !descMatch) {
            try {
              const fbRes = await fetch(targetUrl, {
                headers: {
                  "User-Agent":
                    "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
                  Accept:
                    "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                  "Accept-Language": "en-US,en;q=0.9",
                },
              });
              const fbHtml = await fbRes.text();
              if (!imgMatch) {
                imgMatch =
                  fbHtml.match(/<meta\s+property=["']og:image["']\s+content=["']([\s\S]*?)["']/i) ||
                  fbHtml.match(/<meta\s+name=["']twitter:image["']\s+content=["']([\s\S]*?)["']/i);
              }
              if (!descMatch) {
                descMatch =
                  fbHtml.match(/<meta\s+property=["']og:description["']\s+content=["']([\s\S]*?)["']/i) ||
                  fbHtml.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
              }
            } catch (fbErr) {
              console.warn("facebookexternalhit dev fallback error:", fbErr.message);
            }
          }

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

          let title = "Leaf Me a Fact";
          if (caption) {
            const cleanLines = caption
              .split("\n")
              .map((l) => l.trim())
              .filter((l) => l.length > 0);

            if (cleanLines.length >= 2 && cleanLines[1].length < 60) {
              title = `Leaf Me a Fact - ${cleanLines[1].replace(/^[^\w\s]+/, "").trim()}`;
            } else if (cleanLines.length >= 1) {
              title = cleanLines[0].substring(0, 60);
            }
          }

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              success: true,
              imageUrl,
              title,
              caption,
              canonicalUrl: targetUrl,
            })
          );
        } catch (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error: "Failed to extract post",
              message: err.message,
            })
          );
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), devFbExtractorPlugin()],
});
