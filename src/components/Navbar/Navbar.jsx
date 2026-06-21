import { useState, useEffect } from "react";

const navItems = [
  { name: "Home", path: "#home" },
  { name: "About", path: "#about" },
  { name: "SDGs", path: "#sdgs" },
  { name: "Initiatives", path: "#initiatives" },
  { name: "Contact", path: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
    <nav className="sticky top-0 z-40 w-full bg-[#F1F8E9]/80 backdrop-blur-md border-b border-gray-100 font-sans shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <div className="flex gap-2 items-center">
          <img
            className="h-10 w-10 rounded-[50%]"
            src="src/assets/logo.jpg"
            alt="SDO Alangilan Logo"
          />
          <p className="text-[#1B5E20] font-bold text-xl tracking-wide shrink-0">
            SDO Alangilan
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
          <button className="bg-[#1B5E20] hover:bg-[#003311] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200">
            Get Involved
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-[#004d1a] focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className="block w-full text-left py-2 text-base font-medium text-gray-600 hover:text-[#004d1a]"
            >
              {item.name}
            </a>
          ))}
          <button className="w-full text-center bg-[#004d1a] text-white px-5 py-2.5 rounded-lg text-sm font-medium pt-2">
            Get Involved
          </button>
        </div>
      )}
    </nav>
  );
}
