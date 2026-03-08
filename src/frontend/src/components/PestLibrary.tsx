import { type Variants, motion } from "motion/react";

const pests = [
  {
    emoji: "🪳",
    name: "Cockroach",
    description:
      "Cockroaches spread bacteria, contaminate food and trigger allergies. They hide in dark, damp areas.",
    color: "oklch(0.45 0.12 60)",
    bg: "oklch(0.45 0.12 60 / 0.1)",
  },
  {
    emoji: "🪲",
    name: "Termite",
    description:
      "Termites silently destroy wooden structures, costing billions in damage annually. Early treatment is critical.",
    color: "oklch(0.48 0.1 50)",
    bg: "oklch(0.48 0.1 50 / 0.1)",
  },
  {
    emoji: "🐛",
    name: "Bed Bug",
    description:
      "Bed bugs feed on blood and cause itchy bites, skin rashes, and severe sleep disruption.",
    color: "oklch(0.56 0.22 24)",
    bg: "oklch(0.56 0.22 24 / 0.1)",
  },
  {
    emoji: "🐜",
    name: "Ant",
    description:
      "Ants contaminate food, damage property structures and can deliver painful bites in large colonies.",
    color: "oklch(0.42 0.08 40)",
    bg: "oklch(0.42 0.08 40 / 0.1)",
  },
  {
    emoji: "🦟",
    name: "Mosquito",
    description:
      "Mosquitoes transmit deadly diseases like dengue, malaria and chikungunya. Eliminate breeding sites.",
    color: "oklch(0.45 0.1 200)",
    bg: "oklch(0.45 0.1 200 / 0.1)",
  },
  {
    emoji: "🐀",
    name: "Rodent",
    description:
      "Rodents spread diseases, contaminate food supplies and cause structural damage by gnawing wires.",
    color: "oklch(0.5 0.05 0)",
    bg: "oklch(0.5 0.05 0 / 0.1)",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function PestLibrary() {
  return (
    <section
      data-ocid="pestlibrary.section"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ backgroundColor: "white" }}
    >
      {/* Decorative element */}
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.49 0.14 155), transparent)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
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
            Pest Identification
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold font-heading mb-4"
            style={{ color: "oklch(0.15 0 0)" }}
          >
            Common Pests{" "}
            <span style={{ color: "oklch(0.49 0.14 155)" }}>We Eliminate</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hover over each pest to learn about the dangers they pose
          </p>
        </motion.div>

        {/* Pest Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6"
        >
          {pests.map((pest, idx) => (
            <motion.div
              key={pest.name}
              variants={itemVariants}
              data-ocid={`pestlibrary.item.${idx + 1}`}
              className="pest-card relative h-48 cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              <div className="pest-card-inner w-full h-full">
                {/* Front */}
                <div
                  className="pest-card-front rounded-2xl p-6 flex flex-col items-center justify-center gap-3 shadow-md"
                  style={{
                    backgroundColor: pest.bg,
                    border: `1.5px solid ${pest.color}20`,
                  }}
                >
                  <span className="text-5xl">{pest.emoji}</span>
                  <h3
                    className="text-base font-bold font-heading"
                    style={{ color: pest.color }}
                  >
                    {pest.name}
                  </h3>
                </div>

                {/* Back */}
                <div
                  className="pest-card-back rounded-2xl p-5 text-white text-center"
                  style={{ backgroundColor: pest.color }}
                >
                  <span className="text-2xl mb-2 block">{pest.emoji}</span>
                  <h3 className="text-sm font-bold font-heading mb-2">
                    {pest.name}
                  </h3>
                  <p className="text-xs leading-relaxed opacity-90">
                    {pest.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
