import { Phone } from "lucide-react";
import { motion } from "motion/react";

export default function FloatingButtons() {
  return (
    <>
      {/* WhatsApp Button — bottom right */}
      <motion.a
        href="https://wa.me/917775865036"
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="whatsapp.button"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl text-white"
        style={{
          backgroundColor: "#25D366",
          boxShadow: "0 4px 20px rgba(37, 211, 102, 0.5)",
        }}
      >
        📱
      </motion.a>

      {/* Call Button — bottom left, mobile only */}
      <motion.a
        href="tel:7775865036"
        data-ocid="call.button"
        aria-label="Call Now"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.7, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-5 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl md:hidden"
        style={{
          backgroundColor: "oklch(0.56 0.22 24)",
          boxShadow: "0 4px 20px oklch(0.56 0.22 24 / 0.5)",
        }}
      >
        <Phone className="w-6 h-6" />
      </motion.a>
    </>
  );
}
