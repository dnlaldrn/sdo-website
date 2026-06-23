const sdgGoals = [
  {
    number: 1,
    title: "No Poverty",
    hexColor: "#E5243B",
    description: "End poverty in all its forms everywhere.",
    targets: 7,
    actions: 12,
    image: "/sdg/E_SDG_PRINT-01.jpg"
  },
  {
    number: 2,
    title: "Zero Hunger",
    hexColor: "#DDA63A",
    description: "End hunger, achieve food security and improved nutrition and promote sustainable agriculture.",
    targets: 8,
    actions: 15,
    image: "/sdg/E_SDG_PRINT-02.jpg"
  },
  {
    number: 3,
    title: "Good Health & Well-being",
    hexColor: "#4C9F38",
    description: "Ensure healthy lives and promote well-being for all at all ages.",
    targets: 13,
    actions: 24,
    image: "/sdg/E_SDG_PRINT-03.jpg"
  },
  {
    number: 4,
    title: "Quality Education",
    hexColor: "#C5192D",
    description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
    targets: 10,
    actions: 35,
    image: "/sdg/E_SDG_PRINT-04.jpg"
  },
  {
    number: 5,
    title: "Gender Equality",
    hexColor: "#FF3A21",
    description: "Achieve gender equality and empower all women and girls.",
    targets: 9,
    actions: 10,
    image: "/sdg/E_SDG_PRINT-05.jpg"
  },
  {
    number: 6,
    title: "Clean Water & Sanitation",
    hexColor: "#26BDE2",
    description: "Ensure availability and sustainable management of water and sanitation for all.",
    targets: 8,
    actions: 14,
    image: "/sdg/E_SDG_PRINT-06.jpg"
  },
  {
    number: 7,
    title: "Affordable & Clean Energy",
    hexColor: "#FCC30B",
    description: "Ensure access to affordable, reliable, sustainable and modern energy for all.",
    targets: 5,
    actions: 19,
    image: "/sdg/E_SDG_PRINT-07.jpg"
  },
  {
    number: 8,
    title: "Decent Work & Growth",
    hexColor: "#A21942",
    description: "Promote sustained, inclusive and sustainable economic growth, full and productive employment.",
    targets: 12,
    actions: 18,
    image: "/sdg/E_SDG_PRINT-08.jpg"
  },
  {
    number: 9,
    title: "Industry & Innovation",
    hexColor: "#FD6925",
    description: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.",
    targets: 8,
    actions: 16,
    image: "/sdg/E_SDG_PRINT-09.jpg"
  },
  {
    number: 10,
    title: "Reduced Inequalities",
    hexColor: "#DD1367",
    description: "Reduce inequality within and among countries.",
    targets: 10,
    actions: 11,
    image: "/sdg/E_SDG_PRINT-10.jpg"
  },
  {
    number: 11,
    title: "Sustainable Cities",
    hexColor: "#FD9D24",
    description: "Make cities and human settlements inclusive, safe, resilient and sustainable.",
    targets: 10,
    actions: 22,
    image: "/sdg/E_SDG_PRINT-11.jpg"
  },
  {
    number: 12,
    title: "Responsible Consumption",
    hexColor: "#C19028",
    description: "Ensure sustainable consumption and production patterns.",
    targets: 11,
    actions: 28,
    image: "/sdg/E_SDG_PRINT-12.jpg"
  },
  {
    number: 13,
    title: "Climate Action",
    hexColor: "#3F7E44",
    description: "Take urgent action to combat climate change and its impacts.",
    targets: 5,
    actions: 31,
    image: "/sdg/E_SDG_PRINT-13.jpg"
  },
  {
    number: 14,
    title: "Life Below Water",
    hexColor: "#0A97D9",
    description: "Conserve and sustainably use the oceans, seas and marine resources.",
    targets: 10,
    actions: 8,
    image: "/sdg/E_SDG_PRINT-14.jpg"
  },
  {
    number: 15,
    title: "Life on Land",
    hexColor: "#56C02B",
    description: "Protect, restore and promote sustainable use of terrestrial ecosystems, halt biodiversity loss.",
    targets: 12,
    actions: 17,
    image: "/sdg/E_SDG_PRINT-15.jpg"
  },
  {
    number: 16,
    title: "Peace, Justice & Institutions",
    hexColor: "#00689D",
    description: "Promote peaceful societies, provide access to justice and build effective, accountable institutions.",
    targets: 12,
    actions: 13,
    image: "/sdg/E_SDG_PRINT-16.jpg"
  },
  {
    number: 17,
    title: "Partnerships for the Goals",
    hexColor: "#19486A",
    description: "Strengthen the means of implementation and revitalize the Global Partnership.",
    targets: 19,
    actions: 45,
    image: "/sdg/E_SDG_PRINT-17.jpg"
  }
];

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
          href="https://sdgs.un.org/goals"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 text-primary font-bold text-sm tracking-wide hover:text-primary-dark transition-colors duration-200"
        >
          <span>Explore all 17 Goals on the UN Portal</span>
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