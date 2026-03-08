import { type Variants, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: "🏆",
    title: "10+ Years Experience",
    desc: "Over a decade of professional pest management in Thane & Mumbai",
  },
  {
    icon: "🌿",
    title: "Eco-Friendly Treatment",
    desc: "Safe, herbal and approved chemicals that protect your family",
  },
  {
    icon: "✅",
    title: "Certified Technicians",
    desc: "Our trained professionals follow industry best practices",
  },
  {
    icon: "🕐",
    title: "24/7 Emergency Service",
    desc: "Round the clock availability for urgent pest situations",
  },
  {
    icon: "💰",
    title: "Affordable Pricing",
    desc: "Competitive rates with transparent pricing and no hidden charges",
  },
];

const counters = [
  { target: 10, suffix: "+", label: "Years Experience" },
  { target: 5000, suffix: "+", label: "Homes Protected" },
  { target: 120, suffix: "+", label: "Commercial Clients" },
];

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

function CounterItem({
  target,
  suffix,
  label,
}: { target: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(target, 2, started);

  return (
    <div ref={ref} className="text-center">
      <div
        className="text-4xl md:text-5xl font-extrabold font-heading mb-2"
        style={{ color: "oklch(0.88 0.16 83)" }}
      >
        {count}
        {suffix}
      </div>
      <div className="text-white/80 font-medium text-sm md:text-base">
        {label}
      </div>
    </div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WhyChooseUs() {
  return (
    <section
      id="about"
      data-ocid="whychooseus.section"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ backgroundColor: "oklch(0.22 0.06 155)" }}
    >
      {/* Background decorations */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 50%, oklch(0.49 0.14 155) 0%, transparent 40%), radial-gradient(circle at 90% 20%, oklch(0.88 0.16 83 / 0.5) 0%, transparent 35%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.88 0.16 83), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium font-heading mb-4"
            style={{
              backgroundColor: "oklch(0.49 0.14 155 / 0.3)",
              color: "oklch(0.88 0.16 83)",
              border: "1px solid oklch(0.57 0.14 155 / 0.3)",
            }}
          >
            Why Power Hit
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-white leading-tight">
            Why Choose{" "}
            <span style={{ color: "oklch(0.88 0.16 83)" }}>
              Power Hit Pest Control?
            </span>
          </h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="glass-card-dark rounded-2xl p-6 text-center group hover:bg-white/12 transition-colors duration-300"
            >
              <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-white font-bold font-heading text-sm md:text-base mb-2 leading-snug">
                {feature.title}
              </h3>
              <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Counters */}
        <div
          className="glass-card-dark rounded-3xl p-8 md:p-12"
          style={{ border: "1px solid oklch(0.88 0.16 83 / 0.2)" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {counters.map((c) => (
              <CounterItem key={c.label} {...c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
