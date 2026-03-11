import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    slug: "hawkeye",
    title: "Hawkeye®",
    category: "Branding",
    image:
      "https://res.cloudinary.com/dxog5mdzp/image/upload/v1773262163/Layer-01_odfxoc.jpg",
  },
  {
    id: 2,
    slug: "servizio-damore",
    title: "Servizio d'Amore",
    category: "Visual Identity",
    image:
      "https://res.cloudinary.com/dhrtdasn6/image/upload/v1766436877/phototy/mf1o4kzfwsnf2fchxq6t.jpg",
  },
  {
    id: 3,
    slug: "logos-marks",
    title: "Logos & Marks",
    category: "Logo Design",
    image:
      "https://res.cloudinary.com/dxog5mdzp/image/upload/v1773264022/Logofolio25_head_2_yt6sr6.jpg",
  },
];

export function Work() {
  return (
    <section id="work" className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.slug}`}
              className="group cursor-pointer"
            >
              <div className="aspect-[2/3] bg-neutral-100 overflow-hidden mb-4 relative">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-500 px-[-99px] py-[0px]" />
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight
                  size={14}
                  className="opacity-0 group-hover:opacity-50 transition-all duration-300 -ml-5 group-hover:ml-0"
                />
                <p className="text-[12px] transition-all duration-300 group-hover:opacity-50">
                  <span className="font-bold">
                    {project.title}
                  </span>
                  <span className="font-light text-neutral-600 ml-3">
                    {project.category}
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}