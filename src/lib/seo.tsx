import { offers } from "@/content/offers";
import { sessions } from "@/content/sessions";
import { site } from "@/content/site";
import { faq } from "@/content/faq";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    slogan: site.tagline,
    logo: `${site.url}/icon.svg`,
    sameAs: Object.values(site.social),
  };
}

export function eventsJsonLd() {
  return sessions.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${site.name} — ${s.label}`,
    description: site.description,
    startDate: s.start,
    endDate: s.end,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    maximumAttendeeCapacity: s.capacity,
    remainingAttendeeCapacity: s.capacity - s.taken,
    location: {
      "@type": "Place",
      name: "Phuket",
      address: { "@type": "PostalAddress", addressRegion: "Phuket", addressCountry: "TH" },
    },
    organizer: { "@type": "Organization", name: site.name, url: site.url },
    offers: offers.map((o) => ({
      "@type": "Offer",
      name: o.name,
      price: o.price,
      priceCurrency: "EUR",
      availability: s.taken >= s.capacity ? "https://schema.org/SoldOut" : "https://schema.org/LimitedAvailability",
      url: `${site.url}/reserver?offre=${o.id}&session=${s.id}`,
    })),
  }));
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.flatMap((g) =>
      g.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
    ),
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
