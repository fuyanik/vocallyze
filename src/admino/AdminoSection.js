import "./admino.css";
import ThemeProvider from "./ThemeProvider";
import Navbar from "./Navbar";
import Hero from "./Hero";

// Ported full-viewport intro section (from the admino-website project):
// desktop = one 100vh/100vw hero (nav + copy + live platform demo),
// mobile = two stacked sections (copy/CTA, then the demo). The existing
// Vocallyze homepage content is unchanged and simply continues below this.
export default function AdminoSection() {
  return (
    <ThemeProvider>
      <div className="admino-root relative font-sans">
        <Navbar />
        <Hero />
      </div>
    </ThemeProvider>
  );
}
