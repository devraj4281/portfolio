import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp}>
          <p className="font-mono-label text-muted-foreground mb-3">
            05 / EXPERIENCE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-headline text-foreground">
            Where I've Worked
          </h2>
        </motion.div>

        {/* Experience */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 border border-border rounded-xl p-6 md:p-8 bg-card"
        >
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-lg text-accent shrink-0 mt-0.5" style={{ backgroundColor: 'hsl(var(--accent) / 0.1)' }}>
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="text-lg font-bold text-foreground">
                  Web Development Intern
                </h3>
                <span className="font-mono-label text-muted-foreground">
                  JUN 2025 – JUL 2025
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Prodesk IT · Remote
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  "Built modular subscription checkout interface with secure multi-step workflows and responsive layouts.",
                  "Created reusable Tailwind CSS component library to maintain design consistency across the platform.",
                  "Optimized frontend modules for cross-browser compatibility and mobile-first responsive design.",
                ].map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-accent mt-0.5 shrink-0">→</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <p className="font-mono-label text-muted-foreground mb-6">
            06 / EDUCATION
          </p>
          <div className="border border-border rounded-xl p-6 md:p-8 bg-card">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg text-accent shrink-0 mt-0.5" style={{ backgroundColor: 'hsl(var(--accent) / 0.1)' }}>
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  B.Tech in Computer Science & Engineering
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Quantum University · Roorkee, Uttarakhand
                </p>
                <p className="font-mono-label text-muted-foreground mt-2">
                  AUG 2022 – MAY 2026
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}