import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const ADMIN_PIN = "sdo2026";
const STORAGE_BUCKET = "leaf-me-posters";

export default function Publish() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("sdo_publish_auth") === "true";
  });
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  const [fbPostUrl, setFbPostUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);
  const [publishedData, setPublishedData] = useState(null);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem("sdo_publish_auth", "true");
      setPinError("");
    } else {
      setPinError("Invalid PIN. Please try again.");
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    const targetUrl = fbPostUrl.trim();

    if (!targetUrl) {
      setStatusMessage({
        type: "error",
        text: "Please enter a Facebook post URL.",
      });
      return;
    }

    setIsProcessing(true);
    setStatusMessage(null);
    setPublishedData(null);

    try {
      // Step 1: Extract post data, image, and caption from Facebook link
      setProcessStep("Extracting post and image from Facebook...");
      const res = await fetch(
        `/api/fetch-fb-post?url=${encodeURIComponent(targetUrl)}`
      );
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.error || "Failed to extract Facebook post. Please check the link."
        );
      }

      if (!data.imageUrl) {
        throw new Error("Could not find a poster image in this Facebook post.");
      }

      // Step 2: Download image blob from Facebook CDN
      setProcessStep("Downloading full resolution image...");
      const imgRes = await fetch(data.imageUrl);
      if (!imgRes.ok) {
        throw new Error("Failed to download image from Facebook CDN.");
      }
      const imgBlob = await imgRes.blob();

      // Step 3: Upload image to Supabase Storage
      setProcessStep("Uploading poster to Supabase storage...");
      const fileName = `manual_${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, imgBlob, {
          contentType: imgBlob.type || "image/jpeg",
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw new Error(`Storage upload failed: ${uploadError.message}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(fileName);

      const finalImageUrl = publicUrlData?.publicUrl;
      if (!finalImageUrl) {
        throw new Error("Failed to retrieve public image URL.");
      }

      // Step 4: Insert row to Supabase Database
      setProcessStep("Saving record to database...");
      const { error: dbError } = await supabase.from("leaf_me_facts").insert([
        {
          title: data.title || "Leaf Me a Fact",
          caption: data.caption || null,
          image_url: finalImageUrl,
          fb_post_url: data.canonicalUrl || targetUrl,
          is_published: true,
          published_at: new Date().toISOString(),
        },
      ]);

      if (dbError) {
        throw new Error(`Database insert failed: ${dbError.message}`);
      }

      // Success
      setPublishedData({
        title: data.title || "Leaf Me a Fact",
        caption: data.caption,
        imageUrl: finalImageUrl,
        fbPostUrl: data.canonicalUrl || targetUrl,
      });

      setStatusMessage({
        type: "success",
        text: "Post has been published successfully and is now live on the website.",
      });

      setFbPostUrl("");
    } catch (err) {
      console.error("Publish error:", err);
      setStatusMessage({
        type: "error",
        text: err.message || "An unexpected error occurred during publishing.",
      });
    } finally {
      setIsProcessing(false);
      setProcessStep("");
    }
  };

  // PIN Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl">
          <div className="mb-5">
            <h1 className="text-lg font-semibold text-white tracking-tight">
              Publish Access
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Enter authorization PIN to continue.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="pin"
                className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5"
              >
                PIN Code
              </label>
              <input
                id="pin"
                type="password"
                maxLength={10}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError("");
                }}
                placeholder="Enter PIN"
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-600 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-rose-400 mt-1.5">{pinError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-xs py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              Verify PIN
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-neutral-800/80 text-center">
            <Link
              to="/"
              className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Dashboard (Single Input Only: Facebook URL)
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-4 sm:p-8 font-sans">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-800 mb-8">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-500 block mb-1">
              SDO Internal Portal
            </span>
            <h1 className="text-xl font-semibold text-white tracking-tight">
              Publish Leaf Me a Fact
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-xs text-neutral-400 hover:text-white transition-colors"
            >
              View Site
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsAuthenticated(false);
                sessionStorage.removeItem("sdo_publish_auth");
              }}
              className="text-xs text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
            >
              Lock
            </button>
          </div>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div
            className={`mb-6 p-4 rounded-lg text-xs leading-relaxed border ${
              statusMessage.type === "success"
                ? "bg-emerald-950/40 text-emerald-300 border-emerald-800/60"
                : "bg-rose-950/40 text-rose-300 border-rose-800/60"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{statusMessage.text}</span>
              {statusMessage.type === "success" && (
                <Link
                  to="/#about"
                  className="ml-3 font-semibold underline hover:text-white shrink-0"
                >
                  View on Website
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Single Input Form */}
        <form onSubmit={handlePublish} className="space-y-5">
          <div>
            <label
              htmlFor="fbPostUrl"
              className="block text-xs uppercase font-medium tracking-wider text-neutral-400 mb-2"
            >
              Facebook Post URL
            </label>
            <input
              id="fbPostUrl"
              type="url"
              required
              disabled={isProcessing}
              value={fbPostUrl}
              onChange={(e) => setFbPostUrl(e.target.value)}
              placeholder="https://www.facebook.com/share/p/..."
              className="w-full bg-neutral-900 border border-neutral-800 focus:border-emerald-600 rounded-lg px-3.5 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors disabled:opacity-50"
            />
            <p className="text-[11px] text-neutral-500 mt-2 leading-relaxed">
              Paste the Facebook post link. The system will automatically download the poster image, extract the caption, and publish it to the website showcase.
            </p>
          </div>

          <button
            type="submit"
            disabled={isProcessing || !fbPostUrl.trim()}
            className="w-full bg-emerald-700 hover:bg-emerald-600 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-medium text-sm py-3 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            {isProcessing
              ? processStep || "Publishing..."
              : "Publish to SDO Website"}
          </button>
        </form>

        {/* Published Success Card Preview */}
        {publishedData && (
          <div className="mt-8 pt-6 border-t border-neutral-800">
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-3">
              Published Preview
            </span>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
              {publishedData.imageUrl && (
                <img
                  src={publishedData.imageUrl}
                  alt={publishedData.title}
                  className="w-full max-h-96 object-contain bg-black/40 border-b border-neutral-800"
                />
              )}
              <div className="p-4 sm:p-5">
                <h2 className="text-base font-semibold text-white mb-2">
                  {publishedData.title}
                </h2>
                {publishedData.caption && (
                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed mb-4">
                    {publishedData.caption}
                  </p>
                )}
                <div className="flex items-center gap-3 pt-2">
                  <Link
                    to="/#about"
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    View in Showcase
                  </Link>
                  <a
                    href={publishedData.fbPostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
                  >
                    Open Facebook Post
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
