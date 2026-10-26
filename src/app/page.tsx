import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Concept } from "@/components/sections/concept";
import { Goals } from "@/components/sections/goals";
import { Experts } from "@/components/sections/experts";
import { Phuket } from "@/components/sections/phuket";
import { Hotel } from "@/components/sections/hotel";
import { Activities } from "@/components/sections/activities";
import { Pricing } from "@/components/sections/pricing";
import { Edition } from "@/components/sections/edition";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { StickyCta } from "@/components/booking/sticky-cta";
import { JsonLd, eventsJsonLd, faqJsonLd, organizationJsonLd } from "@/lib/seo";
import { getSessions } from "@/lib/seats";

export const revalidate = 60;

export default async function HomePage() {
  const sessions = await getSessions();
  const remaining = sessions.reduce((n, s) => n + Math.max(s.capacity - s.taken, 0), 0);
  return (
    <>
      <JsonLd data={[organizationJsonLd(), ...eventsJsonLd(sessions), faqJsonLd()]} />
      <Hero />
      <Problem />
      <Concept />
      <Goals />
      <Experts />
      <Phuket />
      <Hotel />
      <Activities />
      <Pricing />
      <Edition />
      <Faq />
      <FinalCta />
      <StickyCta remaining={remaining} />
    </>
  );
}
