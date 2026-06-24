import { useState, useEffect } from "react";
import { navItems } from "../../../utils/navItems";


export default function Navbar() {
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // Offset for header height
      let currentSection = "#home";

      for (const item of navItems) {
        const el = document.getElementById(item.path.substring(1));
        if (el) {
          const offsetTop = el.offsetTop;
          if (scrollPosition >= offsetTop) {
            currentSection = item.path;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Header Navbar */}
      <nav className="sticky top-0 z-40 w-full bg-[#F1F8E9]/80 backdrop-blur-md border-b border-gray-100 font-sans shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-15 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <div className="flex gap-2 items-center">
            <img
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-[50%]"
              src="src/assets/logo.jpg"
              alt="SDO Alangilan Logo"
            />
            <p className="text-[#1B5E20] font-bold text-sm sm:text-base md:text-xl tracking-wide shrink-0">
              Sustainable Development Office
            </p>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.path
                    ? "text-[#1B5E20] font-semibold"
                    : "text-gray-600 hover:text-[#004d1a]"
                }`}
              >
                {item.name}
                {activeSection === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1B5E20] rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Call to Action Button */}
          <div className="hidden md:block">
            <a href="#contact" className="bg-[#1B5E20] hover:bg-[#003311] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200">
              Get Involved
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Sticky Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#F1F8E9]/95 backdrop-blur-md border-t border-gray-200/50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] px-4 py-2 flex justify-around items-center pb-safe-bottom">
        {navItems.map((item) => {
          let icon;
          if (item.name === "Home") {
            icon = (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            );
          } else if (item.name === "About") {
            icon = (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            );
          } else if (item.name === "SDGs") {
            icon = (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 3v18M3 12h18M12 3a16.5 16.5 0 00-4 9 16.5 16.5 0 004 9M12 3a16.5 16.5 0 014 9 16.5 16.5 0 01-4 9" />
              </svg>
            );
          } else if (item.name === "Initiatives") {
            icon = (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 19.5h4.5" />
              </svg>
            );
          } else if (item.name === "Contact") {
            icon = (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            );
          }

          const isActive = activeSection === item.path;

          return (
            <a
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 ${
                isActive ? "text-[#1B5E20] scale-105" : "text-gray-500 hover:text-[#004d1a]"
              }`}
            >
              <div className={`p-1 rounded-full transition-colors duration-200 ${
                isActive ? "bg-[#1B5E20]/10" : "bg-transparent"
              }`}>
                {icon}
              </div>
              <span className="text-[10px] font-medium tracking-wide mt-0.5">{item.name}</span>
            </a>
          );
        })}
      </div>
    </>
  );
}
