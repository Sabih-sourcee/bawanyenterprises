import React, { useEffect, useMemo, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { prefersReducedMotion, skewUpReveal } from "@/src/lib/animations";
import PageContainer from "@/src/components/layout/PageContainer";
import { eventsPage, type BawanyEvent } from "@/src/content/brand";

function EventCard({ event }: { event: BawanyEvent; key?: React.Key }) {
  const isUpcoming = event.status === "upcoming";
  const gallery = event.images?.length
    ? event.images
    : event.image
      ? [event.image]
      : [];

  return (
    <article
      className={`border-t border-jet-black/15 pt-10 md:pt-12 pb-10 md:pb-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10${
        isUpcoming ? "" : " opacity-90"
      }`}
    >
      <div className="md:col-span-4 min-w-0">
        <p className="text-data-mono text-on-surface-variant mb-2">{event.dateLabel}</p>
        <p className="text-label-caps text-on-surface-variant">{event.city}</p>
        {event.image && (
          <img
            src={event.image}
            alt=""
            className="mt-5 md:mt-6 w-full max-w-sm aspect-[4/5] object-cover object-top border border-jet-black/10"
            loading="lazy"
          />
        )}
      </div>
      <div className="md:col-span-8 min-w-0">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h3
            data-events-reveal
            className="font-serif text-xl md:text-2xl text-jet-black leading-snug"
          >
            {event.name}
          </h3>
          {isUpcoming && (
            <span className="inline-flex items-center px-2.5 py-0.5 text-label-caps bg-electric-lime text-jet-black border border-jet-black">
              Upcoming
            </span>
          )}
        </div>
        {event.division && (
          <p className="text-label-caps text-on-surface-variant mb-3">{event.division}</p>
        )}
        <p
          data-events-reveal
          className="text-body-md text-on-surface-variant leading-relaxed max-w-2xl"
        >
          {event.summary}
        </p>
        <p className="mt-3 text-body-md text-on-surface-variant">{event.venue}</p>
        {event.href && event.ctaLabel && (
          <a
            href={event.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 min-h-[44px] py-2 text-data-mono text-jet-black hover:underline underline-offset-4"
          >
            {event.ctaLabel}
            <ArrowUpRight className="w-4 h-4" aria-hidden />
          </a>
        )}
        {gallery.length > 1 && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
            {gallery.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                className="w-full aspect-[4/5] object-cover object-top border border-jet-black/10"
                loading="lazy"
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function EventsPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    sectionRef.current
      .querySelectorAll<HTMLElement>("[data-events-reveal]")
      .forEach((el, i) => skewUpReveal(el, { delay: i * 0.04 }));
  }, []);

  const { upcoming, past } = useMemo(() => {
    const upcomingEvents = eventsPage.events
      .filter((e) => e.status === "upcoming")
      .slice()
      .sort((a, b) => a.sortDate.localeCompare(b.sortDate));
    const pastEvents = eventsPage.events
      .filter((e) => e.status === "past")
      .slice()
      .sort((a, b) => b.sortDate.localeCompare(a.sortDate));
    return { upcoming: upcomingEvents, past: pastEvents };
  }, []);

  return (
    <section ref={sectionRef} className="hero-offset section-y-lg bg-surface min-h-screen">
      <PageContainer>
        <p className="section-label mb-4">{eventsPage.label}</p>
        <h1 data-events-reveal className="section-heading mb-8 md:mb-12 max-w-4xl">
          {eventsPage.headline}
        </h1>

        <div className="max-w-3xl space-y-6 mb-16 md:mb-24">
          {eventsPage.intro.map((p) => (
            <p
              key={p.slice(0, 40)}
              data-events-reveal
              className="text-body-lg text-on-surface-variant leading-relaxed"
            >
              {p}
            </p>
          ))}
        </div>

        {upcoming.length > 0 && (
          <div className="mb-16 md:mb-24">
            <h2
              data-events-reveal
              className="font-serif text-2xl md:text-3xl text-jet-black mb-8 md:mb-10"
            >
              {eventsPage.upcomingLabel}
            </h2>
            <div className="flex flex-col">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2
            data-events-reveal
            className="font-serif text-2xl md:text-3xl text-jet-black mb-8 md:mb-10"
          >
            {eventsPage.pastLabel}
          </h2>
          {past.length === 0 ? (
            <p className="text-body-md text-on-surface-variant border-t border-jet-black/15 pt-8">
              {eventsPage.emptyPast}
            </p>
          ) : (
            <div className="flex flex-col">
              {past.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </PageContainer>
    </section>
  );
}
