export default function Initiatives() {
  const acts = [
    {
      category: "Ecological Restoration",
      title: "GreenQuest",
      description:
        "Complete eco-friendly activities through GreenQuest and redeem your points with GreenRewards.",
      badgeColor: "#263238",
    },
    {
      category: "Energy Conservation",
      title: "EcoCampus Audit",
      description:
        "Conduct energy audits and track the carbon footprint across our campus buildings to drive reduction policies.",
      badgeColor: "#3F7E44",
    },
    {
      category: "Quality Education",
      title: "Sage Seminars",
      description:
        "Join interactive workshops and seminars discussing sustainable agriculture and clean energy policies.",
      badgeColor: "#C5192D",
    },
  ];
  return (
    <div id="initiatives" className="bg-[#F1F8E9] min-h-auto p-6 font-sans ">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[#7fa13c] text-xs font-bold uppercase tracking-wider block mb-2">
              Ongoing Projects
            </span>
            <h1 className="text-[#064e3b] text-3xl md:text-4xl font-bold leading-tight max-w-xl">
              Pioneering Change Through Campus Initiatives
            </h1>
          </div>
          <div>
            <button className="border border-[#064e3b] text-[#064e3b] font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-[#064e3b] hover:text-white transition-colors duration-200 whitespace-nowrap">
              View All Projects
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {acts.map((act) => (
            <div key={act.title} className="flex flex-col">
              {/* Graphic Card container */}
              <div className="relative bg-[#8BC34A] rounded-2xl overflow-hidden shadow-sm p-6 mb-5 flex items-center justify-center min-h-[220px]">
                <div className="w-full flex flex-col justify-center items-center text-center text-[#1E3A8A] font-bold">
                  <span className="text-xs uppercase tracking-widest text-[#064e3b]/70 mb-1">{act.category}</span>
                  <p className="text-2xl text-[#064e3b]">{act.title}</p>
                </div>
              </div>

              {/* Text Info */}
              <h3 className="text-[#1E3A8A] text-xl font-bold mb-2 transition-colors hover:text-[#064e3b] cursor-pointer">
                {act.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {act.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
