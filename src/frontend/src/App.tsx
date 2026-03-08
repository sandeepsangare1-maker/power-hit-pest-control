import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";

import AboutSection from "./components/AboutSection";
import BookingModal from "./components/BookingModal";
import CTASection from "./components/CTASection";
import ContactSection from "./components/ContactSection";
import EmergencyBanner from "./components/EmergencyBanner";
import FloatingButtons from "./components/FloatingButtons";
import Footer from "./components/Footer";
import GallerySection from "./components/GallerySection";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import PestLibrary from "./components/PestLibrary";
import ProcessSection from "./components/ProcessSection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import WhyChooseUs from "./components/WhyChooseUs";

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen font-body">
      {/* Emergency Banner — pushes content down */}
      <EmergencyBanner />

      {/* Navbar — sticky, appears below banner initially */}
      <div className="pt-9">
        <Navbar onBookNow={() => setIsBookingOpen(true)} />
      </div>

      {/* Main Content */}
      <main>
        <HeroSection onBookNow={() => setIsBookingOpen(true)} />
        <ServicesSection />
        <WhyChooseUs />
        <ProcessSection />
        <PestLibrary />
        <TestimonialsSection />
        <GallerySection />
        <CTASection onBookNow={() => setIsBookingOpen(true)} />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Floating Action Buttons */}
      <FloatingButtons />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <Toaster />
    </div>
  );
}
