import { useState, useEffect } from "react";

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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let itemsPerPage = 1;
  if (windowWidth >= 1024) itemsPerPage = 3;
  else if (windowWidth >= 768) itemsPerPage = 2;

  const maxIndex = acts.length - itemsPerPage;
  const safeCurrentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

  useEffect(() => {
    if (maxIndex <= 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const clampedPrev = Math.min(prev, maxIndex);
        return clampedPrev >= maxIndex ? 0 : clampedPrev + 1;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const clampedPrev = Math.min(prev, maxIndex);
      return clampedPrev >= maxIndex ? 0 : clampedPrev + 1;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const clampedPrev = Math.min(prev, maxIndex);
      return clampedPrev === 0 ? maxIndex : clampedPrev - 1;
    });
  };

  return (
    <div id="initiatives" className="bg-gradient-to-b from-[#F1F8E9]/50 to-white py-24 px-6 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-6">
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
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-5 flex flex-col justify-between">
                      <div>
                        <h3 className="text-[#064e3b] text-lg font-bold group-hover:text-[#7fa13c] transition-colors duration-200 line-clamp-1">
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
        </div>
      </div>
    </div>
  );
}
