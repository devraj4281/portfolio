import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import BlogSection from "@/components/portfolio/BlogSection";
import BlogPost from "@/components/portfolio/BlogPost";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";
import { POSTS } from "@/lib/blogData";

export default function Home() {
  const [activePost, setActivePost] = useState(null);

  const handlePostClick = (slug) => {
    const post = POSTS.find((p) => p.slug === slug);
    setActivePost(post || null);
  };

  const handleBack = () => {
    setActivePost(null);
    // Scroll back to blog section after a tick
    setTimeout(() => {
      document.querySelector("#blog")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      <Navbar onNavClick={() => setActivePost(null)} />
      <AnimatePresence mode="wait">
        {activePost ? (
          <BlogPost key={activePost.slug} post={activePost} onBack={handleBack} />
        ) : (
          <main key="main">
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <BlogSection onPostClick={handlePostClick} />
            <ExperienceSection />
            <ContactSection />
          </main>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}