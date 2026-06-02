import { motion } from "framer-motion";
import { POSTS } from "@/lib/blogData";
import BlogCard from "./BlogCard";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

export default function BlogSection({ onPostClick }) {
  return (
    <section id="blog" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp}>
          <p className="font-mono-label text-muted-foreground mb-3">
            04 / BLOG
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-headline text-foreground">
            Writing
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg">
            Technical articles on full-stack development, architecture patterns,
            and lessons from building real projects.
          </p>
        </motion.div>

        <div className="grid gap-5 mt-12">
          {POSTS.map((post, i) => (
            <BlogCard
              key={post.slug}
              post={post}
              index={i}
              onClick={() => onPostClick(post.slug)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}