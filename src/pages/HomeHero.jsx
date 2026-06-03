import heroimage from '../assets/heroimage.jpg';

export default function HomeHero() {
  return (
    <section id="home" className="w-full bg-[#f4f8fa] flex items-center justify-center py-7 px-6 min-h-[calc(100vh-5rem)]">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Central Rounded Logo/Badge Container */}
        <div className="w-100 h-50 bg-white p-2 rounded-2xl shadow-md flex items-center justify-center mb-10 transition-transform duration-300 hover:scale-105">
          <img 
            src={heroimage} 
            alt="SDO Alangilan Sustainable Development Logo" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Main Header Title */}
        <h1 className="text-[#004d1a] font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight max-w-3xl mb-6">
          Preserving the Future Through <br />
          <span className="italic font-semibold block mt-1">Institutional Clarity</span>
        </h1>

        {/* Supporting Description Subtext */}
        <p className="text-gray-600 text-base md:text-lg leading-relaxed font-light max-w-2xl mb-10">
          At the Sustainable Development Office of Alangilan, we orchestrate environmental stewardship 
          and academic excellence into a unified vision for a greener, more resilient campus.
        </p>

        {/* Call to Action Button Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 w-full sm:w-auto">
          {/* Solid Green CTA */}
          <button className="w-full sm:w-auto bg-[#004d1a] hover:bg-[#003311] text-white px-8 py-3.5 rounded-lg text-sm font-medium tracking-wide shadow-sm transition-colors duration-200">
            Our Strategic Goals
          </button>
          
          {/* Outlined Custom CTA */}
          <button className="w-full sm:w-auto bg-transparent border border-[#004d1a]/40 hover:border-[#004d1a] text-[#004d1a] hover:bg-[#004d1a]/5 px-8 py-3.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-200">
            Read Latest Report
          </button>
        </div>

        {/* Animated Chevron Down Indicator */}
        <div className="text-[#004d1a]/60 animate-bounce cursor-pointer hover:text-[#004d1a] transition-colors">
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
        </div>

      </div>
    </section>
  );
}