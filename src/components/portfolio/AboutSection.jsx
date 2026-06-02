import { motion } from "framer-motion";
import { Code2, Layout, Server, Database, Wrench } from "lucide-react";

const SKILLS = [
  {
    label: "Languages",
    icon: Code2,
    items: ["JavaScript", "TypeScript", "Python", "C++", "HTML5", "CSS3"],
  },
  {
    label: "Frontend",
    icon: Layout,
    items: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "Zustand", "TanStack Query"],
  },
  {
    label: "Backend",
    icon: Server,
    items: ["Node.js", "Express.js", "REST APIs", "JWT", "Socket.io", "Arcjet"],
  },
  {
    label: "DB & Cloud",
    icon: Database,
    items: ["MongoDB", "Supabase", "Cloudinary"],
  },
  {
    label: "Tools",
    icon: Wrench,
    items: ["Git", "GitHub", "Docker", "Postman", "Vercel", "Render", "Razorpay"],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp}>
          <p className="font-mono-label text-muted-foreground mb-3">
            02 / ABOUT
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-headline text-foreground">
            About Me
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Motivated Full Stack Developer with hands-on project experience
            across the entire web stack — from building responsive React
            interfaces to designing REST APIs and managing databases. Developed
            and deployed real-world applications including a real-time chat
            platform, a crypto dashboard, and a payment-integrated subscription
            portal. Quick to learn, detail-oriented, and eager to contribute from
            day one.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-16"
        >
          <p className="font-mono-label text-muted-foreground mb-8">
            TECH STACK
          </p>
          <div className="space-y-6">
            {SKILLS.map((group, groupIndex) => {
              const Icon = group.icon;
              return (
                <motion.div
                  key={group.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: groupIndex * 0.08 }}
                  className="flex flex-col sm:flex-row sm:items-start gap-3"
                >
                  {/* Category label */}
                  <div className="flex items-center gap-2 shrink-0 w-36">
                    <div className="p-1.5 rounded-md bg-accent/10 text-accent">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-mono-label text-muted-foreground">
                      {group.label}
                    </span>
                  </div>

                  {/* Skill pills */}
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item, itemIndex) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: groupIndex * 0.08 + itemIndex * 0.04,
                        }}
                        className="px-3 py-1 text-sm rounded-full border border-border bg-card text-foreground hover:border-accent hover:text-accent transition-colors cursor-default"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}