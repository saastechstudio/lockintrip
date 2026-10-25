import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "./logo";
import { InstagramIcon, LinkedinIcon } from "./social-icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-ivory">
      <div className="container-lux py-20 md:py-24">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="ivory" />
            <p className="font-display mt-8 max-w-sm text-2xl font-light leading-snug text-ivory/90">
              {site.tagline}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/55">{site.edition}</p>
          </div>

          <nav aria-label="Pied de page" className="md:col-span-3">
            <p className="eyebrow text-ivory/45">Navigation</p>
            <ul className="mt-6 space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-ivory/75 transition-colors hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/reserver" className="text-sm text-ivory/75 transition-colors hover:text-ivory">
                  Réserver
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="eyebrow text-ivory/45">Contact</p>
            <a href={`mailto:${site.email}`} className="mt-6 block text-sm text-ivory/75 hover:text-ivory">
              {site.email}
            </a>
            <div className="mt-8 flex gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LOCKIN TRIP sur Instagram"
                className="grid size-11 place-items-center rounded-full border border-ivory/15 text-ivory/80 transition-all hover:border-ivory/50 hover:text-ivory"
              >
                <InstagramIcon className="size-[18px]" />
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LOCKIN TRIP sur LinkedIn"
                className="grid size-11 place-items-center rounded-full border border-ivory/15 text-ivory/80 transition-all hover:border-ivory/50 hover:text-ivory"
              >
                <LinkedinIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 h-px bg-ivory/10" />
        <div className="mt-8 flex flex-col gap-4 text-xs text-ivory/45 md:flex-row md:items-center md:justify-between">
          <p>© {year} LOCKIN TRIP. Tous droits réservés.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
