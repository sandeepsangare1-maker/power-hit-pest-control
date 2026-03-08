import { type Variants, motion } from "motion/react";

const steps = [
  {
    number: "01",
    icon: "🔍",
    title: "Inspection",
    description:
      "Our experts visit and assess the pest situation at your property thoroughly",
  },
  {
    number: "02",
    icon: "🎯",
    title: "Pest Identification",
    description:
      "We identify the exact pest species and infestation level with precision",
  },
  {
    number: "03",
    icon: "💊",
    title: "Treatment",
    description:
      "Targeted eco-friendly treatment applied by certified technicians",
  },
  {
    number: "04",
    icon: "🛡️",
    title: "Prevention",
    description:
      "A follow-up prevention plan to protect your space from future infestations",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function ProcessSection() {
  return (
    <section
      id="process"
      data-ocid="process.section"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ backgroundColor: "oklch(0.975 0.003 240)" }}
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(135deg, oklch(0.49 0.14 155 / 0.03) 25%, transparent 25%, transparent 50%, oklch(0.49 0.14 155 / 0.03) 50%, oklch(0.49 0.14 155 / 0.03) 75%, transparent 75%)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
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
              backgroundColor: "oklch(0.49 0.14 155 / 0.1)",
              color: "oklch(0.39 0.12 155)",
            }}
          >
            Our Process
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold font-heading mb-4"
            style={{ color: "oklch(0.15 0 0)" }}
          >
            How It <span style={{ color: "oklch(0.49 0.14 155)" }}>Works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our systematic 4-step process ensures complete pest elimination and
            long-term prevention
          </p>
        </motion.div>

        {/* Steps — horizontal timeline on desktop, vertical on mobile */}
        <div className="relative">
          {/* Connector line — desktop */}
          <div
            className="hidden lg:block absolute top-20 left-[12.5%] right-[12.5%] h-0.5"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.49 0.14 155), oklch(0.88 0.16 83), oklch(0.49 0.14 155))",
            }}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4"
          >
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                data-ocid={`process.item.${idx + 1}`}
                className="flex flex-col items-center text-center relative"
              >
                {/* Vertical connector — mobile */}
                {idx < steps.length - 1 && (
                  <div
                    className="lg:hidden absolute left-10 top-20 w-0.5 h-8 z-0"
                    style={{ backgroundColor: "oklch(0.49 0.14 155 / 0.3)" }}
                  />
                )}

                {/* Step circle */}
                <div className="relative z-10 mb-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
                    style={{
                      backgroundColor: "white",
                      boxShadow:
                        "0 0 0 4px oklch(0.49 0.14 155 / 0.15), 0 8px 24px oklch(0.49 0.14 155 / 0.2)",
                    }}
                  >
                    {step.icon}
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-heading text-white shadow-md"
                    style={{ backgroundColor: "oklch(0.49 0.14 155)" }}
                  >
                    {step.number}
                  </div>
                </div>

                <h3
                  className="text-xl font-bold font-heading mb-2"
                  style={{ color: "oklch(0.15 0 0)" }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
