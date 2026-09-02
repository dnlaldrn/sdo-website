import { useState, useEffect } from 'react';
import emailjs from "@emailjs/browser";
import { supabase } from "../../lib/supabaseClient";

const MAX_LENGTHS = {
  name: 50,
  email: 80,
  organization: 100,
  message: 500,
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: 'inquiry', // 'volunteer' | 'partner' | 'inquiry'
    organization: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(() => {
    try {
      const saved = sessionStorage.getItem("sdo_contact_last_submit");
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });
  const [popupModal, setPopupModal] = useState({
    isOpen: false,
    type: 'success', // 'success' | 'limit' | 'validation' | 'error'
    title: '',
    message: '',
    buttonText: 'Okay',
  });

  const openPopup = (type, title, message, buttonText = 'Okay') => {
    setPopupModal({
      isOpen: true,
      type,
      title,
      message,
      buttonText,
    });
  };

  const closePopup = () => {
    setPopupModal((prev) => ({ ...prev, isOpen: false }));
  };

  // Close popup modal on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };
    if (popupModal.isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [popupModal.isOpen]);

  // Helper to prevent 4+ consecutive identical characters (e.g. "eeee" -> "eee")
  const preventCharSpam = (text) => text.replace(/(.)\1{3,}/g, '$1$1$1');

  const validateField = (name, value) => {
    let errorMsg = '';
    const trimmed = value.trim();

    if (name === 'name') {
      if (!trimmed) {
        errorMsg = 'Full Name is required.';
      } else if (!/^[A-Za-z\s.-]+$/.test(value)) {
        errorMsg = 'Name must contain only letters, spaces, dots, or hyphens.';
      } else if (trimmed.length < 2) {
        errorMsg = 'Name must be at least 2 characters long.';
      } else if (value.length > MAX_LENGTHS.name) {
        errorMsg = `Name cannot exceed ${MAX_LENGTHS.name} characters.`;
      } else if (/(.)\1{3,}/.test(value)) {
        errorMsg = 'Name cannot contain repeated character spam.';
      }
    }

    if (name === 'email') {
      if (!trimmed) {
        errorMsg = 'Email address is required.';
      } else if (value.length > MAX_LENGTHS.email) {
        errorMsg = `Email cannot exceed ${MAX_LENGTHS.email} characters.`;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMsg = 'Please enter a valid email address.';
      } else if (/(.)\1{3,}/.test(value)) {
        errorMsg = 'Email contains repeated character spam.';
      }
    }

    if (name === 'organization') {
      if (!trimmed) {
        errorMsg = 'Organization name is required.';
      } else if (!/^[A-Za-z0-9\s.,&-]+$/.test(value)) {
        errorMsg = 'Organization name contains invalid characters.';
      } else if (trimmed.length < 2) {
        errorMsg = 'Organization name must be at least 2 characters long.';
      } else if (value.length > MAX_LENGTHS.organization) {
        errorMsg = `Organization name cannot exceed ${MAX_LENGTHS.organization} characters.`;
      } else if (/(.)\1{3,}/.test(value)) {
        errorMsg = 'Organization name contains repeated character spam.';
      }
    }

    if (name === 'message') {
      if (!trimmed) {
        errorMsg = 'Message is required.';
      } else if (trimmed.length < 10) {
        errorMsg = `Message must be at least 10 characters long (currently ${trimmed.length} chars).`;
      } else if (value.length > MAX_LENGTHS.message) {
        errorMsg = `Message cannot exceed ${MAX_LENGTHS.message} characters.`;
      } else if (/(.)\1{3,}/.test(value)) {
        errorMsg = 'Message contains repeated character spam.';
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg
    }));

    return errorMsg === '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let filteredValue = value;

    if (name === 'name') {
      // 1. Strip numbers and special symbols (only letters, spaces, dots, and hyphens)
      filteredValue = value.replace(/[^A-Za-z\s.-]/g, '');
      // 2. Limit repeated characters to max 3 consecutive repetitions
      filteredValue = preventCharSpam(filteredValue);
      // 3. Enforce maximum length
      if (filteredValue.length > MAX_LENGTHS.name) {
        filteredValue = filteredValue.slice(0, MAX_LENGTHS.name);
      }
    }

    if (name === 'email') {
      // 1. Remove spaces
      filteredValue = value.replace(/\s+/g, '');
      // 2. Limit repeated characters to max 3 consecutive repetitions
      filteredValue = preventCharSpam(filteredValue);
      // 3. Enforce maximum length
      if (filteredValue.length > MAX_LENGTHS.email) {
        filteredValue = filteredValue.slice(0, MAX_LENGTHS.email);
      }
    }

    if (name === 'organization') {
      // 1. Allow alphanumeric, spaces, periods, commas, ampersands, and hyphens
      filteredValue = value.replace(/[^A-Za-z0-9\s.,&-]/g, '');
      // 2. Limit repeated characters to max 3 consecutive repetitions
      filteredValue = preventCharSpam(filteredValue);
      // 3. Enforce maximum length
      if (filteredValue.length > MAX_LENGTHS.organization) {
        filteredValue = filteredValue.slice(0, MAX_LENGTHS.organization);
      }
    }

    if (name === 'message') {
      // 1. Limit repeated characters to max 3 consecutive repetitions
      filteredValue = preventCharSpam(value);
      // 2. Limit excessive consecutive newlines (max 2)
      filteredValue = filteredValue.replace(/\n{3,}/g, '\n\n');
      // 3. Enforce maximum length
      if (filteredValue.length > MAX_LENGTHS.message) {
        filteredValue = filteredValue.slice(0, MAX_LENGTHS.message);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: filteredValue
    }));
    validateField(name, filteredValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.target.tagName === 'TEXTAREA') {
        if (!e.shiftKey) {
          e.preventDefault();
          handleSubmit(e);
        }
      }
    }
  };

  const handlePurposeChange = (val) => {
    setFormData((prev) => {
      const updated = { ...prev, purpose: val };
      if (val !== 'partner') {
        updated.organization = '';
      }
      return updated;
    });
    setErrors((prev) => ({ ...prev, organization: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = Date.now();
    
    // Validate all fields on submit
    const isNameValid = validateField('name', formData.name);
    const isEmailValid = validateField('email', formData.email);
    const isOrgValid = formData.purpose === 'partner' 
      ? validateField('organization', formData.organization) 
      : true;
    const isMsgValid = validateField('message', formData.message);

    if (!isNameValid || !isEmailValid || !isOrgValid || !isMsgValid) {
      openPopup(
        'validation',
        'Please Check Your Inputs',
        'Please fill in all required fields and correct the highlighted errors before submitting.',
        'Review Form'
      );
      return;
    }

    if (now - lastSubmitTime < 60000) {
      openPopup(
        'limit',
        'Please Wait a Moment',
        'To prevent spam, please wait 1 minute before sending another message.',
        'Got it'
      );
      return;
    }

    setIsSubmitting(true);
    setLastSubmitTime(now);
    try {
      sessionStorage.setItem("sdo_contact_last_submit", String(now));
    } catch {
      // ignore storage errors
    }

    try {
      // 1. Insert message to Supabase database
      const { error: dbError } = await supabase.from("contact_messages").insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          purpose: formData.purpose,
          organization: formData.organization?.trim() || null,
          message: formData.message.trim(),
        },
      ]);

      if (dbError) {
        console.error("Supabase insert error:", dbError);
        throw dbError;
      }

      // 2. Optionally trigger EmailJS if configured
      if (
        import.meta.env.VITE_EMAILJS_SERVICE_ID &&
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      ) {
        try {
          await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
              name: formData.name,
              email: formData.email,
              purpose: formData.purpose,
              organization: formData.organization || "N/A",
              message: formData.message,
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          );
        } catch (emailErr) {
          console.warn("EmailJS notification failed, but message was saved in Supabase:", emailErr);
        }
      }

      openPopup(
        'success',
        'Message Sent!',
        'Thank you for reaching out to SDO Alangilan. We have received your message and will get back to you soon.',
        'Okay'
      );

      setFormData({
        name: "",
        email: "",
        purpose: "inquiry",
        organization: "",
        message: "",
      });

      setErrors({
        name: "",
        email: "",
        organization: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact submit error:", error);
      openPopup(
        'error',
        'Submission Failed',
        'Something went wrong while sending your message. Please check your connection and try again.',
        'Close'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-md border border-white/80 shadow-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 font-sans hover:shadow-2xl transition-shadow duration-300">
          
        {/* Form Header */}
        <div className="mb-2.5 sm:mb-4">
          <h3 className="text-[#064e3b] text-xl sm:text-2xl font-bold leading-tight mb-0.5 sm:mb-1">
           Send us a message
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed font-light">
            Have questions or want to collaborate on campus initiatives? Send us a message.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-2.5 sm:space-y-3.5">
        
        {/* Inquiry Purpose Selection Pills */}
        <div>
          <label className="block text-[#064e3b] text-[10px] font-bold uppercase tracking-wider mb-1.5">
            I want to:
          </label>
          <div role="radiogroup" aria-label="Inquiry Purpose" className="grid grid-cols-3 gap-2">
            {[
              { 
                id: "inquiry", 
                label: "Inquire", 
                val: "inquiry",
                icon: (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                )
              },
              { 
                id: "volunteer", 
                label: "Volunteer", 
                val: "volunteer",
                icon: (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" y1="8" x2="19" y2="14" />
                    <line x1="22" y1="11" x2="16" y2="11" />
                  </svg>
                )
              },
              { 
                id: "partner", 
                label: "Partner", 
                val: "partner",
                icon: (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                )
              },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={formData.purpose === item.val}
                onClick={() => handlePurposeChange(item.val)}
                className={`py-2 px-2 text-xs font-semibold rounded-xl border flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                  formData.purpose === item.val
                    ? "bg-[#064e3b] text-white border-[#064e3b] shadow-xs"
                    : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {/* Name Field */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label 
                htmlFor="name" 
                className="block text-[#064e3b] text-[10px] font-bold uppercase tracking-wider"
              >
                Full Name
              </label>
              <span className="text-[10px] font-medium text-gray-400">
                {formData.name.length}/{MAX_LENGTHS.name}
              </span>
            </div>
            <input
              type="text"
              id="name"
              name="name"
              required
              maxLength={MAX_LENGTHS.name}
              value={formData.name}
              onChange={handleChange}
              placeholder="Alex Morgan"
              className={`w-full bg-gray-50/80 border text-gray-800 text-xs sm:text-sm rounded-xl px-3.5 py-2 sm:py-2.5 outline-none transition-all duration-200 focus:bg-white focus:ring-2 placeholder:text-gray-400 ${
                errors.name 
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10' 
                  : 'border-gray-200 focus:border-[#064e3b] focus:ring-[#064e3b]/10'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-rose-600 text-[10px] font-medium flex items-center gap-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label 
                htmlFor="email" 
                className="block text-[#064e3b] text-[10px] font-bold uppercase tracking-wider"
              >
                Email Address
              </label>
              <span className="text-[10px] font-medium text-gray-400">
                {formData.email.length}/{MAX_LENGTHS.email}
              </span>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              required
              maxLength={MAX_LENGTHS.email}
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@university.edu"
              className={`w-full bg-gray-50/80 border text-gray-800 text-xs sm:text-sm rounded-xl px-3.5 py-2 sm:py-2.5 outline-none transition-all duration-200 focus:bg-white focus:ring-2 placeholder:text-gray-400 ${
                errors.email 
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10' 
                  : 'border-gray-200 focus:border-[#064e3b] focus:ring-[#064e3b]/10'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-rose-600 text-[10px] font-medium flex items-center gap-1">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Organization Field (Conditional for Partner) */}
        {formData.purpose === 'partner' && (
          <div className="animate-fadeIn duration-200">
            <div className="flex justify-between items-center mb-1">
              <label 
                htmlFor="organization" 
                className="block text-[#064e3b] text-[10px] font-bold uppercase tracking-wider"
              >
                Organization Name
              </label>
              <span className="text-[10px] font-medium text-gray-400">
                {formData.organization.length}/{MAX_LENGTHS.organization}
              </span>
            </div>
            <input
              type="text"
              id="organization"
              name="organization"
              required={formData.purpose === 'partner'}
              maxLength={MAX_LENGTHS.organization}
              value={formData.organization}
              onChange={handleChange}
              placeholder="Greenpeace / BSU Org"
              className={`w-full bg-gray-50/80 border text-gray-800 text-xs sm:text-sm rounded-xl px-3.5 py-2 sm:py-2.5 outline-none transition-all duration-200 focus:bg-white focus:ring-2 placeholder:text-gray-400 ${
                errors.organization 
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10' 
                  : 'border-gray-200 focus:border-[#064e3b] focus:ring-[#064e3b]/10'
              }`}
            />
            {errors.organization && (
              <p className="mt-1 text-rose-600 text-[10px] font-medium flex items-center gap-1">
                {errors.organization}
              </p>
            )}
          </div>
        )}

        {/* Message Field */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label 
              htmlFor="message" 
              className="block text-[#064e3b] text-[10px] font-bold uppercase tracking-wider"
            >
              Your Message
            </label>
            <span className="text-[10px] font-medium text-gray-400">
              {formData.message.length}/{MAX_LENGTHS.message}
            </span>
          </div>
          <textarea
            id="message"
            name="message"
            required
            rows="2.5"
            maxLength={MAX_LENGTHS.message}
            value={formData.message}
            onChange={handleChange}
            placeholder={
              formData.purpose === 'volunteer'
                ? "Tell us about your interests or why you'd like to volunteer..."
                : formData.purpose === 'partner'
                ? "Describe your collaboration proposal or resource request..."
                : "Tell us how we can help or ask a question..."
            }
            className={`w-full bg-gray-50/80 border text-gray-800 text-xs sm:text-sm rounded-xl px-3.5 py-2 sm:py-2.5 outline-none transition-all duration-200 focus:bg-white focus:ring-2 placeholder:text-gray-400 resize-none ${
              errors.message 
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10' 
                : 'border-gray-200 focus:border-[#064e3b] focus:ring-[#064e3b]/10'
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-rose-600 text-[10px] font-medium flex items-center gap-1">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#064e3b] hover:bg-[#043427] text-white font-medium text-xs sm:text-sm py-2.5 sm:py-3 px-4 rounded-xl shadow-xs hover:shadow-md active:scale-[0.99] transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-1"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </>
          ) : formData.purpose === 'volunteer' ? (
            'Join as Volunteer →'
          ) : formData.purpose === 'partner' ? (
            'Submit Proposal →'
          ) : (
            'Submit Message →'
          )}
        </button>

      </form>
    </div>

    {/* =========================================================================
        MODERN MINIMALIST UNIFIED POPUP MODAL (Centered with Icon, Title, Msg & Button)
    ========================================================================= */}
    {popupModal.isOpen && (
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={closePopup}
      >
        <div
          className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 sm:p-7 text-center flex flex-col items-center justify-center animate-in zoom-in-95 duration-200 border border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Centered Status Icon Circle */}
          {popupModal.type === 'success' && (
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-[#064e3b] border border-emerald-200/60 flex items-center justify-center mb-3.5 shadow-xs">
              <svg
                className="w-7 h-7 stroke-[#064e3b]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}

          {popupModal.type === 'limit' && (
            <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center mb-3.5 shadow-xs">
              <svg
                className="w-7 h-7 stroke-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
          )}

          {popupModal.type === 'validation' && (
            <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center mb-3.5 shadow-xs">
              <svg
                className="w-7 h-7 stroke-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          )}

          {popupModal.type === 'error' && (
            <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 border border-rose-200/60 flex items-center justify-center mb-3.5 shadow-xs">
              <svg
                className="w-7 h-7 stroke-rose-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
          )}

          {/* Title */}
          <h3
            className={`text-xl font-bold mb-1.5 text-center ${
              popupModal.type === 'success'
                ? 'text-[#064e3b]'
                : popupModal.type === 'error'
                ? 'text-rose-800'
                : 'text-amber-800'
            }`}
          >
            {popupModal.title}
          </h3>

          {/* Short Centered Description */}
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-5 font-light text-center">
            {popupModal.message}
          </p>

          {/* Centered Action Button */}
          <button
            type="button"
            onClick={closePopup}
            className={`w-full text-white font-semibold text-xs sm:text-sm py-2.5 sm:py-3 px-6 rounded-xl shadow-xs hover:shadow-md active:scale-98 transition-all duration-150 cursor-pointer ${
              popupModal.type === 'error'
                ? 'bg-rose-700 hover:bg-rose-800'
                : 'bg-[#064e3b] hover:bg-[#043427]'
            }`}
          >
            {popupModal.buttonText}
          </button>
        </div>
      </div>
    )}
  </>
  );
};

export default ContactForm;