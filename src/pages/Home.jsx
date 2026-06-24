

export default function HomeHero() {
  return (
    <section
      id="home"
      className="w-full px-6 flex items-center justify-center "

    >
      <div className="max-w-7xl  mx-auto flex flex-col items-center text-center ">
        {/* Central Rounded Logo/Badge Container */}
        

        {/* Main Header Title */}
        <h1 className="text-[#004d1a] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight max-w-3xl mb-6 mt-8 sm:mt-12 px-4">
          Sustainable Development Office - Alangilan <br />
          <span className="text-sm sm:text-lg md:text-2xl text-red-700 block mt-3 font-semibold tracking-wider">
            PEOPLE • PLANET • PURPOSE
          </span>
          <span className="italic font-semibold block mt-3 text-lg sm:text-2xl md:text-3xl leading-normal text-emerald-800">
            Future Ready, Sustainability Steady
          </span>
        </h1>

        {/* Supporting Description Subtext */}
        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-2xl mb-8 px-4 sm:px-6">
          The Sustainable Development Office–Alangilan embeds sustainability at
          the heart of the campus’s academic and administrative functions,
          advancing regional and global commitments to the United Nations’ 17
          Sustainable Development Goals (SDGs)
        </p>

        {/* Call to Action Button Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 w-full max-w-[280px] sm:max-w-none sm:w-auto px-4">
          {/* Solid Green CTA */}
          <button className="w-full sm:w-auto bg-[#004d1a] hover:bg-[#003311] text-white px-8 py-3.5 rounded-lg text-sm font-medium tracking-wide shadow-sm transition-colors duration-200 cursor-pointer">
            Our Strategic Goals
          </button>

          {/* Outlined Custom CTA */}
          <button className="w-full sm:w-auto bg-transparent border border-[#004d1a]/40 hover:border-[#004d1a] text-[#004d1a] hover:bg-[#004d1a]/5 px-8 py-3.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer">
            Read Latest Report
          </button>
        </div>

        {/* Animated Chevron Down Indicator */}
        <a
          href="#about"
          className="text-[#004d1a]/60 animate-bounce cursor-pointer hover:text-[#004d1a] transition-colors mb-20"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
