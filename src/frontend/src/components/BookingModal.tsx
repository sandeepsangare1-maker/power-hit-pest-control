import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSubmitBooking } from "@/hooks/useQueries";
import { CheckCircle, Loader2 } from "lucide-react";
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

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    serviceType: "",
    preferredDate: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutate, isPending, isSuccess, reset } = useSubmitBooking();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.customerName.trim())
      newErrors.customerName = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.serviceType)
      newErrors.serviceType = "Please select a service";
    if (!formData.preferredDate)
      newErrors.preferredDate = "Please select a date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutate(formData);
  };

  const handleClose = () => {
    reset();
    setFormData({
      customerName: "",
      phone: "",
      email: "",
      serviceType: "",
      preferredDate: "",
    });
    setErrors({});
    onClose();
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        data-ocid="booking.modal"
        className="max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle
            className="text-xl font-bold font-heading"
            style={{ color: "oklch(0.15 0 0)" }}
          >
            📅 Book Free Inspection
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Our expert will visit within 24 hours of booking
          </p>
        </DialogHeader>

        {isSuccess ? (
          <div
            data-ocid="booking.success_state"
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <CheckCircle
              className="w-16 h-16 mb-4"
              style={{ color: "oklch(0.49 0.14 155)" }}
            />
            <h4
              className="text-xl font-bold font-heading mb-2"
              style={{ color: "oklch(0.22 0.06 155)" }}
            >
              Booking Confirmed! 🎉
            </h4>
            <p className="text-gray-600 mb-2">
              Your inspection has been booked successfully.
            </p>
            <p className="text-sm text-gray-500">
              We'll call you at {formData.phone} to confirm.
            </p>
            <Button
              onClick={handleClose}
              data-ocid="booking.close_button"
              className="mt-6 text-white font-heading font-semibold rounded-full px-8"
              style={{ backgroundColor: "oklch(0.49 0.14 155)" }}
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {/* Customer Name */}
            <div>
              <Label
                htmlFor="bname"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Full Name *
              </Label>
              <Input
                id="bname"
                data-ocid="booking.input"
                placeholder="Your full name"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, customerName: e.target.value }))
                }
                className={`h-11 ${errors.customerName ? "border-red-400" : ""}`}
              />
              {errors.customerName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.customerName}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Label
                htmlFor="bphone"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Phone Number *
              </Label>
              <Input
                id="bphone"
                data-ocid="booking.phone_input"
                type="tel"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, phone: e.target.value }))
                }
                className={`h-11 ${errors.phone ? "border-red-400" : ""}`}
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label
                htmlFor="bemail"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Email Address *
              </Label>
              <Input
                id="bemail"
                data-ocid="booking.email_input"
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                className={`h-11 ${errors.email ? "border-red-400" : ""}`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
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
                  data-ocid="booking.select"
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

            {/* Preferred Date */}
            <div>
              <Label
                htmlFor="bdate"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Preferred Date *
              </Label>
              <Input
                id="bdate"
                data-ocid="booking.date_input"
                type="date"
                min={today}
                value={formData.preferredDate}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, preferredDate: e.target.value }))
                }
                className={`h-11 ${errors.preferredDate ? "border-red-400" : ""}`}
              />
              {errors.preferredDate && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.preferredDate}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                data-ocid="booking.cancel_button"
                onClick={handleClose}
                className="flex-1 h-11 font-heading font-medium"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                data-ocid="booking.submit_button"
                disabled={isPending}
                className="flex-1 h-11 text-white font-heading font-semibold hover:scale-[1.02] transition-transform duration-200"
                style={{ backgroundColor: "oklch(0.49 0.14 155)" }}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Booking...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
