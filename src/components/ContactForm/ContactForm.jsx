import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

    // Simulate API request timeout
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Reset form on success
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-2xl p-8 md:p-10 font-sans">
        
        {/* Form Header */}
        <div className="mb-8">
          <h2 className="text-[#064e3b] text-2xl md:text-3xl font-bold mb-2">
            Get in Touch
          </h2>
          <p className="text-gray-500 text-sm">
            Have questions about our campus initiatives? Drop us a message below.
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
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us how you'd like to collaborate or ask a question..."
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:bg-white focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/10 placeholder:text-gray-400 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#064e3b] hover:bg-[#043427] text-white font-medium text-sm py-3.5 px-5 rounded-xl shadow-md shadow-emerald-950/10 hover:shadow-lg hover:shadow-emerald-950/20 active:scale-[0.99] transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                {/* Minimalist Spinner */}
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </>
            ) : (
              'Submit Message'
            )}
          </button>

        </form>
      </div>
  );
};

export default ContactForm;