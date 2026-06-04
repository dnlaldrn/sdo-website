
export default function SDG() {
  const sdgGoals = [
    { number: 1, title: 'No Poverty', bgColor: 'bg-[#E5243B]' },
    { number: 2, title: 'Zero Hunger', bgColor: 'bg-[#DDA63A]' },
    { number: 3, title: 'Good Health', bgColor: 'bg-[#4C9F38]' },
    { number: 4, title: 'Quality Education', bgColor: 'bg-[#C5192D]' },
    { number: 5, title: 'Gender Equality', bgColor: 'bg-[#FF3A21]' },
    { number: 6, title: 'Clean Water', bgColor: 'bg-[#26BDE2]' },
    { number: 7, title: 'Clean Energy', bgColor: 'bg-[#FCC30B]' },
    { number: 8, title: 'Decent Work', bgColor: 'bg-[#A21942]' },
    // Slot for the wide "And 9 more vital targets..." element goes here in the grid structure
    { number: 13, title: 'Climate Action', bgColor: 'bg-[#3F7E44]' },
    { number: 17, title: 'Partnerships', bgColor: 'bg-[#19486A]' },
  ];

  return (
    <section id="sdgs" className="w-full bg-[#f4f8fa] py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mb-12 space-y-4">
          <h2 className="text-[#004d1a] font-bold text-3xl sm:text-4xl tracking-tight">
            Global Goals, Local Impact
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
            We align our efforts with the United Nations Sustainable Development Goals to
            ensure our localized actions have global significance.
          </p>
        </div>

        {/* Goals Grid Layout */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12">
          
          {/* Loop over first 8 goals (1 to 8) */}
          {sdgGoals.slice(0, 8).map((goal) => (
            <div 
              key={goal.number} 
              className="bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow duration-200 min-h-[160px]"
            >
              <div className={`${goal.bgColor} text-white font-bold w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-4 shadow-sm`}>
                {goal.number}
              </div>
              <p className="text-[#032b1d] font-semibold text-xs sm:text-sm tracking-tight">
                {goal.title}
              </p>
            </div>
          ))}

          {/* Wide Middle Accent Block (Replaces positions 9 & 10 in the responsive flow) */}
          <div className="col-span-2 bg-[#edf7ed] border border-[#c8e6c9]/40 rounded-xl p-6 flex items-center justify-center text-center min-h-[160px]">
            <p className="text-[#1b5e20] font-medium text-sm sm:text-base tracking-wide">
              And 9 more vital targets...
            </p>
          </div>

          {/* Loop over remaining goals (13 and 17) */}
          {sdgGoals.slice(8).map((goal) => (
            <div 
              key={goal.number} 
              className="bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow duration-200 min-h-[160px]"
            >
              <div className={`${goal.bgColor} text-white font-bold w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-4 shadow-sm`}>
                {goal.number}
              </div>
              <p className="text-[#032b1d] font-semibold text-xs sm:text-sm tracking-tight">
                {goal.title}
              </p>
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