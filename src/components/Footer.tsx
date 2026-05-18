export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="container-wide py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          <span className="font-display font-extrabold tracking-tight">PITCH</span>
          <span className="text-xs text-muted-foreground ml-2">
            © {new Date().getFullYear()} — Fast sports, no noise.
          </span>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition">About</a>
          <a href="#" className="hover:text-foreground transition">Editorial</a>
          <a href="#" className="hover:text-foreground transition">Advertise</a>
          <a href="#" className="hover:text-foreground transition">Privacy</a>
          <a href="#" className="hover:text-foreground transition">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
