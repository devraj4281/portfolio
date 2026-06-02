import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BlogCard({ post, index, onClick }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      onClick={onClick}
      className="group border border-border rounded-xl p-6 bg-card hover:border-accent/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono-label text-muted-foreground">
              {post.date}
            </span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1 font-mono-label text-muted-foreground">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
          <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="font-mono-label text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 mt-1" />
      </div>
    </motion.article>
  );
}