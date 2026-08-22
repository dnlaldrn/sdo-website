import aboutImg from "../assets/AboutImage.png";

export default function About() {
  return (
    <section
      id="about"
      className="w-full bg-[#F1F8E9] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 font-sans"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Narrative, Headline & Quick Impact Byte */}
        <div className="lg:col-span-6 flex flex-col space-y-3 text-left">
          {/* Eyebrow Category Tag */}
          <span className="text-[#1B5E20] font-bold text-xs uppercase tracking-widest">
            ABOUT SDO ALANGILAN
          </span>

          {/* Main Section Headline */}
          <h2 className="text-[#064e3b] font-md text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15]">
            Where Purpose, Policy, and Campus Action Connect
          </h2>

          {/* Core Descriptive Text */}
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed font-light">
            The Sustainable Development Office–Alangilan embeds sustainability at
            the heart of the campus’s academic and administrative functions,
            advancing regional and global commitments to the United Nations’ 17
            Sustainable Development Goals (SDGs).
          </p>

          {/* Quick Impact Byte Callout (DEVCON Inspo Layout) */}
          <div className="border-l-2 border-[#1B5E20] pl-4 sm:pl-5 space-y-2.5 py-1">
            <h3 className="text-[#064e3b] font-bold text-xs uppercase tracking-wider">
              QUICK IMPACT BYTE!
            </h3>
            <div className="text-gray-600 text-xs sm:text-sm leading-relaxed space-y-2">
              <p>
                <strong className="text-gray-800">Did you know?</strong> SDO Alangilan actively champions campus-wide sustainability campaigns—from energy conservation and responsible consumption to environmental education like the{" "}
                <em className="text-[#1B5E20] font-medium not-italic">"Leaf Me a Fact"</em>{" "}
                advocacy series.
              </p>
              <p>
                We collaborate with academic departments, student leaders, and community partners to transform global sustainability goals into actionable local initiatives. If you are interested in collaborating or volunteering, connect with us and take part in our journey!
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: High-Impact Rounded Photography Display */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group transition-all duration-300 hover:shadow-3xl">
            <img
              src={aboutImg}
              alt="SDO Alangilan Sustainability Advocacies and Leaf Me a Fact Infographics"
              className="w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

