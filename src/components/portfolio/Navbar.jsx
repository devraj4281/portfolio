import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onNavClick }) {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [hoveredSection, setHoveredSection] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const init = localStorage.getItem("theme");
    if (init === "dark") document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxIntersectionRatio = 0;
        let mostVisibleId = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxIntersectionRatio) {
            maxIntersectionRatio = entry.intersectionRatio;
            mostVisibleId = `#${entry.target.id}`;
          }
        });

        if (mostVisibleId) {
          setActiveSection(mostVisibleId);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    NAV_LINKS.forEach((link) => {
      const id = link.href.substring(1);
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);


  const scrollToSection = (href) => {
    let attempts = 0;
    const MAX = 20;
    const poll = () => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (++attempts < MAX) setTimeout(poll, 50);
    };
    poll();
  };

  const handleClick = (href) => {
    setMobileOpen(false);
    window.history.pushState(null, "", href);
    if (onNavClick) onNavClick();
    scrollToSection(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileOpen
        ? "bg-background border-b border-border shadow-sm"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between relative z-50">
        <button
          onClick={() => handleClick("#home")}
          aria-label="Go to Home"
          className="font-mono text-sm font-medium tracking-wider text-foreground hover:text-accent transition-colors"
        >
          DEVRAJ<span className="text-accent">.</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            const isHovered = hoveredSection === link.href;
            const isHighlighted = isActive || isHovered;

            return (
              <motion.button
                key={link.href}
                onClick={() => handleClick(link.href)}
                onMouseEnter={() => setHoveredSection(link.href)}
                onMouseLeave={() => setHoveredSection(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-4 py-2 font-mono-label transition-colors duration-300 ${isHighlighted ? "text-foreground" : "text-muted-foreground"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-muted rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </motion.button>
            );
          })}

          <div className="w-px h-6 bg-border mx-2" /> {/* Subtle separator */}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDark(!dark)}
              aria-label="Toggle theme"
              className="rounded-full w-9 h-9"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </motion.div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
            className="rounded-full w-9 h-9"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="rounded-full w-9 h-9"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>


      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleClick(link.href)}
                    className={`group relative flex items-center w-full text-left font-mono-label py-3 px-4 rounded-md overflow-hidden transition-all duration-300 active:scale-[0.98] ${
                      isActive
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {/* Left Accent Line */}
                    <span
                      className={`absolute left-0 top-2 bottom-2 w-[3px] bg-accent rounded-r-full transition-all duration-300 ease-out ${
                        isActive
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                    />

                    {/* Text with slight rightward shift */}
                    <span
                      className={`transition-transform duration-300 ease-out ${
                        isActive ? "translate-x-2" : "group-hover:translate-x-2"
                      }`}
                    >
                      {link.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}