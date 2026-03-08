import { type Variants, motion } from "motion/react";

const galleryItems = [
  {
    label: "Before Treatment",
    gradient:
      "linear-gradient(135deg, oklch(0.35 0.08 40), oklch(0.45 0.1 50))",
    emoji: "⚠️",
  },
  {
    label: "After Treatment",
    gradient:
      "linear-gradient(135deg, oklch(0.45 0.12 155), oklch(0.57 0.14 155))",
    emoji: "✅",
  },
  {
    label: "Termite Work",
    gradient: "linear-gradient(135deg, oklch(0.4 0.1 55), oklch(0.55 0.12 60))",
    emoji: "🪲",
  },
  {
    label: "Equipment Used",
    gradient:
      "linear-gradient(135deg, oklch(0.35 0.05 200), oklch(0.45 0.08 210))",
    emoji: "🔧",
  },
  {
    label: "Commercial Project",
    gradient:
      "linear-gradient(135deg, oklch(0.3 0.08 260), oklch(0.4 0.1 250))",
    emoji: "🏢",
  },
  {
    label: "Residential Treatment",
    gradient:
      "linear-gradient(135deg, oklch(0.4 0.1 145), oklch(0.52 0.12 150))",
    emoji: "🏠",
  },
  {
    label: "Team at Work",
    gradient:
      "linear-gradient(135deg, oklch(0.32 0.06 155), oklch(0.42 0.1 155))",
    emoji: "👷",
  },
  {
    label: "Chemical Application",
    gradient:
      "linear-gradient(135deg, oklch(0.38 0.12 24), oklch(0.5 0.14 20))",
    emoji: "💊",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

// Use different heights for masonry-like effect
const heights = [
  "h-48",
  "h-64",
  "h-56",
  "h-48",
  "h-64",
  "h-48",
  "h-56",
  "h-64",
];

export default function GallerySection() {
  return (
    <section
      data-ocid="gallery.section"
      className="py-20 lg:py-28 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Our Work
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold font-heading mb-4"
            style={{ color: "oklch(0.15 0 0)" }}
          >
            Our Work{" "}
            <span style={{ color: "oklch(0.49 0.14 155)" }}>in Action</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A glimpse into our professional pest control treatments across
            Mumbai
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {galleryItems.map((item, idx) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              data-ocid={`gallery.item.${idx + 1}`}
              className={`relative ${heights[idx]} rounded-2xl overflow-hidden cursor-pointer group`}
              style={{ background: item.gradient }}
            >
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl md:text-5xl mb-2 transition-transform duration-300 group-hover:scale-110">
                  {item.emoji}
                </div>
              </div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0 0 0 / 0.7), transparent)",
                }}
              >
                <span className="text-white font-medium font-heading text-sm">
                  {item.label}
                </span>
              </div>

              {/* Label always visible bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="text-xs font-medium font-heading text-white/80 group-hover:text-white transition-colors text-center">
                  {item.label}
                </div>
              </div>

              {/* Zoom effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ transform: "scale(1.05)", background: item.gradient }}
              />

              {/* Scale wrapper for zoom */}
              <div
                className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: item.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span className="text-4xl md:text-5xl mb-8 transition-transform duration-300 group-hover:scale-110 relative z-10">
                  {item.emoji}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
