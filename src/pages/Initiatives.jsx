import { useState, useEffect, useRef } from "react";
import { acts } from "../../utils/initiativesData";

export default function Initiatives() {
  const scrollContainerRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const isInteractingRef = useRef(false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Position container initially in the middle third
    const cardWidth = container.scrollWidth / 3;
    container.scrollLeft = cardWidth;

    let animationFrameId;
    const speed = 0.8; // Scroll speed in pixels per frame

    const scrollLoop = () => {
      if (!isInteracting) {
        container.scrollLeft += speed;

        // Loop boundaries check
        if (container.scrollLeft >= cardWidth * 2) {
          container.scrollLeft -= cardWidth;
        } else if (container.scrollLeft <= cardWidth / 2) {
          container.scrollLeft += cardWidth;
        }

        container.scrollLeft = scrollPositionRef.current;
      } else {
        // Sync our local float accumulator while the user is actively interacting
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
      setIsInteracting(true);
      clearTimeout(interactionTimeout);
    };

    const endInteraction = () => {
      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        setIsInteracting(false);
      }, 2500);
    };

    const handleScroll = () => {
      // If we are not interacting (auto-scroll is active), ignore programmatic scroll events
      // to prevent integer subpixel rounding from resetting our precise float accumulator.
      if (!isInteractingRef.current) return;

      const cardWidth = container.scrollWidth / 3;
      if (cardWidth <= 0) return;

      let current = container.scrollLeft;
      let didWrap = false;

      if (current >= cardWidth * 2) {
        current -= cardWidth;
        didWrap = true;
      } else if (current <= cardWidth / 2) {
        current += cardWidth;
        didWrap = true;
      }

      if (didWrap) {
        container.scrollLeft = current;
      }

      // Always keep our shared scrollPositionRef in sync with the real scrollLeft
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
    };

    container.addEventListener("scroll", handleScroll);
    container.addEventListener("touchstart", startInteraction, {
      passive: true,
    });
    container.addEventListener("touchend", endInteraction, { passive: true });
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("touchstart", startInteraction);
      container.removeEventListener("touchend", endInteraction);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseUp);
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
        setIsInteracting(true);
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        setTimeout(() => setIsInteracting(false), 3000);
      } else if (e.key === "ArrowLeft" || e.key === "," || e.key === "<") {
        setIsInteracting(true);
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        setTimeout(() => setIsInteracting(false), 3000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      id="initiatives"
      className="bg-gradient-to-b from-[#F1F8E9]/50 to-white py-14 px-6 font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6 px-4">
          <div>
            <span className="text-[#7fa13c] text-xs font-bold uppercase tracking-widest block mb-2">
              Ongoing Projects
            </span>
            <h1 className="text-[#064e3b] text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
              Pioneering Change Through Campus Initiatives
            </h1>
          </div>
          <div>
            <a
              href="#projects"
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
            {[...acts].map((act, index) => (
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
