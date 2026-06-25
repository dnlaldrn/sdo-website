

export default function HomeHero() {
  return (
    <section
      id="home"
      className="w-full min-h-[calc(100vh-60px)] px-6 py-12 md:py-16 lg:py-20 flex flex-col items-center justify-center bg-gradient-to-b from-[#F1F8E9]/20 to-white font-sans"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Branding, Typography & Action Buttons */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/50 text-red-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            People • Planet • Purpose
          </div>

          {/* Main Headline */}
          <h1 className="text-[#004d1a] font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-4">
            Sustainable Development Office
            <span className="block text-[#1B5E20] font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-1">
              Batangas State University Alangilan
            </span>
          </h1>

          {/* Slogan Statement */}
          <p className="italic font-semibold text-lg sm:text-xl lg:text-2xl text-emerald-800/90 leading-relaxed mb-6">
            "Future Ready, Sustainability Steady"
          </p>

          {/* Descriptive Context Subtext */}
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed font-light mb-8 max-w-2xl">
            The Sustainable Development Office–Alangilan embeds sustainability at
            the heart of the campus’s academic and administrative functions,
            advancing regional and global commitments to the United Nations’ 17
            Sustainable Development Goals (SDGs).
          </p>

          {/* Call to Action Button Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-[280px] sm:max-w-none sm:w-auto mb-4">
            {/* Solid Green CTA */}
            <a
              href="#sdgs"
              className="w-full sm:w-auto bg-[#004d1a] hover:bg-[#003311] text-white px-8 py-3.5 rounded-xl text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-200 text-center cursor-pointer"
            >
              Our Strategic Goals
            </a>

            {/* Outlined Light CTA */}
            <a
              href="#about"
              className="w-full sm:w-auto bg-white border border-[#004d1a]/30 hover:border-[#004d1a] text-[#004d1a] hover:bg-[#004d1a]/5 px-8 py-3.5 rounded-xl text-sm font-semibold tracking-wide shadow-sm hover:shadow transition-all duration-200 text-center cursor-pointer"
            >
              Read Latest Report
            </a>
          </div>
        </div>

        {/* Right Column: Layered Sustainability Image Collage */}
        <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[400px] lg:h-[450px] flex items-center justify-center mt-6 lg:mt-0 select-none">
          {/* Card 1: Organic Growth (Left Back) */}
          <div className="absolute top-0 left-4 w-[65%] aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white transform -rotate-3 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-500 z-10 group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80"
              alt="Sustainability seedling growth"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 z-10">
              <span className="text-white text-xs font-bold uppercase tracking-wider">Environmental Stewardship</span>
            </div>
          </div>

          {/* Card 2: Renewable Energy (Right Front) */}
          <div className="absolute bottom-4 right-4 w-[60%] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-3 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-500 z-20 group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80"
              alt="Clean solar panel infrastructure"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 z-10">
              <span className="text-white text-xs font-bold uppercase tracking-wider">Renewable Energy Solutions</span>
            </div>
          </div>

          {/* Card 3: Academic Collaboration (Small Floating Front) */}
          <div className="absolute top-12 right-12 w-[35%] aspect-square rounded-2xl overflow-hidden shadow-lg border-2 border-white transform -rotate-12 hover:rotate-0 hover:scale-115 hover:z-30 transition-all duration-500 z-30 group cursor-pointer hidden sm:block">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80"
              alt="Collaborative teamwork"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="mt-12 lg:mt-16 z-10">
        <a
          href="#about"
          className="text-[#004d1a]/60 animate-bounce cursor-pointer hover:text-[#004d1a] transition-colors inline-block"
          aria-label="Scroll to About Section"
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
