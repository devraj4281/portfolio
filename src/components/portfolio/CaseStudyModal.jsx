import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export default function CaseStudyModal({ open, onClose, project }) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-6 border-b border-border">
          <p className="font-mono-label text-accent">{project.subtitle}</p>
          <SheetTitle className="text-2xl font-bold tracking-headline">
            {project.title}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Case study for {project.title}
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          <div>
            <h4 className="font-mono-label text-muted-foreground mb-2">
              KEY FEATURES
            </h4>
            <ul className="space-y-2">
              {project.caseStudy.features.map((f, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="text-accent mt-0.5">→</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-mono-label text-muted-foreground mb-3">
              TECH STACK
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="font-mono text-[11px] font-medium uppercase tracking-wider"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}