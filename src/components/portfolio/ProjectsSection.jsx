import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const PROJECTS = [
  {
    title: "SoloLink",
    subtitle: "Real-Time Chat Platform",
    liveUrl: "https://sololink-pi.vercel.app/",
    githubUrl: "https://github.com/devraj4281/sololink",
    description:
      "Real-time messaging with typing indicators, emoji reactions, and read receipts. Voice & video calls within chat, secure media sharing via JWT, and instant cross-device sync with zero page reloads.",
    tags: ["React.js", "Node.js", "Socket.io", "WebRTC", "JWT", "MongoDB"],
    caseStudy: {
      summary:
        "A full-stack real-time chat platform with Socket.io for instant messaging and WebRTC for peer-to-peer voice/video calls. JWT ensures secure media sharing and cross-device session sync.",
      features: [
        "Real-time messaging with typing indicators and read receipts",
        "Voice and video calling via WebRTC",
        "Emoji reactions and rich media sharing",
        "JWT-secured authentication and cross-device sync",
        "Responsive UI with optimistic updates for seamless UX",
      ],
    },
  },
  {
    title: "Coindex",
    subtitle: "Cryptocurrency Dashboard",
    liveUrl: "https://coindex-eight.vercel.app/",
    githubUrl: "https://github.com/devraj4281/coindex",
    description:
      "Responsive dashboard with live crypto market data, professional price charts, and volume trends. Search and filter to track specific coins with optimized data fetching and fast load times across all devices.",
    tags: ["Next.js", "Lightweight Charts", "Floating UI", "Tailwind CSS", "React 19"],
    caseStudy: {
      summary:
        "A lightweight crypto dashboard built with Next.js and Lightweight Charts. Real-time market data, responsive from mobile to ultrawide, with accessible tooltips and fast caching.",
      features: [
        "Live price charts and volume trends with Lightweight Charts",
        "Search and filter across hundreds of cryptocurrencies",
        "Optimized data fetching with Next.js built-in caching",
        "Fully responsive layout from mobile to ultrawide",
        "Clean card-based UI with Lucide icons and floating tooltips",
      ],
    },
  },
  {
    title: "QuestPass",
    subtitle: "Subscription & Payment Portal",
    githubUrl: "https://github.com/devraj4281/questpass",
    description:
      "Four-step subscription wizard with animated transitions and interactive plan selection. Razorpay payment gateway integration with real-time validation and a gaming-inspired UI.",
    tags: ["React.js", "Razorpay", "Tailwind CSS", "Framer Motion", "Node.js"],
    caseStudy: {
      summary:
        "An animated four-step subscription wizard with Razorpay payment integration. The gaming-inspired UI uses Framer Motion for step transitions and includes robust client-side validation at every stage.",
      features: [
        "Four-step animated subscription wizard",
        "Razorpay payment gateway integration",
        "Gaming-inspired visual design language",
        "Client-side form validation with real-time feedback",
        "Smooth animated transitions between checkout steps",
      ],
    },
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono-label text-muted-foreground mb-3">
            03 / PROJECTS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-headline text-foreground">
            Selected Work
          </h2>
        </motion.div>

        <div className="grid gap-6 mt-12">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}