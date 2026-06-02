export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Devraj. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Built with ☕ and Tailwind CSS
        </p>
      </div>
    </footer>
  );
}