<<<<<<< HEAD
<<<<<<< HEAD
import { useState, useEffect, useRef, useCallback } from "react";
import { acts } from "../../utils/initiativesData";

export default function Initiatives() {
  const scrollContainerRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimeoutRef = useRef(null);

  // Unified functions to manage interaction state and timeouts globally
  const startInteraction = useCallback(() => {
    setIsInteracting(true);
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = null;
    }
  }, []);

  const endInteraction = useCallback(() => {
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
      interactionTimeoutRef.current = null;
    }, 2500);
  }, []);

  // 1. Center the scroll container ONCE on initial mount after DOM layout completes
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      const cardWidth = container.scrollWidth / 3;
      if (cardWidth > 0) {
        container.scrollLeft = cardWidth;
      }
    }, 150); // Small timeout to ensure browser layout is fully painted

    return () => clearTimeout(timer);
  }, []);

  // 2. Animation loop: Only scrolls when the user is not actively interacting
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId;
    const speed = 0.8; // Scroll speed in pixels per frame

    const scrollLoop = () => {
      if (!isInteracting) {
        const cardWidth = container.scrollWidth / 3;
        if (cardWidth > 0) {
          container.scrollLeft += speed;

          // Infinite wrap boundaries check
          if (container.scrollLeft >= cardWidth * 2) {
            container.scrollLeft -= cardWidth;
          } else if (container.scrollLeft <= cardWidth / 2) {
            container.scrollLeft += cardWidth;
          }
        }
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInteracting]);

  // 3. User interaction listener (mouse drag, wheel, touch swipe)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isDown = false;
    let startX;
    let scrollLeftVal;

    const handleScroll = () => {
      const cardWidth = container.scrollWidth / 3;
      if (cardWidth <= 0) return;

      if (container.scrollLeft >= cardWidth * 2) {
        container.scrollLeft -= cardWidth;
      } else if (container.scrollLeft <= cardWidth / 2) {
        container.scrollLeft += cardWidth;
      }
    };

    const handleWheel = () => {
      startInteraction();
      endInteraction();
    };

    // Document-level mouse dragging to avoid getting stuck when releasing mouse outside the element
    const handleMouseMove = (e) => {
      if (!isDown) return;
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // Drag sensitivity
      container.scrollLeft = scrollLeftVal - walk;
    };

    const handleMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      endInteraction();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = (e) => {
      if (e.button !== 0) return; // Only drag with left click!
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeftVal = container.scrollLeft;
      startInteraction();
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    // Prevent default browser image/text dragging behavior which interferes with our custom drag
    const handleDragStart = (e) => {
      e.preventDefault();
    };

    // Cancel dragging if the window loses focus
    const handleCancelDrag = () => {
      if (isDown) {
        handleMouseUp();
      }
    };

    container.addEventListener("scroll", handleScroll);
    container.addEventListener("touchstart", startInteraction, { passive: true });
    container.addEventListener("touchend", endInteraction, { passive: true });
    container.addEventListener("touchcancel", endInteraction, { passive: true });
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("wheel", handleWheel, { passive: true });
    container.addEventListener("dragstart", handleDragStart);
    window.addEventListener("blur", handleCancelDrag);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("touchstart", startInteraction);
      container.removeEventListener("touchend", endInteraction);
      container.removeEventListener("touchcancel", endInteraction);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("dragstart", handleDragStart);
      window.removeEventListener("blur", handleCancelDrag);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [startInteraction, endInteraction]);

  // 4. Keyboard arrow navigation listener (< > or ArrowLeft ArrowRight)
  useEffect(() => {
    const container = scrollContainerRef.current;

    const handleKeyDown = (e) => {
      if (!container) return;

      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      ) {
        return;
      }

      const scrollAmount = 360; // Card width + gap spacing

      if (
        e.key === "ArrowRight" || e.key === "." || e.key === ">" ||
        e.key === "ArrowLeft" || e.key === "," || e.key === "<"
      ) {
        startInteraction();

        const direction = (e.key === "ArrowRight" || e.key === "." || e.key === ">") ? 1 : -1;
        container.scrollBy({ left: scrollAmount * direction, behavior: "smooth" });

        endInteraction();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [startInteraction, endInteraction]);

  // 5. Global cleanup on unmount to prevent leaks
  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div id="initiatives" className="bg-gradient-to-b from-[#F1F8E9]/50 to-white py-24 px-6 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-6 px-4">
=======
import { useState, useEffect } from "react";

=======
>>>>>>> d690434 (feat(initiatives): implement continuous scrolling infinite marquee carousel)
const acts = [
  {
    category: "Ecological Restoration",
    title: "GreenQuest",
    description:
      "Complete eco-friendly activities through GreenQuest and redeem your points with GreenRewards.",
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80",
  },
  {
    category: "Energy Conservation",
    title: "EcoCampus Audit",
    description:
      "Conduct energy audits and track the carbon footprint across our campus buildings to drive reduction policies.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80",
  },
  {
    category: "Quality Education",
    title: "Sage Seminars",
    description:
      "Join interactive workshops and seminars discussing sustainable agriculture and clean energy policies.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
  },
  {
    category: "Waste Management",
    title: "BioLoop Compost",
    description:
      "Transform campus organic waste into nutrient-rich soil compost, fostering a zero-waste campus environment.",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=600&q=80",
  },
  {
    category: "Water Conservation",
    title: "HydroHarvest Rainwater",
    description:
      "Harvest rainwater to maintain sustainable green irrigation for agriculture and campus landscape gardens.",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Initiatives() {
  return (
    <div id="initiatives" className="bg-gradient-to-b from-[#F1F8E9]/50 to-white py-24 px-6 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
<<<<<<< HEAD
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-6">
>>>>>>> dd7179f (feat: Implement InitiativesSection UI UX animation)
=======
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-6 px-4">
>>>>>>> d690434 (feat(initiatives): implement continuous scrolling infinite marquee carousel)
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
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

<<<<<<< HEAD
<<<<<<< HEAD
        {/* Interactive Marquee Slider Wrapper */}
=======
        {/* Continuous Marquee Slider Wrapper */}
>>>>>>> d690434 (feat(initiatives): implement continuous scrolling infinite marquee carousel)
        <div className="relative overflow-hidden w-full py-4">
          {/* Subtle gradient overlays to fade the scrolling list on the edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#F1F8E9]/40 via-[#F1F8E9]/10 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/10 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track Container */}
<<<<<<< HEAD
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-none gap-6 py-2 scroll-smooth select-none cursor-grab active:cursor-grabbing"
          >
            {/* Render items three times to build a truly seamless infinite scroll */}
            {[...acts, ...acts, ...acts].map((act, index) => (
=======
          <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused] py-2">
            {/* Render items twice to create the infinite looping effect */}
            {[...acts, ...acts].map((act, index) => (
>>>>>>> d690434 (feat(initiatives): implement continuous scrolling infinite marquee carousel)
              <div
                key={`${act.title}-${index}`}
                className="w-[280px] sm:w-[320px] md:w-[340px] flex-shrink-0 transition-all duration-300"
              >
<<<<<<< HEAD
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm group border border-gray-100/50 flex flex-col h-[400px] hover:shadow-md hover:-translate-y-1 transition-all duration-300">
=======
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm group border border-gray-100/50 flex flex-col h-[400px] cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300">
>>>>>>> d690434 (feat(initiatives): implement continuous scrolling infinite marquee carousel)
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
<<<<<<< HEAD
                    </div>

                    <span className="text-[#064e3b] hover:text-[#003311] font-bold text-xs tracking-wider uppercase flex items-center gap-1 transition-colors mt-auto">
                      Learn More <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
=======
        {/* Carousel Container */}
        <div className="relative px-1">
          {/* Slides Wrapper */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out -mx-3"
              style={{
                transform: `translateX(-${safeCurrentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {acts.map((act) => (
                <div
                  key={act.title}
                  className="flex-shrink-0 px-3 transition-all duration-300"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm group border border-gray-100/50 flex flex-col h-[420px] cursor-pointer hover:shadow-lg transition-all duration-300">
                    {/* Image Area */}
                    <div className="relative h-[220px] overflow-hidden bg-gray-100">
                      <img
                        src={act.image}
                        alt={act.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#064e3b] font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
                        {act.category}
                      </span>
=======
>>>>>>> d690434 (feat(initiatives): implement continuous scrolling infinite marquee carousel)
                    </div>

                    <span className="text-[#064e3b] hover:text-[#003311] font-bold text-xs tracking-wider uppercase flex items-center gap-1 transition-colors mt-auto">
                      Learn More <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
<<<<<<< HEAD

          {/* Navigation Controls (Only show if there are items to scroll) */}
          {maxIndex > 0 && (
            <>
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 lg:-translate-x-4 bg-white/90 hover:bg-white text-[#064e3b] w-10 h-10 rounded-full flex items-center justify-center shadow-md border border-gray-100/50 hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 lg:translate-x-4 bg-white/90 hover:bg-white text-[#064e3b] w-10 h-10 rounded-full flex items-center justify-center shadow-md border border-gray-100/50 hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </>
          )}
>>>>>>> dd7179f (feat: Implement InitiativesSection UI UX animation)
=======
>>>>>>> d690434 (feat(initiatives): implement continuous scrolling infinite marquee carousel)
        </div>

      </div>
    </div>
  );
}
