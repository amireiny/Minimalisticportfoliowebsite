import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Contact() {
  return (
    <section id="contact" className="pt-64 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-end">
          {/* Left side - Contact info */}
          <div>
            <h2 className="mb-8">Contact</h2>
            <div className="space-y-3">
              <div>
                <a
                  href="mailto:design@amireiny.com"
                  className="text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = 'mailto:design@amireiny.com';
                  }}
                >
                  design@amireiny.com
                </a>
              </div>
              <div>
                <a
                  href="tel:+972587099004"
                  className="text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >+972 58 709 9004</a>
              </div>
            </div>
          </div>

          {/* Right side - Social icons and newsletter */}
          <div className="space-y-8">
            {/* Social icons aligned to the right */}
            <div className="flex gap-6 justify-end items-center">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 hover:text-neutral-600 transition-colors"
              ></a>
              <a
                href="https://www.behance.net/amireiny"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity"
              >
                <img
                  src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/behance-39upyjt4o1bcdv2vev4ff.png/behance-hs3khmdlsickcpilkrsz.png?_a=DATAiZAAZAA0"
                  alt="Behance"
                  className="w-5 h-5 object-contain"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/amireiny/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity"
              >
                <img
                  src="https://images.seeklogo.com/logo-png/38/2/linkedin-black-icon-logo-png_seeklogo-387472.png"
                  alt="LinkedIn"
                  className="w-5 h-5 object-contain"
                />
              </a>
            </div>

            {/* Newsletter subscription form */}
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900 transition-colors text-[14px]"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-neutral-900 text-white hover:bg-neutral-700 transition-colors text-[14px] font-light"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}