import { Hero } from "@/components/sections/hero";
import { Why } from "@/components/sections/why";
import { Concept } from "@/components/sections/concept";
import { Experts } from "@/components/sections/experts";
import { Phuket } from "@/components/sections/phuket";
import { Pricing } from "@/components/sections/pricing";
import { Edition } from "@/components/sections/edition";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd, eventsJsonLd, faqJsonLd, organizationJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), ...eventsJsonLd(), faqJsonLd()]} />
      <Hero />
      <Why />
      <Concept />
      <Experts />
      <Phuket />
      <Pricing />
      <Edition />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
