import { motion } from "framer-motion";
import { ArrowDown, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import GradientBlob from "./GradientBlob";
import TypingEffect from "./TypingEffect";

export default function HeroSection() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      <GradientBlob />
      <div className="max-w-6xl mx-auto px-6 py-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>
          
          <p className="font-mono-label text-muted-foreground mb-4">
            01 / HELLO WORLD
          </p>
          <h1 className="text-[clamp(3rem,12vw,8rem)] font-bold tracking-headline leading-[0.9] text-foreground">
            DEVRAJ
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">Full Stack Developer • MERN • React.js • TypeScript•Next.js




          </p>
          <p className="mt-3 text-base text-muted-foreground/80 max-w-lg">
            Motivated developer with hands‑on project experience across the full
            stack.
          </p>
          <TypingEffect />
          <div className="flex flex-wrap gap-4 mt-10">
            <Button
              onClick={() => scrollTo("#projects")}
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 h-11 font-medium">
              
              View Projects
              <ArrowDown className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollTo("#contact")}
              className="rounded-full px-6 h-11 font-medium border-border">
              
              Contact
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>);

}