import { useGetAllServices } from "@/hooks/useQueries";
import { type Variants, motion } from "motion/react";

const serviceIconMap: Record<string, string> = {
  "General Pest Control": "🐛",
  "Termite Pest Control": "🪲",
  "Termite Treatment": "🪲",
  "Bed Bugs Treatment": "🛏️",
  "Bed Bug Removal": "🛏️",
  "Ants Pest Control": "🐜",
  "Ant Control": "🐜",
  "Herbal Pest Treatment": "🌿",
  "Mosquito Control": "🦟",
  "Bird Control": "🐦",
  "Fly Control": "🪰",
  "Drain Cleaning": "🔧",
  "Odor Control": "✨",
};

const fallbackServices = [
  {
    name: "General Pest Control",
    description:
      "Comprehensive treatment for all common household pests including cockroaches, ants, and more.",
    iconName: "bug",
    category: "residential",
  },
  {
    name: "Termite Treatment",
    description:
      "Advanced anti-termite treatment to protect your property structure from termite damage.",
    iconName: "termite",
    category: "structural",
  },
  {
    name: "Bed Bug Removal",
    description:
      "Effective heat and chemical treatment to completely eliminate bed bug infestations.",
    iconName: "bed",
    category: "residential",
  },
  {
    name: "Mosquito Control",
    description:
      "Targeted mosquito fogging and larvicidal treatments to reduce mosquito breeding.",
    iconName: "mosquito",
    category: "residential",
  },
  {
    name: "Herbal Pest Treatment",
    description:
      "Eco-friendly herbal treatments safe for children, pets and sensitive environments.",
    iconName: "leaf",
    category: "eco",
  },
  {
    name: "Ant Control",
    description:
      "Systematic baiting and barrier treatment to eliminate ant colonies completely.",
    iconName: "ant",
    category: "residential",
  },
  {
    name: "Bird Control",
    description:
      "Humane bird deterrent systems for commercial and residential properties.",
    iconName: "bird",
    category: "commercial",
  },
  {
    name: "Fly Control",
    description:
      "UV fly traps, spraying, and sanitation recommendations to control fly infestations.",
    iconName: "fly",
    category: "commercial",
  },
  {
    name: "Drain Cleaning",
    description:
      "Professional drain cleaning and deodorization to prevent pest breeding sites.",
    iconName: "drain",
    category: "maintenance",
  },
  {
    name: "Odor Control",
    description:
      "Advanced odor neutralization treatments after pest extermination.",
    iconName: "odor",
    category: "maintenance",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

function ServiceCardSkeleton() {
  return (
    <div className="rounded-2xl p-6 bg-white border border-gray-100">
      <div className="skeleton w-12 h-12 rounded-xl mb-4" />
      <div className="skeleton h-5 w-3/4 rounded mb-2" />
      <div className="skeleton h-4 w-full rounded mb-1" />
      <div className="skeleton h-4 w-5/6 rounded" />
    </div>
  );
}

export default function ServicesSection() {
  const { data: services, isLoading } = useGetAllServices();
  const displayServices = (
    services && services.length > 0 ? services : fallbackServices
  ).slice(0, 10);

  return (
    <section
      id="services"
      data-ocid="services.section"
      className="py-20 lg:py-28 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.49 0.14 155), transparent)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium font-heading mb-4"
            style={{
              backgroundColor: "oklch(0.49 0.14 155 / 0.1)",
              color: "oklch(0.39 0.12 155)",
            }}
          >
            Our Expertise
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold font-heading mb-4"
            style={{ color: "oklch(0.15 0 0)" }}
          >
            Our Pest Control{" "}
            <span style={{ color: "oklch(0.49 0.14 155)" }}>Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Comprehensive pest solutions for residential, commercial, and
            industrial needs across Thane & Mumbai
          </p>
        </motion.div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayServices.map((service, idx) => {
              const icon = serviceIconMap[service.name] || "🔧";
              return (
                <motion.div
                  key={service.name}
                  variants={itemVariants}
                  data-ocid={`services.item.${idx + 1}`}
                  className="service-card glass-card rounded-2xl p-6 cursor-default group"
                  style={{ boxShadow: "0 2px 16px oklch(0 0 0 / 0.06)" }}
                >
                  <div
                    className="text-4xl mb-4 w-16 h-16 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: "oklch(0.49 0.14 155 / 0.08)" }}
                  >
                    {icon}
                  </div>
                  <h3
                    className="text-lg font-bold font-heading mb-2"
                    style={{ color: "oklch(0.15 0 0)" }}
                  >
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div
                    className="mt-4 flex items-center gap-1 text-sm font-medium font-heading"
                    style={{ color: "oklch(0.49 0.14 155)" }}
                  >
                    Learn more{" "}
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
