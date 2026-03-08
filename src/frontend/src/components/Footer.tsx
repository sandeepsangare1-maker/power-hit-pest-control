import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

const services = [
  "General Pest Control",
  "Termite Treatment",
  "Bed Bug Removal",
  "Ant Control",
  "Herbal Pest Treatment",
  "Mosquito Control",
  "Bird Control",
  "Fly Control",
  "Drain Cleaning",
  "Odor Control",
];

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      data-ocid="footer.panel"
      className="relative overflow-hidden"
      style={{ backgroundColor: "oklch(0.12 0.04 155)" }}
    >
      {/* Top gradient border */}
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.49 0.14 155), oklch(0.88 0.16 83), oklch(0.49 0.14 155), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 — About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src="/assets/generated/logo-transparent.dim_300x120.png"
              alt="Power Hit Pest Control"
              className="h-14 w-auto object-contain mb-4 brightness-0 invert"
            />
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Professional pest control services across Thane & Mumbai since
              2014. Trusted by 5000+ homes and 120+ commercial clients.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: <SiFacebook />, href: "#", label: "Facebook" },
                { icon: <SiInstagram />, href: "#", label: "Instagram" },
                { icon: <SiX />, href: "#", label: "Twitter" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  style={{ backgroundColor: "oklch(1 0 0 / 0.08)" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h4 className="font-bold font-heading text-white mb-5 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <span className="text-white/60 text-sm hover:text-white/90 transition-colors cursor-default flex items-center gap-2">
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "oklch(0.88 0.16 83)" }}
                    />
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Quick Links */}
          <div>
            <h4 className="font-bold font-heading text-white mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleScroll(link.href)}
                    data-ocid="footer.link"
                    className="text-white/60 text-sm hover:text-white/90 transition-colors flex items-center gap-2"
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "oklch(0.49 0.14 155)" }}
                    />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 className="font-bold font-heading text-white mb-5 text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-lg mt-0.5">📞</span>
                <div>
                  <a
                    href="tel:7775865036"
                    className="block text-white/70 text-sm hover:text-white transition-colors"
                  >
                    7775865036
                  </a>
                  <a
                    href="tel:9987661566"
                    className="block text-white/70 text-sm hover:text-white transition-colors"
                  >
                    9987661566
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg mt-0.5">📍</span>
                <p className="text-white/70 text-sm">
                  Thane, Mumbai,
                  <br />
                  Maharashtra, India
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg mt-0.5">💬</span>
                <a
                  href="https://wa.me/917775865036"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:underline"
                  style={{ color: "#25D366" }}
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: "oklch(1 0 0 / 0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="text-white/50 text-xs">
            © {currentYear} Power Hit Pest Control. All rights reserved. |
            Thane, Mumbai, Maharashtra
          </p>
          <p className="text-white/40 text-xs">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
