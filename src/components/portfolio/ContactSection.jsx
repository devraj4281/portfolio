import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

const LINKS = [
  {
    icon: Mail,
    label: "solodevrj@gmail.com",
    href: "mailto:solodevrj@gmail.com",
  },
  {
    icon: Linkedin,
    label: "linkedin.com/in/devraj046",
    href: "https://www.linkedin.com/in/devraj046",
  },
  {
    icon: Github,
    label: "github.com/devraj4281",
    href: "https://github.com/devraj4281",
  },
  {
    icon: Phone,
    label: "+91 8340224414",
    href: "tel:+918340224414",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! (Frontend only – no backend connected)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp}>
          <p className="font-mono-label text-muted-foreground mb-3">
            07 / CONTACT
          </p>
          <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-bold tracking-headline text-foreground leading-tight">
            LET'S BUILD
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md">
            Have a project in mind or just want to say hello? Drop me a line.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 mt-14">
          {/* Form */}
          <motion.form
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {[
              { key: "name", label: "Your Name", type: "text" },
              { key: "email", label: "Your Email", type: "email" },
            ].map((field) => (
              <div key={field.key} className="relative">
                <input
                  type={field.type}
                  required
                  value={form[field.key]}
                  onChange={(e) =>
                    setForm({ ...form, [field.key]: e.target.value })
                  }
                  placeholder={field.label}
                  className="w-full bg-transparent border-b border-border pb-3 text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none transition-colors text-base"
                />
              </div>
            ))}
            <div className="relative">
              <textarea
                required
                rows={3}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                placeholder="Your Message"
                className="w-full bg-transparent border-b border-border pb-3 text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none transition-colors text-base resize-none"
              />
            </div>
            <Button
              type="submit"
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 h-11 font-medium"
            >
              Send Message
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </motion.form>

          {/* Links */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 md:pl-8"
          >
            <p className="font-mono-label text-muted-foreground mb-4">
              FIND ME
            </p>
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors group py-2"
              >
                <link.icon className="w-5 h-5 shrink-0" />
                <span className="text-sm md:text-base">{link.label}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}