import { useMutation, useQuery } from "@tanstack/react-query";
import type { Service, Testimonial } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllServices() {
  const { actor, isFetching } = useActor();
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      email: string;
      serviceType: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitContact(
        data.name,
        data.phone,
        data.email,
        data.serviceType,
        data.message,
      );
    },
  });
}

export function useSubmitBooking() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      customerName: string;
      phone: string;
      email: string;
      serviceType: string;
      preferredDate: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitBooking(
        data.customerName,
        data.phone,
        data.email,
        data.serviceType,
        data.preferredDate,
      );
    },
  });
}
