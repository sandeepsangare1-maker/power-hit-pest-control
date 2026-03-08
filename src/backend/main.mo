import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

actor {
  // Types
  type Service = {
    name : Text;
    description : Text;
    iconName : Text;
    category : Text;
  };

  type Testimonial = {
    id : Nat;
    customerName : Text;
    review : Text;
    rating : Nat;
    location : Text;
    date : Text;
  };

  type BookingRequest = {
    id : Nat;
    customerName : Text;
    phone : Text;
    email : Text;
    serviceType : Text;
    preferredDate : Text;
    status : Text;
    submittedAt : Int;
  };

  type ContactForm = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    serviceType : Text;
    message : Text;
    submittedAt : Int;
  };

  // Data Stores
  var nextBookingId = 1;
  var nextContactId = 1;
  var nextTestimonialId = 6;

  let services = List.fromArray<Service>([
    {
      name = "General Pest Control";
      description = "Comprehensive pest treatment for homes & offices";
      iconName = "bug";
      category = "Residential";
    },
    {
      name = "Termite Treatment";
      description = "Pre/post construction anti-termite solutions";
      iconName = "ant";
      category = "Specialized";
    },
    {
      name = "Bed Bug Removal";
      description = "Professional bed bug extermination";
      iconName = "bed";
      category = "Residential";
    },
    {
      name = "Ant Control";
      description = "Targeted ant infestation solutions";
      iconName = "ant";
      category = "Residential";
    },
    {
      name = "Herbal Treatment";
      description = "Eco-friendly pest control methods";
      iconName = "leaf";
      category = "Green";
    },
    {
      name = "Mosquito Control";
      description = "Larval and adult mosquito management";
      iconName = "mosquito";
      category = "Residential";
    },
    {
      name = "Bird Control";
      description = "Pigeon spikes & nets for balconies";
      iconName = "bird";
      category = "Specialized";
    },
    {
      name = "Fly Control";
      description = "Targeted flying insect treatments";
      iconName = "fly";
      category = "Commercial";
    },
    {
      name = "Drain Cleaning";
      description = "Disinfecting and fumigation services";
      iconName = "drain";
      category = "Commercial";
    },
    {
      name = "Odor Control";
      description = "Odor removal for corporate/commercial spaces";
      iconName = "odor";
      category = "Commercial";
    },
  ]);

  let testimonials = List.fromArray<Testimonial>([
    {
      id = 1;
      customerName = "Rohan Sharma";
      review = "Fantastic cockroach service for my Mumbai apartment!";
      rating = 5;
      location = "Mumbai";
      date = Time.now().toText();
    },
    {
      id = 2;
      customerName = "Priya Verma";
      review = "Quick response for bed bug removal in Thane home";
      rating = 4;
      location = "Thane";
      date = Time.now().toText();
    },
    {
      id = 3;
      customerName = "Amit Shah";
      review = "Very happy with ant control results";
      rating = 5;
      location = "Mumbai";
      date = Time.now().toText();
    },
    {
      id = 4;
      customerName = "Sneha Joshi";
      review = "Termite treatment for office space was excellent";
      rating = 5;
      location = "Mumbai";
      date = Time.now().toText();
    },
    {
      id = 5;
      customerName = "Rajeesh Kumar";
      review = "Great service for general pest issues in my home";
      rating = 4;
      location = "Thane";
      date = Time.now().toText();
    },
  ]);

  var bookingMap = Map.empty<Nat, BookingRequest>();
  var contactMap = Map.empty<Nat, ContactForm>();

  // Modules
  module DateHelper {
    public func now() : Text {
      Time.now().toText();
    };
  };

  module Testimonial {
    public func compare(t1 : Testimonial, t2 : Testimonial) : Order.Order {
      Nat.compare(t1.id, t2.id);
    };
  };

  module BookingRequest {
    public func compare(b1 : BookingRequest, b2 : BookingRequest) : Order.Order {
      Nat.compare(b1.id, b2.id);
    };
  };

  module ContactForm {
    public func compare(c1 : ContactForm, c2 : ContactForm) : Order.Order {
      Nat.compare(c1.id, c2.id);
    };
  };

  // Testimonial Functions
  public shared ({ caller }) func submitTestimonial(customerName : Text, review : Text, rating : Nat, location : Text) : async () {
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };

    let testimonial : Testimonial = {
      id = nextTestimonialId;
      customerName;
      review;
      rating;
      location;
      date = DateHelper.now();
    };

    testimonials.add(testimonial);
    nextTestimonialId += 1;
  };

  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    testimonials.toArray().sort();
  };

  // Booking Functions
  public shared ({ caller }) func submitBooking(
    customerName : Text,
    phone : Text,
    email : Text,
    serviceType : Text,
    preferredDate : Text,
  ) : async Nat {
    let id = nextBookingId;
    let booking : BookingRequest = {
      id;
      customerName;
      phone;
      email;
      serviceType;
      preferredDate;
      status = "Pending";
      submittedAt = Time.now();
    };

    bookingMap.add(id, booking);
    nextBookingId += 1;
    id;
  };

  public shared ({ caller }) func updateBookingStatus(id : Nat, status : Text) : async BookingRequest {
    switch (bookingMap.get(id)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?existing) {
        let updated : BookingRequest = {
          id = existing.id;
          customerName = existing.customerName;
          phone = existing.phone;
          email = existing.email;
          serviceType = existing.serviceType;
          preferredDate = existing.preferredDate;
          status;
          submittedAt = existing.submittedAt;
        };
        bookingMap.add(id, updated);
        updated;
      };
    };
  };

  public query ({ caller }) func getAllBookings() : async [BookingRequest] {
    bookingMap.values().toArray().sort();
  };

  // Contact Form Functions
  public shared ({ caller }) func submitContact(name : Text, phone : Text, email : Text, serviceType : Text, message : Text) : async Nat {
    let id = nextContactId;
    let contact : ContactForm = {
      id;
      name;
      phone;
      email;
      serviceType;
      message;
      submittedAt = Time.now();
    };

    contactMap.add(id, contact);
    nextContactId += 1;
    id;
  };

  public query ({ caller }) func getAllContacts() : async [ContactForm] {
    contactMap.values().toArray().sort();
  };

  // Service Functions
  public query ({ caller }) func getAllServices() : async [Service] {
    services.toArray();
  };
};
