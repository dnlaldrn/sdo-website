import bgHero from "../assets/HomeImageBackground.jpg";
import HomeSectionLogo from "../assets/HomeSectionLogo.png";

export default function HomeHero() {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col items-center justify-between font-sans overflow-hidden px-4 sm:px-6 md:px-8 pt-12 sm:pt-24 md:pt-44 lg:pt-38 pb-16 md:pb-8"
    >
      {/* =========================
          BACKGROUND IMAGE
      ========================== */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgHero}
          alt="SDO Alangilan Campus Community"
          className="w-full h-full object-cover object-center scale-105 animate-in fade-in duration-1000"
          fetchPriority="high"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/75" />
      </div>

      {/* =========================
          MAIN HERO CONTENT
      ========================== */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center w-full my-auto">
        {/* Centered SDO Emblem / Logo on Mobile (Image 2 Hierarchy) */}
        <div className="md:hidden flex justify-center mb-5">
          <img
            src={HomeSectionLogo}
            alt="SDO Alangilan Logo"
            className="h-16 sm:h-20 w-auto object-contain drop-shadow-2xl animate-in zoom-in-95 duration-700"
          />
        </div>

        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full backdrop-blur-md border border-white/25 text-[#8BC34A] text-xs sm:text-sm font-semibold tracking-wide mb-4 sm:mb-5 shadow-md">
          <span>Sustainability-Empowered Campus for All</span>
        </div>

        {/* =========================
            MAIN HEADLINE
        ========================== */}
        <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[52px] tracking-tight leading-[1.15] mb-4 sm:mb-5 max-w-4xl">
          Where{" "}
          <span className="bg-gradient-to-r from-[#8BC34A] via-[#A3E635] to-[#4ADE80] bg-clip-text text-transparent">
            Sustainability Leaders
          </span>
          <br />
          Connect
        </h1>

        {/* =========================
            DESCRIPTION
        ========================== */}
        <p className="text-gray-100 text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-3xl mb-6 sm:mb-7">
          Welcome to the Sustainable Development Office – Alangilan, the vibrant
          campus hub driving regional and global commitments to the United
          Nations’ 17 SDGs through academic excellence, research innovation, and
          impactful community action.
        </p>

        {/* =========================
            CALL TO ACTION BUTTONS
        ========================== */}
        <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-6">
          {/* Strategic Goals */}
          <a
            href="#sdgs"
            className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#1B5E20] hover:bg-[#004d1a] text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg hover:shadow-[#1B5E20]/40 hover:scale-105 active:scale-95 transition-all duration-200 text-center flex items-center justify-center gap-1.5 cursor-pointer border border-[#8BC34A]/30 whitespace-nowrap"
          >
            <span>Explore Strategic Goals</span>
            <span>→</span>
          </a>

          {/* About SDO Section Link */}
          <a
            href="#about"
            className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-white/25 text-white border border-white/30 hover:border-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 text-center inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <span>About Sustainable Development Office</span>
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
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </a>
        </div>

        {/* =========================
            METRIC STATS
        ========================== */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 max-w-3xl mx-auto w-full pt-4 sm:pt-6  text-center">
          {/* Stat 1 */}
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none mb-1">
              17
            </span>

            <span className="text-[10px] sm:text-xs text-gray-300 font-medium tracking-wider uppercase">
              UN SDGs Mapped
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center border-x  px-2 sm:px-4">
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#8BC34A] tracking-tight leading-none mb-1">
              100+
            </span>

            <span className="text-[10px] sm:text-xs text-gray-300 font-medium tracking-wider uppercase">
              Campus Initiatives
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none mb-1">
              150+
            </span>

            <span className="text-[10px] sm:text-xs text-gray-300 font-medium tracking-wider uppercase">
              Volunteers & Partners
            </span>
          </div>
        </div>
      </div>

      {/* =========================
          SCROLL INDICATOR
      ========================== */}
      </section>
  );
}
