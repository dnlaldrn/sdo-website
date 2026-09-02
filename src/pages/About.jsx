import { useState, useEffect, useCallback } from "react";
import aboutImg from "../assets/AboutImage.png";
import { supabase } from "../lib/supabaseClient";

// Import local bundled Leaf Me a Fact infographics for offline/fallback
import firstImg from "../assets/LeafMe/First.jpg";
import secondImg from "../assets/LeafMe/Second.jpg";
import thirdImg from "../assets/LeafMe/Third.jpg";
import fourthImg from "../assets/LeafMe/Fourth.jpg";
import fifthImg from "../assets/LeafMe/Fifth.jpg";
import sixthImg from "../assets/LeafMe/Sixth.jpg";
import sevenImg from "../assets/LeafMe/Seven.jpg";
import eightImg from "../assets/LeafMe/Eight.jpg";
import nineImg from "../assets/LeafMe/Nine.jpg";

const SDO_FB_PAGE_URL = "https://www.facebook.com/profile.php?id=61587545961771";

const DEFAULT_SLIDES = [
  { id: 1, src: firstImg, title: "Leaf Me a Fact • Volume 1", fbPostUrl: SDO_FB_PAGE_URL },
  { id: 2, src: secondImg, title: "Leaf Me a Fact • Volume 2", fbPostUrl: SDO_FB_PAGE_URL },
  { id: 3, src: thirdImg, title: "Leaf Me a Fact • Volume 3", fbPostUrl: SDO_FB_PAGE_URL },
  { id: 4, src: fourthImg, title: "Leaf Me a Fact • Volume 4", fbPostUrl: SDO_FB_PAGE_URL },
  { id: 5, src: fifthImg, title: "Leaf Me a Fact • Volume 5", fbPostUrl: SDO_FB_PAGE_URL },
  { id: 6, src: sixthImg, title: "Leaf Me a Fact • Volume 6", fbPostUrl: SDO_FB_PAGE_URL },
  { id: 7, src: sevenImg, title: "Leaf Me a Fact • Volume 7", fbPostUrl: SDO_FB_PAGE_URL },
  { id: 8, src: eightImg, title: "Leaf Me a Fact • Volume 8", fbPostUrl: SDO_FB_PAGE_URL },
  { id: 9, src: nineImg, title: "Leaf Me a Fact • Volume 9", fbPostUrl: SDO_FB_PAGE_URL },
];

