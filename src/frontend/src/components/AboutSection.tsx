import { motion } from "motion/react";

const trustBadges = [
  { icon: "📜", label: "Licensed & Certified" },
  { icon: "🌿", label: "Eco-Friendly Products" },
  { icon: "🛡️", label: "Satisfaction Guaranteed" },
  { icon: "✅", label: "Insured Service" },
];

const services = [
  "Residential Homes",
  "Commercial Offices",
  "Corporate Buildings",
  "Hospitals & Clinics",
  "Schools & Colleges",
  "Bungalows & Villas",
];

export default function AboutSection() {
  return (
    <section
      data-ocid="about.section"
      className="py-20 lg:py-28 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium font-heading mb-4"
              style={{
                backgroundColor: "oklch(0.49 0.14 155 / 0.1)",
                color: "oklch(0.39 0.12 155)",
              }}
            >
              Our Story
            </span>
            <h2
              className="text-4xl md:text-5xl font-extrabold font-heading mb-6 leading-tight"
              style={{ color: "oklch(0.15 0 0)" }}
            >
              About{" "}
              <span style={{ color: "oklch(0.49 0.14 155)" }}>Power Hit</span>
              <br />
              Pest Control
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-800">Established in 2014</strong>,
                Power Hit Pest Control has been the trusted name for
                professional pest management services across{" "}
                <strong className="text-gray-800">
                  Thane and Mumbai, Maharashtra
                </strong>
                .
              </p>
              <p>
                We serve a diverse range of clients including residential homes,
                commercial offices, corporate buildings, hospitals, schools,
                colleges, and bungalows with the same level of professionalism
                and care.
              </p>
              <p>
                Our certified technicians use the latest techniques and
                eco-friendly products to deliver safe, effective results every
                time.
              </p>
            </div>

            {/* Mission box */}
            <div
              className="mt-8 p-5 rounded-2xl"
              style={{
                backgroundColor: "oklch(0.49 0.14 155 / 0.06)",
                border: "1px solid oklch(0.49 0.14 155 / 0.15)",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4
                    className="font-bold font-heading mb-1"
                    style={{ color: "oklch(0.22 0.06 155)" }}
                  >
                    Our Mission
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    To provide safe, effective, and affordable pest control
                    solutions that protect families and businesses, creating
                    healthier living and working environments.
                  </p>
                </div>
              </div>
            </div>

            {/* Services we serve */}
            <div className="mt-8">
              <h4
                className="font-bold font-heading text-sm uppercase tracking-wider mb-4"
                style={{ color: "oklch(0.49 0.14 155)" }}
              >
                We Serve
              </h4>
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: "oklch(0.49 0.14 155 / 0.08)",
                      color: "oklch(0.32 0.1 155)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Trust Badges & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            {/* Established badge */}
            <div
              className="rounded-3xl p-8 text-center relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.22 0.06 155), oklch(0.32 0.1 155))",
              }}
            >
              <div className="text-6xl font-extrabold font-heading text-white mb-2">
                2014
              </div>
              <div className="text-white/80 text-lg font-medium">
                Established in Thane, Mumbai
              </div>
              <div className="absolute -top-6 -right-6 text-[8rem] opacity-10 select-none">
                🏅
              </div>
            </div>

            {/* Trust badges grid */}
            <div className="grid grid-cols-2 gap-4">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="glass-card rounded-2xl p-5 text-center shadow-sm"
                  style={{ border: "1px solid oklch(0.49 0.14 155 / 0.15)" }}
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <div
                    className="text-sm font-bold font-heading"
                    style={{ color: "oklch(0.22 0.06 155)" }}
                  >
                    {badge.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact strip */}
            <div
              className="rounded-2xl p-5 flex items-center gap-4"
              style={{
                backgroundColor: "oklch(0.975 0.003 240)",
                border: "1px solid oklch(0.88 0.005 240)",
              }}
            >
              <div className="text-3xl">📞</div>
              <div>
                <div
                  className="font-bold font-heading"
                  style={{ color: "oklch(0.15 0 0)" }}
                >
                  Call Us Anytime
                </div>
                <div
                  className="text-sm"
                  style={{ color: "oklch(0.49 0.14 155)" }}
                >
                  7775865036 · 9987661566
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
