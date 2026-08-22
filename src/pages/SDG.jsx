import { useState, useEffect, useCallback } from "react";
import { sdgGoals } from "../../utils/sdgData";
import SDGGlobe from "../components/SDGGlobe/SDGGlobe";

export default function SDG() {
  const [activeGoal, setActiveGoal] = useState(sdgGoals[0]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [viewMode, setViewMode] = useState("globe"); // "globe" or "grid"

  const handleHoverGoal = useCallback((goal) => {
    setActiveGoal(goal);
  }, []);

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
    <section
      id="sdgs"
      className="w-full bg-gradient-to-b from-[#F1F8E9]/50 via-white to-[#F1F8E9]/30 py-10 sm:py-14 md:py-16 px-4 sm:px-6 md:px-8 font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* =========================================================================
            1. 3D GLOBE INTERACTIVE VIEW (SPLIT 2-COLUMN MODERN LAYOUT)
        ========================================================================= */}
        {viewMode === "globe" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Header, Dynamic Goal Spotlight & Controls */}
            <div className="lg:col-span-5 flex flex-col space-y-5 text-left">
              <div>
                <span className="text-[#1B5E20] uppercase font-bold text-xs tracking-widest block mb-1.5">
                  OUR ROADMAP • 17 UN GOALS
                </span>
                <h2 className="text-[#064e3b] font-md text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-3">
                  Global Goals, Local Impact
                  {/* View Switcher Toggle */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => setViewMode("grid")}
                      className="px-3.5 py-1.5 rounded-full bg-[#1B5E20] hover:bg-gray-50 text-[#064e3b] border border-gray-200 text-xs font-semibold tracking-wide transition-all shadow-2xs hover:shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="text-white">Switch to 17-Goal Grid</span>
                    </button>
                  </div>
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                  The Sustainable Development Office aligns its efforts with all
                  17 United Nations SDGs to ensure our campus-level initiatives
                  drive measurable global progress.
                </p>
              </div>

              {/* Dynamic Live Goal Spotlight Card with Fixed Min-Height */}
              {activeGoal && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-100/90 shadow-md transition-all duration-300 relative overflow-hidden group min-h-[300px] flex flex-col">
                  <div
                    style={{ backgroundColor: activeGoal.hexColor }}
                    className="absolute top-0 left-0 right-0 h-1.5 transition-colors duration-300"
                  />

                  <div>
                    {/* Header with Goal Badge & Title */}
                    <div className="flex items-center gap-3 mb-2.5">
                      <span
                        style={{ backgroundColor: activeGoal.hexColor }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-white text-base shadow-xs shrink-0 transition-colors duration-300"
                      >
                        {activeGoal.number}
                      </span>
                      <div className="overflow-hidden">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                          Featured Goal
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 leading-snug">
                          {activeGoal.title}
                        </h3>
                      </div>
                    </div>

                    {/* Goal Description */}
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                      {activeGoal.description}
                    </p>
                  </div>

                  <div>
                    {/* Key Metrics Chips */}
                    <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                      <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex flex-col">
                        <span className="text-lg font-extrabold text-[#064e3b] leading-none mb-0.5">
                          {activeGoal.targets}
                        </span>
                        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">
                          Global Targets
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex flex-col">
                        <span className="text-lg font-extrabold text-[#064e3b] leading-none mb-0.5">
                          {activeGoal.actions}
                        </span>
                        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">
                          Campus Actions
                        </span>
                      </div>
                    </div>

                    {/* Action CTA Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedGoal(activeGoal)}
                      style={{ backgroundColor: activeGoal.hexColor }}
                      className="w-full text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all hover:opacity-90 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>
                        Explore Goal {activeGoal.number} Targets & Actions
                      </span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Seamless Blended 3D Eco-Globe */}
            <div className="lg:col-span-7 flex items-center justify-center relative">
              <SDGGlobe
                activeGoal={activeGoal}
                onHoverGoal={handleHoverGoal}
                onSelectGoal={handleHoverGoal}
              />
            </div>
          </div>
        )}

        {/* =========================================================================
            2. FULL 17-GOAL MATRIX GRID VIEW
        ========================================================================= */}
        {viewMode === "grid" && (
          <div className="flex flex-col items-center animate-in fade-in duration-300">
            {/* Header & Switcher Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mb-6 sm:mb-8 gap-4">
              <div>
                <span className="text-[#1B5E20] uppercase font-bold text-xs tracking-widest block mb-1">
                  OUR ROADMAP • 17 UN GOALS
                </span>
                <h2 className="text-[#064e3b] font-md text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                  Global Goals, Local Impact
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setViewMode("globe")}
                className="px-4 py-2 rounded-full bg-[#1B5E20] hover:bg-[#004d1a] text-white text-xs font-bold tracking-wide transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
              >
                <span>Switch to 3D Interactive Globe</span>
              </button>
            </div>

            {/* 17 Goals Grid */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
              {sdgGoals.map((goal) => (
                <div
                  key={goal.number}
                  onClick={() => {
                    setActiveGoal(goal);
                    setSelectedGoal(goal);
                  }}
                  className="relative overflow-hidden aspect-square rounded-2xl shadow-xs border border-gray-100/60 group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <img
                    src={goal.image}
                    alt={goal.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover Overlay */}
                  <div
                    style={{ backgroundColor: goal.hexColor }}
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex flex-col justify-between p-3.5 text-white z-10 select-none text-left"
                  >
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider block mb-1">
                        Goal {goal.number}
                      </span>
                      <p className="text-[10px] leading-relaxed opacity-95 font-light line-clamp-3">
                        {goal.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/20">
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
                          setActiveGoal(goal);
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

              {/* UN Logo Card */}
              <div className="relative overflow-hidden aspect-square rounded-2xl shadow-xs border border-gray-100/60 bg-white flex flex-col items-center justify-between p-4 group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
                  className="text-[#0A97D9] hover:text-[#00689D] font-bold text-xs tracking-wide transition-colors mt-auto"
                >
                  See all
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          3. MINIMALIST SDG DETAIL MODAL
      ========================================================================= */}
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
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
