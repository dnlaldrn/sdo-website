import { useState, useEffect } from "react";
import { navItems } from "../../../utils/navItems";
import HomeSectionLogo from "../../assets/HomeSectionLogo.png";

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
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 20;

      if (isBottom) {
        setActiveSection(navItems[navItems.length - 1].path);
        return;
      }

      const scrollPosition = window.scrollY + 120;
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
      {/* =========================
          TOP HEADER NAVBAR
      ========================== */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg py-2.5 max-md:translate-y-0 max-md:opacity-100"
            : "bg-transparent py-4 sm:py-5 pb-5 max-md:-translate-y-full max-md:opacity-0 max-md:pointer-events-none"
        }`}
      >
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 md:px-8 flex items-center justify-between">
          {/* Logo (Desktop only when at top, or both on scroll) */}
          <a href="#home" className="hidden md:flex items-center cursor-pointer">
            <img
              className="h-9 sm:h-15 w-auto object-contain drop-shadow-md"
              src={HomeSectionLogo}
              alt="SDO Alangilan Logo"
            />
          </a>

          {/* =========================
              DESKTOP CENTERED NAVIGATION
          ========================== */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-20">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={`relative py-1.5 text-sm transition-colors duration-200 ${
                  activeSection === item.path
                    ? "text-[#8BC34A] font-bold"
                    : "text-white/85 hover:text-white font-medium"
                }`}
              >
                {item.name}

                {/* Active indicator */}
                {activeSection === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8BC34A] rounded-full shadow-[0_0_8px_#8BC34A]" />
                )}
              </a>
            ))}
          </div>

          {/* =========================
              MOBILE SCROLLED HEADER NAVIGATION
          ========================== */}
          <div className="md:hidden flex items-center justify-around w-full py-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={`relative px-2.5 py-1 text-xs transition-colors duration-200 ${
                  activeSection === item.path
                    ? "text-[#8BC34A] font-bold"
                    : "text-white/80 hover:text-white font-medium"
                }`}
              >
                {item.name}

                {/* Mobile active indicator dot */}
                {activeSection === item.path && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#8BC34A] rounded-full shadow-[0_0_6px_#8BC34A]" />
                )}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
