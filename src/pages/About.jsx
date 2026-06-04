export default function About() {
  return (
    <section id="about" className="w-full bg-[#F1F8E9] py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Text Content (Occupies 5 columns on large screens) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <span className="text-[#8BC34A] uppercase font-semibold text-xs tracking-widest">
            The Foundation
          </span>

          <h2 className="text-[#263238] font-bold text-3xl sm:text-4xl tracking-tight leading-tight">
            Our Commitment to Sustainability
          </h2>

          <p className="text-[#263238] text-sm sm:text-base leading-relaxed font-light">
            The Sustainable Development Office - Alangilan serves as the core
            catalyst for integrating ESG (Environmental, Social, and Governance)
            principles within our institution. We bridge the gap between
            academic theory and practical community impact.
          </p>

          <p className="text-[#263238] text-sm sm:text-base leading-relaxed font-light">
            Our mission is to foster a culture where every research paper, every
            classroom discussion, and every operational decision contributes to
            the 2030 Agenda. We don't just teach sustainability; we embody it.
          </p>
        </div>

        {/* Right Column: Image Graphic Display (Occupies 7 columns on large screens) */}
        <div className="lg:col-span-7 relative flex justify-center lg:justify-end pt-6 lg:pt-0">
          {/* Main Tilted Graphical Container Card */}
          <div className="relative bg-white p-4 rounded-2xl shadow-xl shadow-gray-200/60 max-w-lg rotate-2 transition-transform duration-300 hover:rotate-0">
            <img
              src="./src/assets/heroimage.jpg"
              alt="Sustainable Development Office Badge and Matrix"
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>

          {/* Overlapping Floating Metric/Stats Badge Element */}
          <div className="absolute -bottom-6 left-4 sm:left-12 lg:left-8 bg-[#8BC34A] text-[#263238] p-5 rounded-2xl shadow-lg w-36 h-36 flex flex-col justify-center transition-transform duration-300 hover:scale-105">
            <span className="font-bold text-xl sm:text-2xl block mb-1">
              100+
            </span>
            <span className="text-xs sm:text-sm font-medium leading-snug">
              Local Initiatives
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
