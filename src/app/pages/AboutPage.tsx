import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

export function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 items-start">

            {/* Left — text */}
            <div className="md:col-span-7 space-y-10">
              <p className="text-[20px] leading-relaxed text-neutral-900 font-semibold">
                Hi, I&apos;m Amir—<br />a Multidisciplinary Designer based in Israel.
              </p>
              <p className="text-[17px] leading-relaxed text-neutral-600 font-light">
                I live and breathe modern, minimalistic design systems that explore the intersection of strategic thinking and artificial intelligence.
              </p>
              <p className="text-[17px] leading-relaxed text-neutral-600 font-light">
                My background spans everything from building comprehensive brand books and scalable design templates to managing cross-functional workflows and leading design teams. I believe in establishing strong, uncompromising design standards and fostering collaboration across all departments to bring a unified, sophisticated vision to the product.
              </p>
            </div>

            {/* Right — portrait placeholder */}
            <div className="md:col-span-5 flex justify-end">
              <div
                className="bg-neutral-100 w-[327px] md:w-full md:max-w-[220px]"
                style={{ aspectRatio: "1 / 2" }}
              />
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
