import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

interface CTASectionProps {
  onBookNow: () => void;
}

export default function CTASection({ onBookNow }: CTASectionProps) {
  return (
    <section
      data-ocid="cta.section"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.22 0.06 155) 0%, oklch(0.15 0.04 155) 100%)",
      }}
    >
      {/* Animated Shield Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-pulse-shield">
        <div className="text-[20rem] opacity-[0.07] select-none">🛡️</div>
      </div>

      {/* Background mesh */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 50%, oklch(0.49 0.14 155) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, oklch(0.88 0.16 83 / 0.5) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium font-heading mb-6"
            style={{
              backgroundColor: "oklch(0.56 0.22 24 / 0.3)",
              color: "oklch(0.88 0.22 24)",
              border: "1px solid oklch(0.56 0.22 24 / 0.4)",
            }}
          >
            Take Action Now
          </span>

          <h2 className="text-4xl md:text-6xl font-extrabold font-heading text-white mb-6 leading-tight">
            Get Rid Of{" "}
            <span style={{ color: "oklch(0.88 0.16 83)" }}>Pests Today!</span>
          </h2>

          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Don't let pests take over your home or business. Call us now for
            immediate help from certified professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:7775865036">
              <Button
                data-ocid="cta.primary_button"
                size="lg"
                className="w-full sm:w-auto text-white font-heading font-bold px-8 py-4 h-auto text-lg rounded-full shadow-xl hover:scale-105 transition-all duration-200"
                style={{ backgroundColor: "oklch(0.56 0.22 24)" }}
              >
                📞 Call Now: 7775865036
              </Button>
            </a>

            <Button
              onClick={onBookNow}
              data-ocid="cta.secondary_button"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto font-heading font-bold px-8 py-4 h-auto text-lg rounded-full border-2 hover:scale-105 transition-all duration-200"
              style={{
                borderColor: "oklch(0.88 0.16 83)",
                color: "oklch(0.88 0.16 83)",
                backgroundColor: "transparent",
              }}
            >
              📅 Book Free Inspection
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-white/60 text-sm">
            {[
              "✅ Free Inspection",
              "🏆 10+ Years Experience",
              "🌿 Eco-Friendly",
              "⚡ Same Day Service",
            ].map((item) => (
              <span key={item} className="font-medium">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
