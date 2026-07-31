import { useState, useEffect } from "react";
import { navItems } from "../../../utils/navItems";


export default function Navbar() {
  const [activeSection, setActiveSection] = useState("#home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle scrolled state based on window position
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check if user is scrolled to the absolute bottom of the page
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;
      if (isBottom) {
        setActiveSection(navItems[navItems.length - 1].path);
        return;
      }

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
      <nav className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 ease-in-out ${
        isScrolled
          ? "translate-y-0 opacity-100 bg-[#F1F8E9]/80 backdrop-blur-md border-b border-gray-100 shadow-sm"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-15 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <div className="flex gap-2 items-center">
            <img
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-[50%]"
              src="/logo.jpg"
            
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2M4.93 4.93l1.41 1.41M2 12h2M4.93 19.07l1.41-1.41M12 20v2M17.66 19.07l-1.41-1.41M22 12h-2M17.66 4.93l-1.41 1.41" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 16a5 5 0 116 0c0 1.25.5 2 1 3H8c.5-1 1-1.75 1-3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 21.5h4.5" />
              </svg>
            );
          } else if (item.name === "Contact") {
            icon = (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
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
