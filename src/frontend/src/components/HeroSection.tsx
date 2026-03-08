import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import SurfingCockroaches from "./SurfingCockroaches";

interface HeroSectionProps {
  onBookNow: () => void;
}

const floatingPests = [
  {
    emoji: "🪲",
    className: "animate-float-1",
    style: { top: "15%", left: "8%", fontSize: "2.5rem" },
  },
  {
    emoji: "🦟",
    className: "animate-float-2",
    style: { top: "20%", right: "10%", fontSize: "2rem" },
  },
  {
    emoji: "🐜",
    className: "animate-float-3",
    style: { bottom: "30%", left: "5%", fontSize: "1.8rem" },
  },
  {
    emoji: "🐛",
    className: "animate-float-4",
    style: { bottom: "25%", right: "8%", fontSize: "2.2rem" },
  },
  {
    emoji: "🪳",
    className: "animate-float-2",
    style: { top: "45%", left: "15%", fontSize: "1.6rem" },
  },
  {
    emoji: "🐀",
    className: "animate-float-1",
    style: { top: "60%", right: "15%", fontSize: "1.8rem" },
  },
];

export default function HeroSection({ onBookNow }: HeroSectionProps) {
  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1400x700.jpg')",
        }}
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.12 0.08 155 / 0.92) 0%, oklch(0.08 0.04 200 / 0.88) 100%)",
        }}
      />

      {/* Mesh texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, oklch(0.57 0.14 155) 0%, transparent 50%), radial-gradient(circle at 75% 75%, oklch(0.56 0.22 24 / 0.5) 0%, transparent 50%)",
        }}
      />

      {/* Floating Pest Icons */}
      {floatingPests.map((pest) => (
        <div
          key={`${pest.emoji}-${pest.className}`}
          className={`absolute pointer-events-none select-none opacity-30 ${pest.className}`}
          style={pest.style}
        >
          {pest.emoji}
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium font-heading mb-6"
          style={{
            backgroundColor: "oklch(0.49 0.14 155 / 0.3)",
            border: "1px solid oklch(0.57 0.14 155 / 0.5)",
            color: "oklch(0.88 0.16 83)",
          }}
        >
          ⭐ Trusted Since 2014 · Thane & Mumbai
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold font-heading text-white leading-tight mb-6"
        >
          Protect Your Home{" "}
          <span className="block" style={{ color: "oklch(0.88 0.16 83)" }}>
            From Pest Attacks
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-white/80 font-body mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Professional Pest Control Services in Thane & Mumbai Since 2014
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={onBookNow}
            data-ocid="hero.primary_button"
            size="lg"
            className="text-white font-heading font-bold px-8 py-4 h-auto text-lg rounded-full shadow-xl hover:scale-105 transition-all duration-200"
            style={{
              backgroundColor: "oklch(0.49 0.14 155)",
              minWidth: "220px",
            }}
          >
            🗓️ Book Free Inspection
          </Button>

          <a href="tel:7775865036">
            <Button
              data-ocid="hero.secondary_button"
              variant="outline"
              size="lg"
              className="font-heading font-bold px-8 py-4 h-auto text-lg rounded-full border-2 hover:scale-105 transition-all duration-200"
              style={{
                borderColor: "oklch(0.56 0.22 24)",
                color: "white",
                backgroundColor: "oklch(0.56 0.22 24 / 0.15)",
                minWidth: "220px",
              }}
            >
              📞 Call Now: 7775865036
            </Button>
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { num: "10+", label: "Years" },
            { num: "5000+", label: "Homes" },
            { num: "120+", label: "Clients" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl sm:text-3xl font-extrabold font-heading"
                style={{ color: "oklch(0.88 0.16 83)" }}
              >
                {stat.num}
              </div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <button
        type="button"
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-bounce text-white/60 hover:text-white transition-colors"
        aria-label="Scroll to services"
      >
        <ChevronDown className="w-8 h-8" />
      </button>

      {/* Cockroaches confined to hero banner — flee on spray, never return */}
      <SurfingCockroaches />
    </section>
  );
}
