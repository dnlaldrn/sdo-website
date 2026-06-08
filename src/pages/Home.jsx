

export default function HomeHero() {
  return (
    <section
      id="home"
      className="w-full px-6 flex items-center justify-center "

    >
      <div className="max-w-7xl  mx-auto flex flex-col items-center text-center ">
        {/* Central Rounded Logo/Badge Container */}
        

        {/* Main Header Title */}
        <h1 className="text-[#004d1a] font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight max-w-3xl mb-6 mt-10">
          Sustainable Development Office - Alangilan <br />
          <span className="text-xl md:text-3xl text-red-700">
            PEOPLE . PLANET . PURPOSE
          </span>
          <span className="italic font-semibold block mt-1 text-3xl">
            Future Ready, Sustainability Steady
          </span>
        </h1>

        {/* Supporting Description Subtext */}
        <p className="text-gray-600 text-base md:text-lg leading-relaxed font-light max-w-2xl mb-10">
          The Sustainable Development Office–Alangilan embeds sustainability at
          the heart of the campus’s academic and administrative functions,
          advancing regional and global commitments to the United Nations’ 17
          Sustainable Development Goals (SDGs)
        </p>

        {/* Call to Action Button Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 w-full sm:w-auto">
          {/* Solid Green CTA */}
          <button className="w-auto  bg-[#004d1a] hover:bg-[#003311] text-white px-8 py-3.5 rounded-lg text-sm font-medium tracking-wide shadow-sm transition-colors duration-200">
            Our Strategic Goals
          </button>

          {/* Outlined Custom CTA */}
          <button className="w-auto  bg-transparent border border-[#004d1a]/40 hover:border-[#004d1a] text-[#004d1a] hover:bg-[#004d1a]/5 px-8 py-3.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-200">
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
