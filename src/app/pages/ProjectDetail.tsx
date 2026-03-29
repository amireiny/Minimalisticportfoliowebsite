import { useParams, Link, useNavigate } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { ProjectSidebar } from "../components/ProjectSidebar";
import { CategoryDropdownGallery } from "../components/CategoryDropdownGallery";
import { StandardGallery } from "../components/StandardGallery";
import { projectsData } from "../data/projects";
import { useSwipeNavigation } from "../hooks/useSwipeNavigation";
import { ArrowLeft } from "lucide-react";

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.slug === slug);

  // Enable swipe navigation for mobile
  useSwipeNavigation();

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
      <Navigation />

      <div className="pt-28 md:pt-20 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div>
            {/* Top section with title, description, and metadata */}
            <div className="grid md:grid-cols-12 gap-12 mb-20 mt-20">
              {/* Left side - Title and Description */}
              <div
                className="md:col-span-7 p-[0px] -mt-8 md:mt-0"
                style={{
                  paddingTop: "-30px",
                  paddingRight: "0px",
                  paddingBottom: "-40px",
                  paddingLeft: "0px",
                }}
              >
                <div className="relative mb-8">
                  <h1 className="text-[18px] font-bold">
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
                <p className="text-neutral-600 leading-relaxed font-normal text-[15px] text-left ml-[0px] mr-[65px] my-[0px] p-[0px]">
                  {project.description}
                </p>
              </div>

              {/* Right side - Metadata in two columns */}
              <div className="md:col-span-5">
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <p className="text-neutral-400 mb-1 text-[13px]">
                      Client
                    </p>
                    <p className="font-normal text-[15px]">
                      {project.client}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-400 mb-1 text-[13px]">
                      Year
                    </p>
                    <p className="font-normal text-[15px]">
                      {project.year}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Images section - full width */}
            <div>
              {project.hasCategories &&
              project.categorizedImages ? (
                <CategoryDropdownGallery
                  categorizedImages={project.categorizedImages}
                  projectTitle={project.title}
                />
              ) : (
                <StandardGallery
                  images={project.images || []}
                  projectTitle={project.title}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}