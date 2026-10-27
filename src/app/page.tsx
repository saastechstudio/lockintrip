import { BookIntro } from "@/components/motion/book-intro";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Transformation } from "@/components/sections/transformation";
import { Goals } from "@/components/sections/goals";
import { Experts } from "@/components/sections/experts";
import { DayStory } from "@/components/sections/day-story";
import { ForWho } from "@/components/sections/for-who";
import { SouthPhuket } from "@/components/sections/south-phuket";
import { Hotel } from "@/components/sections/hotel";
import { Sports } from "@/components/sections/sports";
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
  const capacity = sessions.reduce((n, s) => n + s.capacity, 0);
  return (
    <>
      <JsonLd data={[organizationJsonLd(), ...eventsJsonLd(sessions), faqJsonLd()]} />
      <BookIntro />
      <Hero taken={capacity - remaining} capacity={capacity} />
      <Problem />
      <Transformation />
      <ForWho />
      <DayStory />
      <SouthPhuket />
      <Goals />
      <Experts />
      <Sports />
      <Hotel />
      <Edition sessions={sessions} />
      <Pricing remaining={remaining} />
      <Faq />
      <FinalCta />
      <StickyCta remaining={remaining} />
    </>
  );
}
