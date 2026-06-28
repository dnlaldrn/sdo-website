
export default function SDG() {
  return (
    <section id="sdgs" className="w-full bg-[#f4f8fa] py-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mb-16 space-y-4">
          <span className="text-primary-accent uppercase font-bold text-xs tracking-widest block">
            Our Roadmap
          </span>
          <h2 className="text-primary-dark font-bold text-3xl sm:text-4xl tracking-tight leading-tight">
            Global Goals, Local Impact
          </h2>
          <div className="w-16 h-1 bg-primary-accent mx-auto rounded-full"></div>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
            The Sustainable Development Office aligns its efforts with all 17 United Nations 
            Sustainable Development Goals (SDGs) to ensure our campus-level initiatives drive 
            global progress.
          </p>
        </div>

        {/* Goals Grid Layout */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
          {sdgGoals.map((goal) => (
            <div
              key={goal.number}
              className="relative overflow-hidden aspect-square rounded-xl shadow-sm border border-gray-100/50 group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Official UN Image Front Cover */}
              <img
                src={goal.image}
                alt={goal.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Dynamic Overlay On Hover (Fades and slides up) */}
              <div
                style={{ backgroundColor: goal.hexColor }}
                className="absolute inset-0 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex flex-col justify-between p-3.5 text-white z-10 select-none text-left"
              >
                {/* Goal Index Header & Description */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider block mb-1">
                    Goal {goal.number}
                  </span>
                  <p className="text-[10px] leading-relaxed opacity-95 font-light line-clamp-3">
                    {goal.description}
                  </p>
                </div>

                {/* Metrics & Outlined Button */}
                <div className="space-y-2.5 pt-2 border-t border-white/20">
                  <div className="flex gap-4">
                    <div>
                      <span className="text-xs sm:text-sm font-extrabold block leading-none mb-0.5">
                        {goal.targets}
                      </span>
                      <span className="text-[8px] font-medium tracking-wide opacity-80 uppercase block">
                        Targets
                      </span>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-extrabold block leading-none mb-0.5">
                        {goal.actions}
                      </span>
                      <span className="text-[8px] font-medium tracking-wide opacity-80 uppercase block">
                        Actions
                      </span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-transparent border border-white/30 hover:border-white text-white font-bold text-[9px] py-1 rounded transition-all uppercase tracking-wider text-center cursor-pointer">
                    More info
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Bottom Text Link CTA */}
        <a 
          href="#" 
          className="group flex items-center space-x-2 text-[#1b5e20] font-bold text-sm tracking-wide hover:text-[#003311] transition-colors duration-200"
        >
          <span>Explore all 17 Goals</span>
          <svg 
            className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>

      </div>
    </section>
  );
}