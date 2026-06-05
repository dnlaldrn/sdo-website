import { useState } from "react";
import ContactForm from "../components/ContactForm/ContactForm";
export default function Contact() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <section id="contact" className="w-full bg-[#f4f8fa] py-10 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA Green Box Container */}
        <div className="bg-[#1b5e20] text-white rounded-3xl p-8 sm:p-12 md:p-16 flex flex-col items-center text-center shadow-sm">
          {/* Main Headline Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-2xl">
            Be the Catalyst for Change
          </h2>

          {/* Descriptive Content Text */}
          <p className="text-emerald-100/90 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mb-10">
            Sustainability isn't a destination; it's a collective journey. Join
            our volunteer network, research partnerships, or community programs
            today.
          </p>

          {/* Action Buttons Wrap Container */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            {/* White Solid Interactive Button */}
            <button onClick={() => setIsOpen(!isOpen)}className="w-full sm:w-auto bg-white hover:bg-gray-100 text-[#1b5e20] font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors duration-200 shadow-sm">
              Join as a Volunteer
            </button>

            {/* Dark Green Outlined Custom Button */}
            <button className="w-full sm:w-auto bg-transparent hover:bg-black/10 border border-white/20 hover:border-white/40 text-white font-medium text-sm px-6 py-3.5 rounded-xl transition-all duration-200">
              Partner With Us
            </button>
           {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative bg-white rounded-2xl shadow-xl">
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <ContactForm />
          </div>
        </div>
      )}
          </div>
        </div>
      </div>
    </section>
  );
}
