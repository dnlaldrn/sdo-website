import { footerLinks } from "../../../utils/footerLinks";
import ContactForm from "../ContactForm/ContactForm";
import ContactSectionImage from "../../assets/ContactSection.jpg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative w-full min-h-screen lg:h-screen lg:max-h-[1080px] flex flex-col justify-between font-sans overflow-hidden bg-[#041a0d]"
    >
      {/* Background Photo with Dark Forest Emerald Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ContactSectionImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#02140a]/92 via-[#041a0d]/88 to-[#02140a]/95 backdrop-blur-[2px]" />

      {/* 1. Upper Section: Contact Split Grid (DEVCON Layout, Centered 1-Screen Fit) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex items-center py-6 sm:py-8 lg:py-6 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
          {/* Left Column: Header & Sleek Channel List */}
          <div className="lg:col-span-5 flex flex-col space-y-4 sm:space-y-5 text-left">
            <div>
              <span className="text-[#8BC34A] text-xs font-bold uppercase tracking-widest block mb-1">
                GET IN TOUCH
              </span>
              <h2 className="text-white text-2xl sm:text-3xl lg:text-[2.2rem] font-md tracking-tight leading-tight whitespace-nowrap">
                Contact SDO Alangilan
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mt-2 font-light max-w-md">
                Have questions about campus sustainability initiatives, events,
                or partnership opportunities? Reach out through any of our
                official channels or send us a direct message.
              </p>
            </div>

            {/* DEVCON-Style Contact Channels List */}
            <div className="space-y-3 pt-0.5">
              {/* Channel 1: Email */}
              <div className="flex items-center gap-3 group">
                <div className="w-9 h-9 shrink-0 rounded-xl bg-white/10 text-[#8BC34A] border border-white/15 flex items-center justify-center group-hover:bg-[#8BC34A] group-hover:text-[#041a0d] transition-all duration-200">
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
                </div>
                <div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                    Email
                  </span>
                  <a
                    href="mailto:sdo.alangilan@g.batstate-u.edu.ph"
                    className="text-xs sm:text-sm font-semibold text-white hover:text-[#8BC34A] transition-colors break-all"
                  >
                    sdo.alangilan@g.batstate-u.edu.ph
                  </a>
                </div>
              </div>

              {/* Channel 2: Official Facebook */}
              <div className="flex items-center gap-3 group">
                <div className="w-9 h-9 shrink-0 rounded-xl bg-white/10 text-[#8BC34A] border border-white/15 flex items-center justify-center group-hover:bg-[#8BC34A] group-hover:text-[#041a0d] transition-all duration-200">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                    Official Facebook
                  </span>
                  <a
                    href="https://www.facebook.com/profile.php?id=61587545961771"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-semibold text-white hover:text-[#8BC34A] transition-colors inline-flex items-center gap-1"
                  >
                    <span>SDO Alangilan Chapter</span>
                    <span className="text-xs">↗</span>
                  </a>
                  <p className="text-gray-400 text-[10px] font-light">
                    Announcements, campaigns & updates
                  </p>
                </div>
              </div>

              {/* Channel 3: Campus Location (Clickable Google Maps link) */}
              <div className="flex items-center gap-3 group">
                <div className="w-9 h-9 shrink-0 rounded-xl bg-white/10 text-[#8BC34A] border border-white/15 flex items-center justify-center group-hover:bg-[#8BC34A] group-hover:text-[#041a0d] transition-all duration-200">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                    Campus Location
                  </span>
                  <a
                    href="https://share.google/r6q6yZVQ2kJz9ZWuw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-semibold text-white hover:text-[#8BC34A] transition-colors inline-flex items-center gap-1"
                  >
                    <span>
                      Albert Einstein Building, First Floor, Left Side
                    </span>
                    <span className="text-xs">↗</span>
                  </a>
                  <p className="text-gray-400 text-[10px] font-light">
                    BatStateU Alangilan Campus, Batangas City
                  </p>
                </div>
              </div>

              {/* Channel 4: Office Hours */}
              <div className="flex items-center gap-3 group">
                <div className="w-9 h-9 shrink-0 rounded-xl bg-white/10 text-[#8BC34A] border border-white/15 flex items-center justify-center group-hover:bg-[#8BC34A] group-hover:text-[#041a0d] transition-all duration-200">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                    Office Hours
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    Monday – Friday, 8:00 AM – 5:00 PM
                  </p>
                  <p className="text-gray-400 text-[10px] font-light">
                    Excluding university holidays
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Contact Form Card */}
          <div className="lg:col-span-7 w-full flex justify-center lg:justify-end">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="relative z-10 border-white/10 max-w-7xl mx-auto" />

      {/* 2. Lower Section: Standard Footer Row */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-2.5 pb-4 sm:pb-5 px-4 sm:px-6">
        {/* Bottom Row: Navigation, Utility Links & Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          {/* Left: Copyright */}
          <div className="text-xs text-gray-400 font-normal text-center sm:text-left leading-relaxed">
            <div>
              © {currentYear} Sustainable Development Office - Alangilan.
            </div>
          </div>

          {/* Center/Right: Nav Links */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-light text-gray-400 hover:text-[#8BC34A] transition-colors duration-200 text-[11px]"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
