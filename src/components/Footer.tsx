// src/components/Footer.tsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 md:flex-row">
        {/* Left: Brand + tagline */}
        <div className="flex items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-2 font-extrabold tracking-wider text-white">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            PZMIR
          </span>
          <span className="text-white/60">
            © {new Date().getFullYear()} — Fast sports, no noise.
          </span>
        </div>

        {/* Right: Page links */}
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link to="/about" className="text-white/80 hover:text-white transition-colors">
            About
          </Link>
          <Link to="/editorial-policy" className="text-white/80 hover:text-white transition-colors">
            Editorial
          </Link>
          <Link to="/advertise" className="text-white/80 hover:text-white transition-colors">
            Advertise
          </Link>
          <Link to="/privacy" className="text-white/80 hover:text-white transition-colors">
            Privacy
          </Link>
          <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
            Contact
          </Link> 
          <Link to="/disclaimer" className="text-white/80 hover:text-white transition-colors">
            Disclaimer
          </Link>
           <Link to="/terms-and-conditions" className="text-white/80 hover:text-white transition-colors">
            Terms & Conditions
          </Link>
        </nav>
      </div>
    </footer>
  );
}