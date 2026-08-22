import { useEffect, useRef } from "react";
import { acts } from "../../utils/initiativesData";

export default function Initiatives() {
  const scrollContainerRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const isInteractingRef = useRef(false);

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
    const speed = 0.9; // Smooth scroll speed in pixels per frame

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
  }, []);

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
        if (!isDown) {
          isInteractingRef.current = false;
        }
      }, 1500);
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

      const scrollAmount = 360; // Card width + gap spacing

      if (e.key === "ArrowRight" || e.key === "." || e.key === ">") {
        isInteractingRef.current = true;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        setTimeout(() => {
          isInteractingRef.current = false;
        }, 2000);
      } else if (e.key === "ArrowLeft" || e.key === "," || e.key === "<") {
        isInteractingRef.current = true;
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        setTimeout(() => {
          isInteractingRef.current = false;
        }, 2000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      id="initiatives"
      className="bg-gradient-to-b from-[#F1F8E9]/50 to-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 sm:mb-10 gap-6 px-4">
          <div>
            <span className="text-[#7fa13c] text-xs font-bold uppercase tracking-widest block mb-2">
              Ongoing Projects
            </span>
            <h1 className="text-[#064e3b] text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
              Pioneering Change Through Campus Initiatives
            </h1>
          </div>
          <div className="justify-center">
            <a
              href="#initiatives"
              className="text-[#064e3b] hover:text-[#003311] font-bold text-sm flex items-center gap-1.5 transition-colors duration-200 group whitespace-nowrap cursor-pointer"
            >
              View All Projects
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Interactive Marquee Slider Wrapper */}
        <div className="relative overflow-hidden w-full py-4">
          {/* Subtle gradient overlays to fade the scrolling list on the edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#F1F8E9]/40 via-[#F1F8E9]/10 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/10 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-none gap-6 py-2 select-none cursor-grab active:cursor-grabbing"
          >
            {/* Render items three times to build a truly seamless infinite scroll */}
            {[...acts, ...acts, ...acts].map((act, index) => (
              <div
                key={`${act.title}-${index}`}
                className="w-[280px] sm:w-[320px] md:w-[340px] flex-shrink-0 transition-all duration-300"
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm group border border-gray-100/50 flex flex-col h-[400px] hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  {/* Image Area */}
                  <div className="relative h-[200px] overflow-hidden bg-gray-100">
                    <img
                      src={act.image}
                      alt={act.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#064e3b] font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
                      {act.category}
                    </span>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-[#064e3b] text-base sm:text-lg font-bold group-hover:text-[#7fa13c] transition-colors duration-200 line-clamp-1">
                        {act.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-3 mt-2">
                        {act.description}
                      </p>
                    </div>

                    <span className="text-[#064e3b] hover:text-[#003311] font-bold text-xs tracking-wider uppercase flex items-center gap-1 transition-colors mt-auto">
                      Learn More <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
