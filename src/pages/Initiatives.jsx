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
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-6 px-4">
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

        {/* Continuous Marquee Slider Wrapper */}
        <div className="relative overflow-hidden w-full py-4">
          {/* Subtle gradient overlays to fade the scrolling list on the edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#F1F8E9]/40 via-[#F1F8E9]/10 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/10 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track Container */}
          <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused] py-2">
            {/* Render items twice to create the infinite looping effect */}
            {[...acts, ...acts].map((act, index) => (
              <div
                key={`${act.title}-${index}`}
                className="w-[280px] sm:w-[320px] md:w-[340px] flex-shrink-0 transition-all duration-300"
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm group border border-gray-100/50 flex flex-col h-[400px] cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300">
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
