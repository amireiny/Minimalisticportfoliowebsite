import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Footer } from "../components/Footer";

// This would normally come from an API or database
const projectsData = [
  {
    id: 1,
    slug: "servizio-damore",
    title: "Servizio d'Amore",
    category: "Visual Identity",
    images: [
      "https://res.cloudinary.com/dhrtdasn6/image/upload/v1766596458/phototy/e6bbtfjo4oxaxik41uzo.jpg",
      "https://res.cloudinary.com/dhrtdasn6/image/upload/v1766604579/phototy/sfvekkejzb7qdnpqziv3.jpg",
      "https://res.cloudinary.com/dhrtdasn6/image/upload/v1766604579/phototy/lys7sxz1ttciskzotuzd.jpg",
      "https://res.cloudinary.com/dhrtdasn6/image/upload/v1766604579/phototy/mtlxh0ufs15fhtkbgf1o.gif",
      "https://res.cloudinary.com/dhrtdasn6/image/upload/v1766604579/phototy/wjhzjmxbtca4paouyu6z.jpg",
      "https://res.cloudinary.com/dhrtdasn6/image/upload/v1766604579/phototy/rr84s3iy2jh1mqjoemad.jpg",
      "https://res.cloudinary.com/dhrtdasn6/image/upload/v1766604579/phototy/btdr2b5n1tasubfc7aia.jpg",
      "https://res.cloudinary.com/dhrtdasn6/image/upload/v1766604579/phototy/gx5d1odqnxllyxnuc7pa.jpg",
      "https://res.cloudinary.com/dhrtdasn6/image/upload/v1766604578/phototy/mzvv99kz1chluby9eyvo.jpg",
      "https://res.cloudinary.com/dhrtdasn6/image/upload/v1766604578/phototy/gd4u4yy2clvyupwvtuei.gif",
    ],
    year: "2025",
    client: "Port Sa'id TLV",
  },
  {
    id: 2,
    slug: "hawkeye",
    title: "Hawkeye®",
    category: "Branding",
    images: [
      "https://res.cloudinary.com/dxog5mdzp/image/upload/v1773261427/hawkeye_1.jpeg_uose20.jpg",
      "https://res.cloudinary.com/dxog5mdzp/image/upload/v1773261426/hawkeye_2_ub2iwp.jpg",
      "https://res.cloudinary.com/dxog5mdzp/image/upload/v1773261427/hawkeye_3_bcmlld.jpg",
      "https://res.cloudinary.com/dxog5mdzp/image/upload/v1773261428/hawkeye_4_wgloot.jpg",
      "https://res.cloudinary.com/dxog5mdzp/image/upload/v1773261426/hawkeye_5_yy1lhn.jpg",
      "https://res.cloudinary.com/dxog5mdzp/image/upload/v1773261427/hawkeye_6_xjvspu.jpg",
      "https://res.cloudinary.com/dxog5mdzp/image/upload/v1773261427/hawkeye_7_tcgma1.jpg",
      "https://res.cloudinary.com/dxog5mdzp/image/upload/v1773261426/hawkeye_8_mqyg1j.jpg",
    ],
    year: "2026",
    client: "Hawkeye Technologies",
  },
  {
    id: 3,
    slug: "logos-marks",
    title: "Logos & Marks",
    category: "Logo Design",
    images: ["-"],
    year: "2023-2024",
    client: "Various Clients",
  },
];

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="mb-4">Project not found</h1>
          <Link
            to="/"
            className="text-neutral-600 hover:text-black transition-colors"
          >
            Return home
          </Link>
        </div>
      </div>
    );
  }

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      {/* Content */}
      <div className="pt-20 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12">
            {/* Left Column - Sticky Project Info */}
            <div className="md:col-span-3">
              <div className="md:sticky md:top-32">
                {/* Back Button positioned to the left of title */}
                <div className="relative mb-6">
                  <h1 className="text-[16px] font-bold">
                    {project.title}
                  </h1>
                  <button
                    onClick={handleBackClick}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full mr-4 flex items-center text-neutral-400 hover:text-neutral-900 transition-all duration-300 hover:-translate-x-[calc(100%+6px)]"
                    style={{ left: "-40px" }}
                    aria-label="Back to previous page"
                  >
                    <ArrowLeft size={20} />
                  </button>
                </div>

                <p className="text-[14px] text-neutral-600 mb-8">
                  {project.category}
                </p>

                <div className="space-y-6">
                  <div>
                    <p className="text-[12px] text-neutral-400 mb-1">
                      Client
                    </p>
                    <p className="text-[14px]">
                      {project.client}
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] text-neutral-400 mb-1">
                      Year
                    </p>
                    <p className="text-[14px]">
                      {project.year}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Project Images */}
            <div className="md:col-span-9">
              <div className="">
                {project.images.map((image, index) => (
                  <div
                    key={index}
                    className="w-full bg-neutral-100 overflow-hidden"
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}