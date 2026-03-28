import { ArrowLeft } from "lucide-react";
import { Project } from "../data/projects";

interface ProjectSidebarProps {
  project: Project;
  onBackClick: (e: React.MouseEvent) => void;
}

export function ProjectSidebar({ project, onBackClick }: ProjectSidebarProps) {
  return (
    <div className="md:col-span-3">
      <div className="md:sticky md:top-32">
        {/* Back Button positioned to the left of title */}
        <div className="relative">
          <h1 className="text-[16px] font-bold">{project.title}</h1>
          <button
            onClick={onBackClick}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full mr-4 flex items-center text-neutral-400 hover:text-neutral-900 transition-all duration-300 hover:-translate-x-[calc(100%+6px)]"
            style={{ left: "-40px" }}
            aria-label="Back to previous page"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <p className="text-[14px] text-neutral-600 mb-8 mt-6">
          {project.category}
        </p>

        <div className="space-y-6">
          <div>
            <p className="text-[12px] text-neutral-400 mb-1">Client</p>
            <p className="text-[14px]">{project.client}</p>
          </div>
          <div>
            <p className="text-[12px] text-neutral-400 mb-1">Year</p>
            <p className="text-[14px]">{project.year}</p>
          </div>
        </div>
      </div>
    </div>
  );
}