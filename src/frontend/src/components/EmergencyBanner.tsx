import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function EmergencyBanner() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          data-ocid="emergency.banner"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-[60] overflow-hidden"
        >
          <div
            className="flex items-center justify-center gap-3 px-4 py-2.5 text-white text-sm font-medium font-heading relative"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.56 0.22 24), oklch(0.65 0.22 30), oklch(0.56 0.22 24))",
            }}
          >
            <span className="text-center">
              🚨 Emergency Pest Service Available 24/7 —{" "}
              <a
                href="tel:7775865036"
                className="underline font-bold hover:no-underline"
              >
                Call Now: 7775865036
              </a>
            </span>
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              data-ocid="emergency.close_button"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Dismiss emergency banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
