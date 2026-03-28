import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setSubmitStatus('idle');
    }, 3000);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen pt-28 md:pt-20 pb-32 px-6">
        <div className="max-w-3xl mx-auto px-[0px] pt-[0px] pb-[0px] mt-20">
          {/* Header with back button */}
          <div className="mb-16 relative">
            <button
              onClick={handleBackClick}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full mr-4 flex items-center text-neutral-400 hover:text-neutral-900 transition-all duration-300 hover:-translate-x-[calc(100%+6px)]"
              style={{ left: "-40px" }}
              aria-label="Back to home"
            >
              
            </button>
            <h1 className="text-[32px] font-normal mb-4">Let's work together.</h1>
            <p className="text-[16px] text-neutral-600 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-[13px] text-neutral-400 mb-3"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 border-0 border-b border-neutral-200 focus:border-neutral-900 bg-transparent text-[15px] transition-colors duration-300 outline-none"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[13px] text-neutral-400 mb-3"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 border-0 border-b border-neutral-200 focus:border-neutral-900 bg-transparent text-[15px] transition-colors duration-300 outline-none"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-[13px] text-neutral-400 mb-3"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-0 py-3 border-0 border-b border-neutral-200 focus:border-neutral-900 bg-transparent text-[15px] transition-colors duration-300 outline-none"
                placeholder="What's this about?"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-[13px] text-neutral-400 mb-3"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-3 py-3 border-0 border-b border-neutral-200 focus:border-neutral-900 bg-neutral-50 text-[15px] transition-colors duration-300 outline-none resize-none"
                placeholder="A little bit about your project..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-8">
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className="px-12 py-4 bg-neutral-900 text-white text-[14px] hover:bg-neutral-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Sent!' : 'Send it!'}
              </button>

              {submitStatus === 'success' && (
                <span className="text-[14px] text-neutral-600">
                  Thank you! I'll get back to you soon.
                </span>
              )}
            </div>
          </form>

          {/* Alternative Contact Info */}
          <div className="mt-24 pt-12 border-t border-neutral-200">
            <p className="text-[13px] text-neutral-400 mb-6">
              Or reach out directly
            </p>
            <div className="space-y-3">
              <a
                href="mailto:hello@amireiny.com"
                className="block text-[15px] text-neutral-900 hover:text-neutral-600 transition-colors duration-300"
              >design@amireiny.com</a>
              <a
                href="tel:+1234567890"
                className="block text-[15px] text-neutral-900 hover:text-neutral-600 transition-colors duration-300"
              >+972 58 709 9004</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}