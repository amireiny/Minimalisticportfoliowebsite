import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { ProjectSidebar } from "../components/ProjectSidebar";
import { CategoryDropdownGallery } from "../components/CategoryDropdownGallery";
import { StandardGallery } from "../components/StandardGallery";
import { projectsData } from "../data/projects";
import { useSwipeNavigation } from "../hooks/useSwipeNavigation";
import { useIsMobile } from "../hooks/useIsMobile";
import { ArrowLeft } from "lucide-react";

const FIGMA_PROTOTYPE_URLS: Record<string, string> = {
  "UX/UI": "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/Jo3PWgeiP57YfLT66dwwLR/WWD---Wix-Web-Design-Festival--Home-Assignment--Base44-?node-id=96-201&p=f&scaling=scale-down-width&starting-point-node-id=96%3A201&page-id=0%3A1",
  "Branding": "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/Jo3PWgeiP57YfLT66dwwLR/WWD---Wix-Web-Design-Festival--Home-Assignment--Base44-?node-id=214-185&p=f&scaling=min-zoom&page-id=214%3A184",
  "Research": "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/Jo3PWgeiP57YfLT66dwwLR/WWD---Wix-Web-Design-Festival--Base44-?node-id=277-291&p=f&scaling=scale-down-width&page-id=277%3A290",
};

const FIGMA_PROTOTYPE_URLS_MOBILE: Record<string, string> = {
  "UX/UI": "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/Jo3PWgeiP57YfLT66dwwLR/WWD---Wix-Web-Design-Festival--Home-Assignment--Base44-?node-id=96-201&p=f&scaling=scale-down-width&starting-point-node-id=96%3A201&page-id=0%3A1",
  "Branding": "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/Jo3PWgeiP57YfLT66dwwLR/WWD---Wix-Web-Design-Festival--Home-Assignment--Base44-?node-id=214-185&p=f&scaling=scale-down-width&page-id=214%3A184",
  "Research": "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/Jo3PWgeiP57YfLT66dwwLR/WWD---Wix-Web-Design-Festival--Base44-?node-id=277-291&p=f&scaling=scale-down-width&page-id=277%3A290",
};

function HorizontalCategoryGallery({ categorizedImages }: { categorizedImages: Record<string, string[]> }) {
  const tabs = Object.keys(categorizedImages);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const isMobile = useIsMobile();

  return (
    <div>
      <div className="flex gap-0 border-b border-neutral-200 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-4 text-[13px] md:py-4 md:px-10 md:text-[16px] font-bold transition-colors duration-200 ${
              activeTab === tab
                ? "text-neutral-900 border-b-2 border-neutral-900 -mb-px"
                : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {tabs.map((tab) => {
        const url = (isMobile && FIGMA_PROTOTYPE_URLS_MOBILE[tab]) ? FIGMA_PROTOTYPE_URLS_MOBILE[tab] : FIGMA_PROTOTYPE_URLS[tab];
        const isActive = tab === activeTab;
        if (url) {
          return (
            <div key={tab} className="w-full" style={{ display: isActive ? "block" : "none" }}>
              <iframe
                src={url}
                className="w-full border-0"
                style={{ height: tab === "Branding" ? (isMobile ? "2156px" : "8505px") : tab === "UX/UI" ? (isMobile ? "1500px" : "5872px") : tab === "Research" ? (isMobile ? "1050px" : "3828px") : "90vh" }}
                allowFullScreen
                title={`${tab} prototype`}
              />
            </div>
          );
        }
        return isActive ? (
          <StandardGallery key={tab} images={categorizedImages[tab]} projectTitle={tab} />
        ) : null;
      })}
    </div>
  );
}

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
              {project.hasCategories && project.categorizedImages ? (
                project.horizontalCategories ? (
                  <HorizontalCategoryGallery categorizedImages={project.categorizedImages} />
                ) : (
                  <CategoryDropdownGallery
                    categorizedImages={project.categorizedImages}
                    projectTitle={project.title}
                  />
                )
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