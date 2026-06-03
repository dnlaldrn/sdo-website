import logo from "../../assets/logo.jpg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "SDG Portal", href: "#" },
    { name: "University Site", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  return (
    <footer className="w-full bg-[#f4f8fa] text-gray-600 font-sans py-12 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Left Section: Branding & Copyright */}
        <div className="flex flex-col space-y-3 max-w-md">
          <div className="flex items-center gap-2">
            <img
              className="h-10 w-10 rounded-[50%]"
              src="src\assets\logo.jpg"
              src={logo}
            ></img>
            <h2 className="text-[#1B5E20] font-bold text-xl tracking-wide">
              SDO Alangilan
            </h2>
          </div>
          <div className="text-sm text-gray-500 leading-relaxed font-light">
            <p>© {currentYear} Sustainable Development Office - Alangilan.</p>
            <p>Preserving the future through institutional clarity.</p>
          </div>
        </div>

        {/* Right Section: Inline Links */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 md:pt-1">
          {footerLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-[#1B5E20] transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Row: Icons and Agenda Subtext */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mt-12 pt-6 border-t border-gray-200/50 gap-4">
        {/* Icons */}
        <div className="flex items-center space-x-3">
          {/* Globe Icon */}
          <a
            href="#"
            className="w-9 h-9 flex items-center justify-center bg-emerald-50 rounded-full text-[#004d1a] hover:bg-emerald-100 transition-colors"
            aria-label="Website"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-.11-7.843-.418m15.686 0a8.998 8.998 0 01-15.686 0"
              />
            </svg>
          </a>

          {/* Mail Icon */}
          <a
            href="#"
            className="w-9 h-9 flex items-center justify-center bg-emerald-50 rounded-full text-[#004d1a] hover:bg-emerald-100 transition-colors"
            aria-label="Email"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>
        </div>

        {/* Commitment Statement */}
        <div className="text-xs text-gray-400 font-light">
          Designed with commitment to the 2030 Agenda.
        </div>
      </div>
    </footer>
  );
}
