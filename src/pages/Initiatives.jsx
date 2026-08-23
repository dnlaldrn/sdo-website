import { useEffect, useRef, useState } from "react";
import { acts } from "../../utils/initiativesData";

export default function Initiatives() {
  const scrollContainerRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const isInteractingRef = useRef(false);
  const [selectedInitiative, setSelectedInitiative] = useState(null);

  // Auto-scrolling loop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Position container initially in the middle third
    const loopWidth = container.scrollWidth / 3;
    if (loopWidth > 0) {
      container.scrollLeft = loopWidth;
      scrollPositionRef.current = loopWidth;
    }

    let animationFrameId;
    const speed = 0.85; // Smooth scroll speed in pixels per frame

    const scrollLoop = () => {
     if (!isInteractingRef.current && container) {
        scrollPositionRef.current += speed;

        const currentLoopWidth = container.scrollWidth / 3;
        if (currentLoopWidth > 0) {
          // Wrap boundaries
          if (scrollPositionRef.current >= currentLoopWidth * 2) {
            scrollPositionRef.current -= currentLoopWidth;
          } else if (scrollPositionRef.current <= currentLoopWidth * 0.5) {
            scrollPositionRef.current += currentLoopWidth;
          }
        }

        container.scrollLeft = scrollPositionRef.current;
      } else if (container) {
        // Sync our local float accumulator while the user is actively interacting/dragging
        scrollPositionRef.current = container.scrollLeft;
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);

    return () => cancelAnimationFrame(animationFrameId);
  }, []); // <- no longer depends on selectedInitiative

  // Touch, Drag and Wheel Interaction Handlers
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let interactionTimeout;
    let isDown = false;
    let startX;
    let scrollLeftVal;

    const startInteraction = () => {
      isInteractingRef.current = true;
      clearTimeout(interactionTimeout);
    };

    const endInteraction = () => {
      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        isInteractingRef.current = false;
      }, 2500);
    };

    const handleScroll = () => {
      if (!isInteractingRef.current) return;

      const loopWidth = container.scrollWidth / 3;
      if (loopWidth <= 0) return;

      let current = container.scrollLeft;
      let didWrap = false;

      if (current >= loopWidth * 2) {
        current -= loopWidth;
        didWrap = true;
      } else if (current <= loopWidth * 0.5) {
        current += loopWidth;
        didWrap = true;
      }

      if (didWrap) {
        container.scrollLeft = current;
      }

      scrollPositionRef.current = current;
    };

    // Trackpad horizontal scrolling / Wheel event
    const handleWheel = () => {
      startInteraction();
      endInteraction();
    };

    // Mouse drag scrolling handlers
    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeftVal = container.scrollLeft;
      startInteraction();
    };

    const handleMouseUp = () => {
      isDown = false;
      endInteraction();
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // Drag sensitivity modifier
      container.scrollLeft = scrollLeftVal - walk;
      scrollPositionRef.current = container.scrollLeft;
    };

    const handleMouseEnter = () => {
      isInteractingRef.current = true;
      clearTimeout(interactionTimeout);
    };

    const handleMouseLeave = () => {
      if (!isDown) {
        isInteractingRef.current = false;
      }
    };

    container.addEventListener("scroll", handleScroll);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("touchstart", startInteraction, {
      passive: true,
    });
    container.addEventListener("touchend", endInteraction, { passive: true });
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("touchstart", startInteraction);
      container.removeEventListener("touchend", endInteraction);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("wheel", handleWheel);
      clearTimeout(interactionTimeout);
    };
  }, []);

  // Keyboard navigation listener (< > or ArrowLeft ArrowRight)
  useEffect(() => {
    const container = scrollContainerRef.current;

    const handleKeyDown = (e) => {
      if (!container) return;

      // Ignore if user is currently typing in input elements
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      ) {
        return;
      }

      const scrollAmount = 430; // 3-Card width + gap spacing

      if (e.key === "ArrowRight" || e.key === "." || e.key === ">") {
        isInteractingRef.current = true;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        setTimeout(() => {
          isInteractingRef.current = false;
        }, 3000);
      } else if (e.key === "ArrowLeft" || e.key === "," || e.key === "<") {
        isInteractingRef.current = true;
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        setTimeout(() => {
          isInteractingRef.current = false;
        }, 3000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close modal on Escape key and lock body scroll
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSelectedInitiative(null);
      }
    };

    if (selectedInitiative) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [selectedInitiative]);

  return (
    <div
      id="initiatives"
      className="scroll-mt-16 bg-gradient-to-b from-white via-[#F1F8E9]/40 to-[#F1F8E9]/60 py-6 sm:py-8 lg:py-10 px-4 sm:px-6 font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* DEVCON-Style Header Section (Compact for 1-Screen View) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-4 sm:mb-6 gap-3 px-2">
          <div>
            <span className="text-[#1B5E20] text-xs font-bold uppercase tracking-widest block mb-1">
              WHAT WE RUN
            </span>
            <h2 className="text-[#064e3b] text-2xl sm:text-3xl lg:text-4xl font-md leading-tight tracking-tight">
              Featured Programs
            </h2>
          </div>
          <div className="lg:max-w-md">
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light lg:text-right">
              Year-round initiatives to educate, connect, and elevate sustainable practices across BatStateU Alangilan.
            </p>
          </div>
        </div>

        {/* Interactive 3-Card Marquee Track Wrapper */}
        <div className="relative overflow-hidden w-full py-2">
          {/* Subtle gradient edges to fade the scrolling list smoothly */}
          <div className="absolute left-0 top-0 bottom-0 w-10 md:w-20 bg-gradient-to-r from-[#F1F8E9]/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 md:w-20 bg-gradient-to-l from-[#F1F8E9]/90 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-none gap-5 sm:gap-6 py-1 select-none cursor-grab active:cursor-grabbing"
          >
            {/* Render items three times to build a truly seamless infinite scroll */}
            {[...acts, ...acts, ...acts].map((act, index) => (
              <div
                key={`${act.title}-${index}`}
                className="w-[300px] sm:w-[350px] md:w-[370px] lg:w-[390px] flex-shrink-0 transition-all duration-300"
              >
                <div
                  onClick={() => setSelectedInitiative(act)}
                  className="relative bg-white rounded-3xl overflow-hidden shadow-md group border border-gray-100/90 flex flex-col h-[390px] sm:h-[410px] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                >
                  {/* Image Area with Title and Category Overlays */}
                  <div className="relative h-[210px] sm:h-[225px] overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={act.image}
                      alt={act.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Dark gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

                    {/* Outlined Category Pill Badge (Top Left) */}
                    <span className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md text-[#064e3b] border border-[#1B5E20]/20 font-bold text-[10px] sm:text-[11px] tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
                      {act.category}
                    </span>

                    {/* Initiative Title Positioned at Bottom of Image */}
                    <div className="absolute bottom-3 left-3.5 right-3.5">
                      <h3 className="text-white text-base sm:text-lg font-bold tracking-tight uppercase leading-snug drop-shadow-sm group-hover:text-[#8BC34A] transition-colors duration-200 line-clamp-1">
                        {act.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content Body Area */}
                  <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3 font-light">
                      {act.description}
                    </p>

                    {/* Learn More Link (Appears on Hover with Smooth Transition) */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[#1B5E20] group-hover:text-[#064e3b] font-bold text-xs sm:text-sm tracking-wide uppercase flex items-center gap-1.5 transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
                        <span>Learn More</span>
                        <svg
                          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Minimalist Initiative Details Modal */}
      {selectedInitiative && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-initiative-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setSelectedInitiative(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] transition-all transform duration-300 animate-in fade-in zoom-in-95"
          >
            {/* Modal Image Header */}
            <div className="relative h-48 sm:h-56 w-full bg-gray-100 shrink-0">
              <img
                src={selectedInitiative.image}
                alt={selectedInitiative.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Category Badge on Image */}
              <span className="absolute bottom-3.5 left-4 sm:left-6 bg-white/95 backdrop-blur-sm text-[#064e3b] font-bold text-xs tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                {selectedInitiative.category}
              </span>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedInitiative(null)}
                aria-label="Close modal"
                className="absolute top-3.5 right-3.5 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
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

            {/* Modal Content Body */}
            <div className="p-5 sm:p-7 overflow-y-auto">
              <h2
                id="modal-initiative-title"
                className="text-[#064e3b] text-xl sm:text-2xl font-bold tracking-tight mb-2.5"
              >
                {selectedInitiative.title}
              </h2>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                {selectedInitiative.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                
                <a href="#contact"
                  onClick={() => setSelectedInitiative(null)}
                  className="flex-1 bg-[#064e3b] hover:bg-[#1B5E20] text-white py-3 px-5 rounded-xl text-center text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                >
                  Get Involved →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}