import { useState } from 'react';
import emailjs from "@emailjs/browser";

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
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | 'error-validation' | null

  const validateField = (name, value) => {
    let errorMsg = '';

    if (name === 'name') {
      const trimmed = value.trim();
      if (!value) {
        errorMsg = 'Full Name is required.';
      } else if (!/^[A-Za-z\s.-]+$/.test(value)) {
        errorMsg = 'Name must contain only letters, spaces, dots, or hyphens.';
      } else if (trimmed.length < 2 || trimmed.length > 50) {
        errorMsg = 'Name must be between 2 and 50 characters.';
      }
    }

    if (name === 'email') {
      if (!value) {
        errorMsg = 'Email address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMsg = 'Please enter a valid email address.';
      }
    }

    if (name === 'organization') {
      const trimmed = value.trim();
      if (!value) {
        errorMsg = 'Organization name is required.';
      } else if (!/^[A-Za-z0-9\s.,&-]+$/.test(value)) {
        errorMsg = 'Organization name contains invalid characters.';
      } else if (trimmed.length < 2 || trimmed.length > 100) {
        errorMsg = 'Organization name must be between 2 and 100 characters.';
      }
    }

    if (name === 'message') {
      const trimmed = value.trim();
      if (!value) {
        errorMsg = 'Message is required.';
      } else if (trimmed.length < 10) {
        errorMsg = `Message must be at least 10 characters long (currently ${trimmed.length} chars).`;
      } else if (trimmed.length > 1000) {
        errorMsg = `Message cannot exceed 1000 characters (currently ${trimmed.length} chars).`;
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
      // 2. Limit spammed repeated letters to max 3 consecutive repetitions
      filteredValue = filteredValue.replace(/(.)\1{3,}/g, '$1$1$1');
    }

    if (name === 'organization') {
      // Allow alphanumeric, spaces, periods, commas, ampersands, and hyphens
      filteredValue = value.replace(/[^A-Za-z0-9\s.,&-]/g, '');
      // Limit repeated spammed characters to max 3 consecutive
      filteredValue = filteredValue.replace(/(.)\1{3,}/g, '$1$1$1');
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
    
    // Validate all fields on submit
    const isNameValid = validateField('name', formData.name);
    const isEmailValid = validateField('email', formData.email);
    const isOrgValid = formData.purpose === 'partner' 
      ? validateField('organization', formData.organization) 
      : true;
    const isMsgValid = validateField('message', formData.message);

    if (!isNameValid || !isEmailValid || !isOrgValid || !isMsgValid) {
      setSubmitStatus('error-validation');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

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

setSubmitStatus("success");

setFormData({
  name: "",
  email: "",
  purpose: "Inquiry",
  organization: "",
  message: "",
});

setErrors({
  name: "",
  email: "",
  organization: "",
  message: "",
});
    } catch(error) {
       console.log(error);
      console.log(error.text);
      console.log(error.status);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white border border-gray-100 shadow-sm rounded-3xl p-6 sm:p-8 md:p-10 font-sans hover:shadow-md transition-shadow duration-300">
        
        {/* Form Header */}
        <div className="mb-8">
          <h3 className="text-[#064e3b] text-2xl md:text-3xl font-bold mb-2">
            Get in Touch
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Have questions or want to collaborate on our campus initiatives? Let us know how we can help.
          </p>
        </div>

        {/* Status Notifications */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-xl border border-emerald-100 flex items-center gap-2">
            ✨ Message sent successfully! We'll be in touch soon.
          </div>
        )}
        {submitStatus === 'error-validation' && (
          <div className="mb-6 p-4 bg-rose-50 text-rose-700 text-sm font-medium rounded-xl border border-rose-100 flex items-center gap-2">
            ⚠️ Please correct the highlighted errors before submitting.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-rose-50 text-rose-700 text-sm font-medium rounded-xl border border-rose-100 flex items-center gap-2">
            ❌ Something went wrong on the server. Please try again.
          </div>
        )}

        {/* Contact Form */}
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-6">
          
          {/* Inquiry Purpose Selection Pills */}
          <div>
            <label className="block text-[#064e3b] text-xs font-bold uppercase tracking-wider mb-2.5">
              I want to:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { 
                  id: "inquiry", 
                  label: "Inquire", 
                  val: "inquiry",
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  )
                },
                { 
                  id: "volunteer", 
                  label: "Volunteer", 
                  val: "volunteer",
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  )
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handlePurposeChange(item.val)}
                  className={`py-2.5 px-2 text-xs sm:text-sm font-bold rounded-xl border flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
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

          {/* Name Field */}
          <div>
            <label 
              htmlFor="name" 
              className="block text-[#064e3b] text-xs font-bold uppercase tracking-wider mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              maxLength={50}
              value={formData.name}
              onChange={handleChange}
              placeholder="Alex Morgan"
              className={`w-full bg-gray-50 border text-gray-800 text-sm rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:bg-white focus:ring-2 placeholder:text-gray-400 ${
                errors.name 
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10' 
                  : 'border-gray-200 focus:border-[#064e3b] focus:ring-[#064e3b]/10'
              }`}
            />
            {errors.name && (
              <p className="mt-1.5 text-rose-600 text-xs font-medium animate-fadeIn flex items-center gap-1">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-[#064e3b] text-xs font-bold uppercase tracking-wider mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              maxLength={80}
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@university.edu"
              className={`w-full bg-gray-50 border text-gray-800 text-sm rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:bg-white focus:ring-2 placeholder:text-gray-400 ${
                errors.email 
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10' 
                  : 'border-gray-200 focus:border-[#064e3b] focus:ring-[#064e3b]/10'
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-rose-600 text-xs font-medium animate-fadeIn flex items-center gap-1">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {errors.email}
              </p>
            )}
          </div>

          {/* Organization Field (Conditional) */}
          {formData.purpose === 'partner' && (
            <div className="animate-fadeIn duration-200">
              <label 
                htmlFor="organization" 
                className="block text-[#064e3b] text-xs font-bold uppercase tracking-wider mb-2"
              >
                Organization / Institution Name
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                required={formData.purpose === 'partner'}
                maxLength={100}
                value={formData.organization}
                onChange={handleChange}
                placeholder="Greenpeace Batangas / BSU Org"
                className={`w-full bg-gray-50 border text-gray-800 text-sm rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:bg-white focus:ring-2 placeholder:text-gray-400 ${
                  errors.organization 
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10' 
                    : 'border-gray-200 focus:border-[#064e3b] focus:ring-[#064e3b]/10'
                }`}
              />
              {errors.organization && (
                <p className="mt-1.5 text-rose-600 text-xs font-medium animate-fadeIn flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {errors.organization}
                </p>
              )}
            </div>
          )}

          {/* Message Field */}
          <div>
            <label 
              htmlFor="message" 
              className="block text-[#064e3b] text-xs font-bold uppercase tracking-wider mb-2"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="4"
              maxLength={500}
              value={formData.message}
              onChange={handleChange}
              placeholder={
                formData.purpose === 'volunteer'
                  ? "Tell us about your interests, skills, or why you'd like to volunteer..."
                  : formData.purpose === 'partner'
                  ? "Describe your collaboration proposal, target SDGs, or resource request..."
                  : "Tell us how we can help or ask a question..."
              }
              className={`w-full bg-gray-50 border text-gray-800 text-sm rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:bg-white focus:ring-2 placeholder:text-gray-400 resize-none ${
                errors.message 
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10' 
                  : 'border-gray-200 focus:border-[#064e3b] focus:ring-[#064e3b]/10'
              }`}
            />
            {errors.message && (
              <p className="mt-1.5 text-rose-600 text-xs font-medium animate-fadeIn flex items-center gap-1">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#064e3b] hover:bg-[#043427] text-white font-medium text-sm py-3.5 px-5 rounded-xl shadow-xs hover:shadow-md active:scale-[0.99] transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </>
            ) : formData.purpose === 'volunteer' ? (
              'Join as Volunteer'
            ) : formData.purpose === 'partner' ? (
              'Submit Proposal'
            ) : (
              'Submit Message'
            )}
          </button>

        </form>
      </div>
  );
};

export default ContactForm;