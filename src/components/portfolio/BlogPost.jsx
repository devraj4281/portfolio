import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeBlock({ node, inline, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || "");
  const isDark = document.documentElement.classList.contains("dark");

  if (inline || !match) {
    return (
      <code
        className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-accent"
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-border text-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
        <span className="font-mono-label text-muted-foreground">{match[1]}</span>
      </div>
      <SyntaxHighlighter
        style={isDark ? oneDark : oneLight}
        language={match[1]}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "0.85rem",
          background: isDark ? "#1a1a2e" : "#f8f8f8",
        }}
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  );
}

export default function BlogPost({ post, onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background"
    >
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono-label text-muted-foreground">{post.date}</span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1 font-mono-label text-muted-foreground">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-headline text-foreground leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2 mt-5">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-mono-label text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <hr className="border-border mb-10" />

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              code: CodeBlock,
              h2: ({ children }) => (
                <h2 className="text-xl font-bold text-foreground mt-10 mb-4">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="space-y-2 mb-4 pl-5 list-disc text-muted-foreground">{children}</ul>
              ),
              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
              strong: ({ children }) => (
                <strong className="text-foreground font-semibold">{children}</strong>
              ),
              a: ({ children, href }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
                  {children}
                </a>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}