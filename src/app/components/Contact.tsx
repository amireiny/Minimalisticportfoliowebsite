import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Instagram, Linkedin, Square } from "lucide-react";

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
                  className="text-neutral-900 hover:text-neutral-600 transition-colors"
                >
                  design@amireiny.com
                </a>
              </div>
              <div>
                <a
                  href="tel:+972587099004"
                  className="text-neutral-900 hover:text-neutral-600 transition-colors"
                >
                  +972 58 709 9004
                </a>
              </div>
            </div>
          </div>

          {/* Right side - Social icons and newsletter */}
          <div className="space-y-8">
            {/* Social icons aligned to the right */}
            <div className="flex gap-6 justify-end">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 hover:text-neutral-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <Square className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 hover:text-neutral-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
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