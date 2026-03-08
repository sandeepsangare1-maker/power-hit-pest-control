import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BookingRequest {
    id: bigint;
    customerName: string;
    status: string;
    serviceType: string;
    submittedAt: bigint;
    email: string;
    preferredDate: string;
    phone: string;
}
export interface Service {
    name: string;
    description: string;
    iconName: string;
    category: string;
}
export interface ContactForm {
    id: bigint;
    serviceType: string;
    name: string;
    submittedAt: bigint;
    email: string;
    message: string;
    phone: string;
}
export interface Testimonial {
    id: bigint;
    customerName: string;
    review: string;
    date: string;
    rating: bigint;
    location: string;
}
export interface backendInterface {
    getAllBookings(): Promise<Array<BookingRequest>>;
    getAllContacts(): Promise<Array<ContactForm>>;
    getAllServices(): Promise<Array<Service>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    submitBooking(customerName: string, phone: string, email: string, serviceType: string, preferredDate: string): Promise<bigint>;
    submitContact(name: string, phone: string, email: string, serviceType: string, message: string): Promise<bigint>;
    submitTestimonial(customerName: string, review: string, rating: bigint, location: string): Promise<void>;
    updateBookingStatus(id: bigint, status: string): Promise<BookingRequest>;
}
