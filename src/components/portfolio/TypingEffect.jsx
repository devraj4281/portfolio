import { useState, useEffect, useRef } from "react";

const PHRASES = [
  "I build real‑time chat apps.",
  "I design crypto dashboards.",
  "I create payment portals.",
];

export default function TypingEffect() {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const phrase = PHRASES[phraseIndex];

    if (!isDeleting && charIndex <= phrase.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(phrase.slice(0, charIndex));
        if (charIndex === phrase.length) {
          // Pause before deleting
          timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
        } else {
          setCharIndex((c) => c + 1);
        }
      }, 60);
    } else if (isDeleting && charIndex >= 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(phrase.slice(0, charIndex));
        if (charIndex === 0) {
          setIsDeleting(false);
          setPhraseIndex((i) => (i + 1) % PHRASES.length);
        } else {
          setCharIndex((c) => c - 1);
        }
      }, 35);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <div
      className="font-mono text-sm md:text-base text-muted-foreground mt-4 h-7"
      aria-live="polite"
      aria-label={`Current expertise: ${PHRASES[phraseIndex]}`}
    >
      <span className="text-accent">$</span>
      <span className="ml-2 text-foreground/80">{displayed}</span>
      <span className="inline-block w-[2px] h-[1.1em] bg-accent ml-0.5 align-middle animate-pulse" />
    </div>
  );
}