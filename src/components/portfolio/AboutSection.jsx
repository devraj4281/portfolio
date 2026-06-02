import { motion } from "framer-motion";

const SKILLS = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "C++", "HTML5", "CSS3"],
  },
  {
    label: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "Zustand", "TanStack Query"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "API Integration", "JWT", "Socket.io", "Arcjet"],
  },
  {
    label: "DB & Cloud",
    items: ["MongoDB", "Supabase", "Cloudinary"],
  },
  {
    label: "Tools",
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
          <p className="font-mono-label text-muted-foreground mb-6">
            TECH STACK
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-[1px] bg-border rounded-lg overflow-hidden border border-border">
            {SKILLS.map((group, i) => {
              const isLast = i === SKILLS.length - 1;
              const isOdd = SKILLS.length % 2 !== 0;
              return (
                <div
                  key={group.label}
                  className={`bg-background p-4 sm:p-5 group hover:bg-muted transition-colors ${
                    isLast && isOdd ? "col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <p className="font-mono-label text-accent mb-3">
                    {group.label}
                  </p>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}