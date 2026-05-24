import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 items-start md:items-stretch">

            {/* Left — text */}
            <div className="md:col-span-7 md:flex md:flex-col md:justify-between md:h-full space-y-10 md:space-y-0">
              <p className="text-[20px] leading-relaxed text-neutral-900 font-semibold">
                Hi, I&apos;m Amir—<br />a Multidisciplinary Designer based in Israel.
              </p>
              <div className="md:mt-auto md:space-y-10 space-y-10">
                <p className="text-[17px] leading-relaxed text-neutral-600 font-light">
                  I live and breathe modern, minimalistic design systems that explore the intersection of strategic thinking and artificial intelligence.
                </p>
                <p className="text-[17px] leading-relaxed text-neutral-600 font-light">
                  My background spans everything from building comprehensive brand books and scalable design templates to managing cross-functional workflows and leading design teams. I believe in establishing strong, uncompromising design standards and fostering collaboration across all departments to bring a unified, sophisticated vision to the product.
                </p>
              </div>
            </div>

            {/* Right — portrait placeholder */}
            <div className="md:col-span-5 flex justify-end">
              <div
                className="bg-neutral-100 w-[327px] md:w-full md:max-w-[380px] overflow-hidden"
                style={{ aspectRatio: "3 / 4" }}
              >
                <ImageWithFallback
                  src="https://res.cloudinary.com/dxog5mdzp/image/upload/v1779631951/whatsapp_cndk22.jpg"
                  alt="Amir Einy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
