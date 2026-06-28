import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: 'inquiry', // 'volunteer' | 'partner' | 'inquiry'
    organization: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API submit timeout
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', purpose: 'inquiry', organization: '', message: '' });
    } catch {
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
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-rose-50 text-rose-700 text-sm font-medium rounded-xl border border-rose-100 flex items-center gap-2">
            ❌ Something went wrong. Please try again.
          </div>
        )}

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
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
                  onClick={() => setFormData((prev) => ({ ...prev, purpose: item.val }))}
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
              value={formData.name}
              onChange={handleChange}
              placeholder="Alex Morgan"
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:bg-white focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/10 placeholder:text-gray-400"
            />
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
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@university.edu"
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:bg-white focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/10 placeholder:text-gray-400"
            />
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
                value={formData.organization}
                onChange={handleChange}
                placeholder="Greenpeace Batangas / BSU Org"
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:bg-white focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/10 placeholder:text-gray-400"
              />
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
              value={formData.message}
              onChange={handleChange}
              placeholder={
                formData.purpose === 'volunteer'
                  ? "Tell us about your interests, skills, or why you'd like to volunteer..."
                  : formData.purpose === 'partner'
                  ? "Describe your collaboration proposal, target SDGs, or resource request..."
                  : "Tell us how we can help or ask a question..."
              }
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:bg-white focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/10 placeholder:text-gray-400 resize-none"
            />
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