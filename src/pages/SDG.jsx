import { useState, useEffect } from "react";
import { sdgGoals } from "../../utils/sdgData";

export default function SDG() {
  const [selectedGoal, setSelectedGoal] = useState(null);

  // Close modal on Escape key and lock body scroll
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSelectedGoal(null);
      }
    };

    if (selectedGoal) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [selectedGoal]);

  return (
    <section id="sdgs" className="w-full bg-[#f4f8fa] py-8 sm:py-12 md:py-16 px-4 sm:px-6 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mb-6 sm:mb-10 space-y-4">
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
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4 sm:mb-8">
          {sdgGoals.map((goal) => (
            <div
              key={goal.number}
              onClick={() => setSelectedGoal(goal)}
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
                  
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedGoal(goal);
                    }}
                    className="w-full bg-transparent border border-white/30 hover:border-white text-white font-bold text-[9px] py-1 rounded transition-all uppercase tracking-wider text-center cursor-pointer"
                  >
                    More info
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Logo / See All Card (18th slot) */}
          <div className="relative overflow-hidden aspect-square rounded-xl shadow-sm border border-gray-100/50 bg-white flex flex-col items-center justify-between p-4 sm:p-5 group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex-1 flex items-center justify-center">
              <img
                src="/sdg/global-goals.png"
                alt="UN Sustainable Development Goals Logo"
                className="max-h-[75%] object-contain"
              />
            </div>
            <a
              href="https://sdgs.un.org/goals"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0A97D9] hover:text-[#00689D] font-bold text-xs sm:text-sm tracking-wide transition-colors mt-auto"
            >
              See all
            </a>
          </div>

        </div>

      </div>

      {/* Minimalist SDG Detail Modal */}
      {selectedGoal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-sdg-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setSelectedGoal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] transition-all transform duration-300 animate-in fade-in zoom-in-95"
          >
            {/* Modal Image Header Banner */}
            <div className="relative h-48 sm:h-56 w-full bg-gray-100 shrink-0">
              <img
                src={selectedGoal.image}
                alt={selectedGoal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Goal Badge */}
              <span
                style={{ backgroundColor: selectedGoal.hexColor }}
                className="absolute bottom-3.5 left-4 sm:left-6 text-white font-bold text-xs tracking-wider uppercase px-3 py-1 rounded-full shadow-sm"
              >
                Goal {selectedGoal.number}
              </span>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedGoal(null)}
                aria-label="Close modal"
                className="absolute top-3.5 right-3.5 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-5 sm:p-7 overflow-y-auto">
              <h2
                id="modal-sdg-title"
                className="text-[#263238] text-xl sm:text-2xl font-bold tracking-tight mb-2.5"
              >
                {selectedGoal.title}
              </h2>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
                {selectedGoal.description}
              </p>

              {/* Targets & Actions Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col">
                  <span className="text-2xl font-extrabold text-[#004d1a] leading-none mb-1">
                    {selectedGoal.targets}
                  </span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    Global UN Targets
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col">
                  <span className="text-2xl font-extrabold text-[#004d1a] leading-none mb-1">
                    {selectedGoal.actions}
                  </span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    Campus Actions
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://sdgs.un.org/goals/goal${selectedGoal.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: selectedGoal.hexColor }}
                  className="flex-1 text-white py-3 px-5 rounded-xl text-center text-sm font-semibold transition-opacity hover:opacity-90 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore UN Goal {selectedGoal.number}</span>
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedGoal(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}