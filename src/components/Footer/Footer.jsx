import logo from "../../assets/logo.jpg";
import { footerLinks } from "../../../utils/footerLinks";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#F1F8E9] text-gray-600 font-sans py-6 px-6 border-t border-[#1B5E20]/15">
      <div className="max-w-7xl mx-auto">
        {/* Top Row: Logo & Social/Contact Icons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-2.5">
            <img
              className="h-8 w-8 rounded-full object-cover border border-[#1B5E20]/20"
              src={logo}
              alt="SDO Alangilan Logo"
            />
            <span className="text-[#1B5E20] font-bold text-lg tracking-wide whitespace-nowrap">
              Sustainable Development Office
            </span>
          </div>

          {/* Socials / Contact Links */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#1B5E20]/75 uppercase tracking-wider hidden sm:inline">
              Join the conversation:
            </span>
            <div className="flex items-center gap-2">
              {/* Globe Icon */}
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center bg-white hover:bg-white/80 rounded-full text-[#1B5E20] border border-[#1B5E20]/10 shadow-sm transition-all duration-200"
                aria-label="Website"
              >
                <svg
                  className="w-4 h-4"
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
                href="mailto:sdo.alangilan@g.batstate-u.edu.ph"
                className="w-8 h-8 flex items-center justify-center bg-white hover:bg-white/80 rounded-full text-[#1B5E20] border border-[#1B5E20]/10 shadow-sm transition-all duration-200"
                aria-label="Email"
              >
                <svg
                  className="w-4 h-4"
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
          </div>
        </div>

        {/* Divider */}
        <hr className="border-[#1B5E20]/10 my-6" />

        {/* Bottom Row: Navigation, Utility Links & Copyright */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Left: Copyright */}
          <div className="text-xs text-gray-500 font-normal text-center lg:text-left leading-relaxed">
            <div>
              © {currentYear} Sustainable Development Office - Alangilan.
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">
              Preserving the future through institutional clarity.
            </div>
          </div>

          {/* Center/Right: Combined Nav Links & Utility Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs text-center">
            {/* Utility Links */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-light text-gray-400 hover:text-[#1B5E20] transition-colors duration-200 text-[11px]"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
