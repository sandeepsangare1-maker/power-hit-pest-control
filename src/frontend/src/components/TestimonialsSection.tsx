import { useGetAllTestimonials } from "@/hooks/useQueries";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const fallbackTestimonials = [
  {
    id: BigInt(1),
    customerName: "Rajesh Sharma",
    review:
      "Excellent service! The team was professional and the termite treatment was very effective. My home is completely pest-free now. Highly recommend Power Hit!",
    rating: BigInt(5),
    location: "Thane West",
    date: "2024-01-15",
  },
  {
    id: BigInt(2),
    customerName: "Priya Mehta",
    review:
      "Very professional service. The technicians explained every step of the process. Bed bug problem completely resolved in one visit. Thank you!",
    rating: BigInt(5),
    location: "Mumbai Central",
    date: "2024-02-20",
  },
  {
    id: BigInt(3),
    customerName: "Sunil Patil",
    review:
      "Used their commercial pest control for our office. Prompt service, eco-friendly chemicals and very reasonable pricing. Will definitely use again.",
    rating: BigInt(5),
    location: "Mulund, Mumbai",
    date: "2024-01-08",
  },
  {
    id: BigInt(4),
    customerName: "Anita Joshi",
    review:
      "The herbal pest treatment they provided was perfect for our home with kids. No harsh smells, completely safe and very effective. Great team!",
    rating: BigInt(5),
    location: "Kalwa, Thane",
    date: "2024-03-12",
  },
  {
    id: BigInt(5),
    customerName: "Mohammed Khan",
    review:
      "Quick response to our emergency cockroach infestation at the restaurant. Came within 2 hours and resolved everything professionally. 5 stars!",
    rating: BigInt(5),
    location: "Bandra, Mumbai",
    date: "2024-02-05",
  },
  {
    id: BigInt(6),
    customerName: "Deepika Nair",
    review:
      "Used their mosquito control service before monsoon. Excellent coverage of all breeding areas. No mosquitoes this season. Very satisfied!",
    rating: BigInt(4),
    location: "Thane East",
    date: "2024-04-01",
  },
];

function StarRating({ rating }: { rating: bigint }) {
  const r = Number(rating);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((starNum) => (
        <Star
          key={starNum}
          className={`w-4 h-4 ${starNum <= r ? "fill-current" : "fill-none"}`}
          style={{
            color: starNum <= r ? "oklch(0.88 0.16 83)" : "oklch(0.7 0.05 83)",
          }}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const { data: testimonials } = useGetAllTestimonials();
  const displayTestimonials =
    testimonials && testimonials.length > 0
      ? testimonials
      : fallbackTestimonials;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const getVisibleCount = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) return 3;
    if (typeof window !== "undefined" && window.innerWidth >= 640) return 2;
    return 1;
  };

  const [visibleCount, setVisibleCount] = useState(1);

  // biome-ignore lint/correctness/useExhaustiveDependencies: getVisibleCount is a pure utility, no need in deps
  useEffect(() => {
    const updateVisible = () => setVisibleCount(getVisibleCount());
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, displayTestimonials.length - visibleCount);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [goNext]);

  const visibleItems = displayTestimonials.slice(
    currentIndex,
    currentIndex + visibleCount,
  );

  return (
    <section
      id="testimonials"
      data-ocid="testimonials.section"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ backgroundColor: "oklch(0.975 0.003 240)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium font-heading mb-4"
            style={{
              backgroundColor: "oklch(0.49 0.14 155 / 0.1)",
              color: "oklch(0.39 0.12 155)",
            }}
          >
            Customer Reviews
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold font-heading mb-4"
            style={{ color: "oklch(0.15 0 0)" }}
          >
            What Our{" "}
            <span style={{ color: "oklch(0.49 0.14 155)" }}>Customers Say</span>
          </h2>
          <p className="text-lg text-gray-600">
            Trusted by thousands of families and businesses across Mumbai
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="grid gap-6"
                style={{ gridTemplateColumns: `repeat(${visibleCount}, 1fr)` }}
              >
                {visibleItems.map((t, idx) => (
                  <div
                    key={String(t.id)}
                    data-ocid={`testimonials.item.${idx + 1}`}
                    className="glass-card rounded-2xl p-6 flex flex-col gap-4 shadow-md"
                    style={{
                      boxShadow: "0 2px 20px oklch(0.49 0.14 155 / 0.08)",
                    }}
                  >
                    <StarRating rating={t.rating} />
                    <p className="text-gray-700 leading-relaxed italic text-sm flex-grow">
                      "{t.review}"
                    </p>
                    <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold font-heading text-sm shrink-0"
                        style={{ backgroundColor: "oklch(0.49 0.14 155)" }}
                      >
                        {t.customerName.charAt(0)}
                      </div>
                      <div>
                        <div
                          className="font-bold font-heading text-sm"
                          style={{ color: "oklch(0.15 0 0)" }}
                        >
                          {t.customerName}
                        </div>
                        <div className="text-xs text-gray-500">
                          📍 {t.location}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              type="button"
              onClick={goPrev}
              data-ocid="testimonials.pagination_prev"
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all hover:scale-110"
              style={{
                borderColor: "oklch(0.49 0.14 155)",
                color: "oklch(0.49 0.14 155)",
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  // biome-ignore lint/suspicious/noArrayIndexKey: index is semantically meaningful for carousel dots
                  key={i}
                  type="button"
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === currentIndex ? "24px" : "8px",
                    height: "8px",
                    backgroundColor:
                      i === currentIndex
                        ? "oklch(0.49 0.14 155)"
                        : "oklch(0.49 0.14 155 / 0.25)",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              data-ocid="testimonials.pagination_next"
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all hover:scale-110"
              style={{
                borderColor: "oklch(0.49 0.14 155)",
                color: "oklch(0.49 0.14 155)",
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
