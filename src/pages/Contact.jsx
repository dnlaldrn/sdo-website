import ContactForm from "../components/ContactForm/ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="w-full bg-gradient-to-b from-white to-[#F1F8E9]/30 py-14 px-6 font-sans border-t border-[#1B5E20]/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Office Info & Badges */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div>
              <span className="text-[#1B5E20] text-xs font-bold uppercase tracking-widest block mb-2 bg-[#F1F8E9] w-fit px-3.5 py-1.5 rounded-full border border-[#1B5E20]/10 shadow-xs">
                🌱 Get in Touch
              </span>
              <h2 className="text-[#064e3b] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mt-3">
                Let's Shape a Greener Tomorrow
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-4">
                Sustainability isn't a destination; it's a collective journey. Whether you want to volunteer for campus cleanups, partner with us on green research, or simply ask a question, we'd love to hear from you.
              </p>
            </div>

            {/* Contact Details Cards */}
            <div className="space-y-4">
              {/* Card 1: Location */}
              <div className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-[#F1F8E9] rounded-xl text-[#1B5E20]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[#064e3b] text-sm font-bold">Office Location</h4>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                    Student Center Building, 3rd Floor, Batangas State University Alangilan Campus, Alangilan, Batangas City
                  </p>
                </div>
              </div>

              {/* Card 2: Email */}
              <a 
                href="mailto:sdo.alangilan@g.batstate-u.edu.ph"
                className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-[#F1F8E9] rounded-xl text-[#1B5E20] group-hover:bg-[#1B5E20] group-hover:text-white transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[#064e3b] text-sm font-bold group-hover:text-[#1B5E20] transition-colors">Email Address</h4>
                  <p className="text-gray-500 text-xs mt-1 break-all">
                    sdo.alangilan@g.batstate-u.edu.ph
                  </p>
                </div>
              </a>

              {/* Card 3: Office Hours */}
              <div className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-[#F1F8E9] rounded-xl text-[#1B5E20]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[#064e3b] text-sm font-bold">Office Hours</h4>
                  <p className="text-gray-500 text-xs mt-1">
                    Monday – Friday, 8:00 AM – 5:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* SDO Impact Stats */}
            <div className="pt-6 border-t border-gray-100">
              <h5 className="text-[#064e3b] text-xs font-bold uppercase tracking-wider mb-4">
                SDO Alangilan Impact
              </h5>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white border border-gray-100 rounded-2xl p-3 text-center shadow-xs">
                  <span className="block text-2xl font-bold text-[#1b5e20]">17</span>
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">SDGs Active</span>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-3 text-center shadow-xs">
                  <span className="block text-2xl font-bold text-[#1b5e20]">150+</span>
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Volunteers</span>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-3 text-center shadow-xs">
                  <span className="block text-2xl font-bold text-[#1b5e20]">25+</span>
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Partners</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Form Placement */}
          <div className="lg:col-span-7 w-full flex justify-center lg:justify-end">
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}