function extractImageUrl(rawUrl) {
  if (!rawUrl) return null;
  let targetUrl = rawUrl;
  if (typeof rawUrl === "string") {
    if (!rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
      try {
        const parsed = JSON.parse(rawUrl);
        targetUrl = parsed?.props?.url || parsed?.url || rawUrl;
      } catch {
        const match = String(rawUrl).match(/https:\/\/[^"'\s\\]+/);
        if (match) targetUrl = match[0];
      }
    }
  }
  return targetUrl || null;
}

function cleanTitle(rawTitle, fallbackIndex) {
  if (!rawTitle) return `Leaf Me a Fact • Volume ${fallbackIndex}`;
  let normalized = typeof rawTitle.normalize === "function" ? rawTitle.normalize("NFKD") : rawTitle;
  let cleaned = normalized
    .replace(/[\p{Extended_Pictographic}\p{Emoji_Presentation}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
  if (cleaned.length > 55) {
    cleaned = cleaned.substring(0, 52) + "...";
  }
  return cleaned || `Leaf Me a Fact • Volume ${fallbackIndex}`;
}

export default function About() {
  const [isOpen, setIsOpen] = useState(false);
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [isLiveFeed, setIsLiveFeed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  // Fetch dynamic Leaf Me a Fact posts from Supabase permanent storage
  useEffect(() => {
    async function fetchLeafMeFacts() {
      try {
        const { data, error } = await supabase
          .from("leaf_me_facts")
          .select("*")
          .eq("is_published", true)
          .order("published_at", { ascending: false })
          .limit(50);

        if (!error && data && data.length > 0) {
          const dbSlides = data.map((item, index) => {
            const parsedImg = extractImageUrl(item.image_url);
            // Append cachebuster to guarantee browser fetches fresh 843x1054 HD assets
            const hdSrc = parsedImg ? `${parsedImg}?v=hd2` : null;
            return {
              id: item.id || index + 1,
              src: hdSrc || DEFAULT_SLIDES[index % DEFAULT_SLIDES.length].src,
              title: cleanTitle(
                item.title,
                item.volume_number || data.length - index,
              ),
              caption: item.caption,
              fbPostUrl: item.fb_post_url,
              publishedAt: item.published_at,
            };
          });
          setSlides(dbSlides);
          setIsLiveFeed(true);
        }
      } catch (err) {
        console.warn("Using local Leaf Me facts fallback:", err);
      }
    }

    fetchLeafMeFacts();
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // Keyboard navigation: Escape to close, Left/Right arrows to swipe
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, handlePrev, handleNext]);

  // Touch Swipe Gesture Handlers (Mobile)
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    if (deltaX > 45) {
      handlePrev();
    } else if (deltaX < -45) {
      handleNext();
    }
    setTouchStartX(null);
  };

  return (
    <section
      id="about"
      className="w-full bg-[#F1F8E9] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 font-sans"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Narrative, Headline & Quick Impact Byte */}
        <div className="lg:col-span-6 flex flex-col space-y-3 text-left">
          {/* Eyebrow Category Tag */}
          <span className="text-[#1B5E20] font-bold text-xs uppercase tracking-widest">
            ABOUT SDO ALANGILAN
          </span>

          {/* Main Section Headline */}
          <h2 className="text-[#064e3b] font-md text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15]">
            Where Purpose, Policy, and Campus Action Connect
          </h2>

          {/* Core Descriptive Text */}
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed font-light">
            The Sustainable Development Office–Alangilan embeds sustainability
            at the heart of the campus’s academic and administrative functions,
            advancing regional and global commitments to the United Nations’ 17
            Sustainable Development Goals (SDGs).
          </p>

          {/* Quick Impact Byte Callout (DEVCON Inspo Layout) */}
          <div className="border-l-2 border-[#1B5E20] pl-4 sm:pl-5 space-y-2.5 py-1">
            <h3 className="text-[#064e3b] font-bold text-xs uppercase tracking-wider">
              QUICK IMPACT BYTE!
            </h3>
            <div className="text-gray-600 text-xs sm:text-sm leading-relaxed space-y-2">
              <p>
                <strong className="text-gray-800">Did you know?</strong> SDO
                Alangilan actively champions campus-wide sustainability
                campaigns—from energy conservation and responsible consumption
                to environmental education like the{" "}
                <em className="text-[#1B5E20] font-medium not-italic">
                  "Leaf Me a Fact"
                </em>{" "}
                advocacy series.
              </p>
              <p>
                We collaborate with academic departments, student leaders, and
                community partners to transform global sustainability goals into
                actionable local initiatives. If you are interested in
                collaborating or volunteering, connect with us and take part in
                our journey!
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: High-Impact Photography / Live Post Display (Option 1) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <button
            type="button"
            onClick={() => {
              setCurrentIndex(0);
              setIsOpen(true);
            }}
            aria-label="Open Leaf Me a Fact infographic gallery"
            className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group transition-all duration-300 hover:shadow-3xl cursor-pointer relative block focus:outline-none focus:ring-4 focus:ring-[#1B5E20]/30 text-left"
          >
            {/* Main Poster Image (Shows Latest Live Post or Clean Infographic Poster) */}
            <img
              src={slides[0]?.src || aboutImg}
              alt={slides[0]?.title || "SDO Alangilan Leaf Me a Fact Showcase"}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = DEFAULT_SLIDES[0]?.src || aboutImg;
              }}
              className="w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />

            {/* Top Live Badge */}
            <div className="absolute top-4 left-4 z-10">
              <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wide flex items-center gap-2 shadow-lg">
                <span>{isLiveFeed ? "Live from FB" : "Leaf Me a Fact"}</span>
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-between text-white">
              <div className="min-w-0 pr-2">
                <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider block">
                  Advocacy Series
                </span>
                <p className="text-xs sm:text-sm font-semibold truncate">
                  {slides[0]?.title || "Explore Leaf Me a Fact"}
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* =========================================================================
          LEAF ME A FACT GALLERY CAROUSEL LIGHTBOX MODAL
      ========================================================================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 md:p-8 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200 select-none"
          onClick={() => setIsOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar: Slide Counter & Close Button */}
          <div
            className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-50 pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gallery Info Pill */}
            <div className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wide flex items-center gap-2 shadow-lg">
              <span>Leaf Me a Fact</span>
              <a
                href={slides[currentIndex]?.fbPostUrl || SDO_FB_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 px-2 py-0.5 rounded-md bg-white/15 hover:bg-[#8BC34A] hover:text-[#041a0d] text-[10px] font-bold text-white transition-all inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Post</span>
                <span>↗</span>
              </a>
            </div>

            {/* Close 'X' Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xl"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Left Arrow Button (<) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-2 sm:left-6 z-50 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-2xl"
            aria-label="Previous image"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Centered Active Image Stage */}
          <div
            className="relative max-w-5xl max-h-[85vh] sm:max-h-[88vh] w-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={currentIndex}
              src={slides[currentIndex]?.src || DEFAULT_SLIDES[currentIndex % DEFAULT_SLIDES.length].src}
              alt={slides[currentIndex]?.title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = DEFAULT_SLIDES[currentIndex % DEFAULT_SLIDES.length]?.src || aboutImg;
              }}
              className="max-w-full max-h-[75vh] sm:max-h-[80vh] w-auto h-auto object-contain rounded-2xl shadow-2xl border-2 border-white/25 select-none transition-all duration-300"
            />

            {/* Bottom Dots Indicator Bar */}
            <div className="flex items-center gap-1 sm:gap-1.5 mt-3.5 sm:mt-4">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className="p-1 sm:p-1.5 cursor-pointer flex items-center justify-center group focus:outline-none"
                >
                  <span
                    className={`block transition-all duration-300 rounded-full ${
                      idx === currentIndex
                        ? "w-6 sm:w-8 h-2 bg-[#8BC34A] shadow-sm shadow-[#8BC34A]/50"
                        : "w-2 h-2 bg-white/35 group-hover:bg-white/70"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Arrow Button (>) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 sm:right-6 z-50 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-2xl"
            aria-label="Next image"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
