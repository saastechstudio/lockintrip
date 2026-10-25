import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Concept } from "@/components/sections/concept";
import { Goals } from "@/components/sections/goals";
import { Experts } from "@/components/sections/experts";
import { Phuket } from "@/components/sections/phuket";
import { Pricing } from "@/components/sections/pricing";
import { Edition } from "@/components/sections/edition";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { StickyCta } from "@/components/booking/sticky-cta";
import { JsonLd, eventsJsonLd, faqJsonLd, organizationJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), ...eventsJsonLd(), faqJsonLd()]} />
      <Hero />
      <Problem />
      <Concept />
      <Goals />
      <Experts />
      <Phuket />
      <Pricing />
      <Edition />
      <Testimonials />
      <Faq />
      <FinalCta />
      <StickyCta />
    </>
  );
}
