export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <article className="bg-ivory pb-28 pt-36 md:pt-44">
      <div className="container-lux">
        <div className="mx-auto max-w-3xl [&_h1]:font-display [&_h1]:text-5xl [&_h1]:font-light [&_h1]:leading-tight [&_h1]:text-ink md:[&_h1]:text-6xl [&_h2]:font-display [&_h2]:mt-14 [&_h2]:text-2xl [&_h2]:font-light [&_h2]:text-ink [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-muted [&_li]:mt-2 [&_li]:text-muted [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4">
          {children}
        </div>
      </div>
    </article>
  );
}
