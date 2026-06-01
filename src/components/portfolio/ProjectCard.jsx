import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CaseStudyModal from "./CaseStudyModal";

export default function ProjectCard({ project, index }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative bg-card border border-border rounded-xl p-6 md:p-8 hover:bg-accent/5 transition-all duration-300"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-headline group-hover:pr-6 transition-all duration-300">
                {project.title}
              </h3>
              <motion.div
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
                initial={false}
              >
                <ArrowRight className="w-5 h-5 text-accent" />
              </motion.div>
            </div>
            <p className="font-mono-label text-accent mt-1">
              {project.subtitle}
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="font-mono text-[11px] font-medium uppercase tracking-wider bg-secondary text-secondary-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-6 pt-5 border-t border-border">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
          ) : null}
          <button
            onClick={() => setModalOpen(true)}
            className="ml-auto text-sm font-medium text-muted-foreground hover:text-accent transition-colors relative group/cs"
          >
            Case Study
            <span className="absolute bottom-0 left-1/2 w-0 group-hover/cs:w-full group-hover/cs:left-0 h-px bg-accent transition-all duration-300" />
          </button>
        </div>
      </motion.div>

      <CaseStudyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        project={project}
      />
    </>
  );
}