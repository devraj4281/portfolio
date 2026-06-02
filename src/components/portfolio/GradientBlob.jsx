import { motion } from "framer-motion";

export default function GradientBlob() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" style={{ contain: "layout paint", willChange: "transform" }}>
      <motion.div
        className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full opacity-30 dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--accent-cyan)) 0%, hsl(var(--accent-indigo)) 60%, transparent 80%)",
          filter: "blur(80px)",
          top: "-10%",
          right: "-10%",
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.05, 0.97, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full opacity-20 dark:opacity-15"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--accent-indigo-light)) 0%, hsl(var(--accent-cyan-light)) 60%, transparent 80%)",
          filter: "blur(100px)",
          bottom: "10%",
          left: "-5%",
        }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 20, -30, 0],
          scale: [1, 0.96, 1.04, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}