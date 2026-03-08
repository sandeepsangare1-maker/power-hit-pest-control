import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@/hooks/useQueries";
import { CheckCircle, Loader2, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const serviceOptions = [
  "General Pest Control",
  "Termite Pest Control",
  "Bed Bugs Treatment",
  "Ants Pest Control",
  "Herbal Pest Treatment",
  "Mosquito Control",
  "Bird Control",
  "Fly Control",
  "Drain Cleaning",
  "Odor Control",
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutate, isPending, isSuccess, isError } = useSubmitContact();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.serviceType)
      newErrors.serviceType = "Please select a service";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutate({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      serviceType: formData.serviceType,
      message: formData.message,
    });
  };

  return (
    <section
      id="contact"
      data-ocid="contact.section"
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
          className="text-center mb-14"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium font-heading mb-4"
            style={{
              backgroundColor: "oklch(0.49 0.14 155 / 0.1)",
              color: "oklch(0.39 0.12 155)",
            }}
          >
            Contact Us
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold font-heading mb-4"
            style={{ color: "oklch(0.15 0 0)" }}
          >
            Get <span style={{ color: "oklch(0.49 0.14 155)" }}>In Touch</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a pest problem? Fill the form below and our team will get back
            to you within 2 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="glass-card rounded-3xl p-8 shadow-lg"
              style={{ boxShadow: "0 8px 40px oklch(0.49 0.14 155 / 0.1)" }}
            >
              <h3
                className="text-xl font-bold font-heading mb-6"
                style={{ color: "oklch(0.15 0 0)" }}
              >
                Send Us a Message
              </h3>

              {isSuccess ? (
                <div
                  data-ocid="contact.success_state"
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle
                    className="w-16 h-16 mb-4"
                    style={{ color: "oklch(0.49 0.14 155)" }}
                  />
                  <h4
                    className="text-xl font-bold font-heading mb-2"
                    style={{ color: "oklch(0.22 0.06 155)" }}
                  >
                    Message Sent!
                  </h4>
                  <p className="text-gray-600">
                    Thank you! Our team will contact you within 2 hours.
                  </p>
                  <p
                    className="mt-2 font-medium"
                    style={{ color: "oklch(0.49 0.14 155)" }}
                  >
                    📞 For urgent help: 7775865036
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700 mb-1.5 block"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      data-ocid="contact.input"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      className={`h-11 ${errors.name ? "border-red-400" : ""}`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="phone"
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                      >
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        data-ocid="contact.phone_input"
                        type="tel"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, phone: e.target.value }))
                        }
                        className={`h-11 ${errors.phone ? "border-red-400" : ""}`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        data-ocid="contact.email_input"
                        type="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, email: e.target.value }))
                        }
                        className={`h-11 ${errors.email ? "border-red-400" : ""}`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service Type */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      Service Type *
                    </Label>
                    <Select
                      onValueChange={(v) =>
                        setFormData((p) => ({ ...p, serviceType: v }))
                      }
                    >
                      <SelectTrigger
                        data-ocid="contact.select"
                        className={`h-11 ${errors.serviceType ? "border-red-400" : ""}`}
                      >
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.serviceType && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.serviceType}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <Label
                      htmlFor="message"
                      className="text-sm font-medium text-gray-700 mb-1.5 block"
                    >
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      data-ocid="contact.textarea"
                      placeholder="Describe your pest problem..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, message: e.target.value }))
                      }
                      className={`resize-none ${errors.message ? "border-red-400" : ""}`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {isError && (
                    <p
                      data-ocid="contact.error_state"
                      className="text-sm text-red-600 text-center py-2"
                    >
                      Something went wrong. Please try calling us at 7775865036.
                    </p>
                  )}

                  <Button
                    type="submit"
                    data-ocid="contact.submit_button"
                    disabled={isPending}
                    className="w-full h-12 text-white font-heading font-semibold text-base rounded-xl hover:scale-[1.02] transition-transform duration-200"
                    style={{ backgroundColor: "oklch(0.49 0.14 155)" }}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message →"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right — Contact Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            {/* Contact cards */}
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  icon: <Phone className="w-5 h-5" />,
                  label: "Call Us",
                  content: ["7775865036", "9987661566"],
                  href: "tel:7775865036",
                },
                {
                  icon: <MapPin className="w-5 h-5" />,
                  label: "Our Location",
                  content: ["Thane, Mumbai, Maharashtra"],
                  href: null,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass-card rounded-2xl p-5 flex items-start gap-4"
                  style={{ border: "1px solid oklch(0.49 0.14 155 / 0.15)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white"
                    style={{ backgroundColor: "oklch(0.49 0.14 155)" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      className="font-bold font-heading text-sm mb-1"
                      style={{ color: "oklch(0.15 0 0)" }}
                    >
                      {item.label}
                    </div>
                    {item.content.map((c) =>
                      item.href ? (
                        <a
                          key={c}
                          href={item.href}
                          className="block text-sm font-medium hover:underline"
                          style={{ color: "oklch(0.49 0.14 155)" }}
                        >
                          {c}
                        </a>
                      ) : (
                        <p key={c} className="text-sm text-gray-600">
                          {c}
                        </p>
                      ),
                    )}
                  </div>
                </div>
              ))}

              {/* WhatsApp */}
              <a
                href="https://wa.me/917775865036"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:shadow-lg transition-shadow duration-200"
                style={{ border: "1px solid oklch(0.49 0.14 155 / 0.15)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl"
                  style={{ backgroundColor: "#25D366" }}
                >
                  📱
                </div>
                <div>
                  <div
                    className="font-bold font-heading text-sm mb-0.5"
                    style={{ color: "oklch(0.15 0 0)" }}
                  >
                    WhatsApp
                  </div>
                  <div className="text-sm text-green-600">
                    Chat with us on WhatsApp
                  </div>
                </div>
                <div className="ml-auto text-gray-400">→</div>
              </a>
            </div>

            {/* Google Maps */}
            <div
              className="rounded-2xl overflow-hidden flex-grow"
              style={{
                minHeight: "250px",
                border: "1px solid oklch(0.88 0.005 240)",
              }}
            >
              <iframe
                data-ocid="contact.map_marker"
                src="https://maps.google.com/maps?q=Thane,Maharashtra,India&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "250px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Power Hit Pest Control Location - Thane, Maharashtra"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
