import { Button } from "@/components/ui/button";
import { Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface NavbarProps {
  onBookNow: () => void;
}

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onBookNow }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      data-ocid="nav.panel"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-green-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex-shrink-0"
          >
            <img
              src="/assets/generated/logo-transparent.dim_300x120.png"
              alt="Power Hit Pest Control"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid="nav.link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`text-sm font-medium font-heading transition-colors duration-200 hover:text-green-700 ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:7775865036"
              className="flex items-center gap-1.5 text-sm font-medium text-brand-green hover:text-brand-green-mid transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className={isScrolled ? "text-green-700" : "text-white"}>
                7775865036
              </span>
            </a>
            <Button
              onClick={onBookNow}
              data-ocid="nav.primary_button"
              className="bg-brand-green hover:bg-brand-green-mid text-white font-heading font-semibold px-6 py-2.5 rounded-full shadow-green transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: "oklch(0.49 0.14 155)",
                color: "white",
              }}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="block px-4 py-3 text-gray-700 font-medium font-heading rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 pb-2 border-t border-gray-100 flex flex-col gap-2">
                <a
                  href="tel:7775865036"
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-green-50 text-green-700 font-medium"
                >
                  <Phone className="w-4 h-4" /> Call: 7775865036
                </a>
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onBookNow();
                  }}
                  className="w-full font-heading font-semibold rounded-full"
                  style={{
                    backgroundColor: "oklch(0.49 0.14 155)",
                    color: "white",
                  }}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
