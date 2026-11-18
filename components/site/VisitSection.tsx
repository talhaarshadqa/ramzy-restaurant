import type {ReactNode} from 'react';

import {OpeningHoursNotice} from '@/components/site/OpeningHoursNotice';
import {ReservationForm} from '@/components/site/ReservationForm';
import {Reveal} from '@/components/site/Reveal';
import {buildGoogleMapsUrls, buildWhatsAppUrl, getSiteSettings} from '@/lib/data/settings';

export async function VisitSection() {
    const settings = await getSiteSettings();
    const {searchUrl} = buildGoogleMapsUrls(settings.businessName, settings.addressLine);
    const openingHoursText = settings.openingHoursText;
    const todaysStatusNote = settings.todaysStatusNote;
    const whatsappUrl = buildWhatsAppUrl(settings.mobileHref, `Hi ${settings.businessName}!`);
    const bookingWhatsappUrl = buildWhatsAppUrl(
        settings.mobileHref,
        `Hi ${settings.businessName}, I'd like to book a table.\nName:\nDate & time:\nParty size:`,
    );

    return (
        <section
            id="visit"
            className="relative overflow-hidden bg-gradient-to-br from-maroon to-maroon-dark px-6 py-24 text-cream md:px-12"
        >
            <div className="pointer-events-none absolute -right-20 -top-36 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(184,146,63,0.18)_0%,rgba(184,146,63,0)_70%)]" />

            <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1fr_1.1fr]">
                <Reveal className="rounded-card border border-cream/15 bg-white/5 p-10">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-light">Opening Hours</p>
                    <h2 className="mb-7 font-display text-3xl font-bold">Visit Us</h2>
                    <OpeningHoursNotice
                        openingHoursText={openingHoursText}
                        todaysStatusNote={todaysStatusNote}
                        className="border-b border-cream/15 pb-4 text-[15px]"
                    />
                    <a
                        href={searchUrl}
                        className="mt-5 inline-flex items-center gap-1.5 border-b border-cream/40 text-[13px] text-cream"
                    >
                        See live hours &amp; directions on Google →
                    </a>
                </Reveal>

                <Reveal
                    delay={120}
                    className="rounded-card border border-cream/15 bg-white/5 p-10"
                >
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-light">Get In Touch</p>
                    <h2 className="mb-7 font-display text-3xl font-bold">Reach Out</h2>

                    <div className="mb-5 flex items-start gap-3.5 text-[15px]">
                        <IconCircle>
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle
                                cx="12"
                                cy="10"
                                r="3"
                            />
                        </IconCircle>
                        <span className="pt-1.5">{settings.addressLine}</span>
                    </div>
                    <div className="mb-3 flex items-center gap-3.5 text-[15px]">
                        <IconCircle>
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92Z" />
                        </IconCircle>
                        <a href={settings.phoneHref}>{settings.phoneDisplay}</a>
                    </div>
                    <div className="mb-3 flex items-center gap-3.5 text-[15px]">
                        <IconCircle>
                            <rect
                                x="2"
                                y="5"
                                width="20"
                                height="14"
                                rx="2.5"
                            />
                            <path
                                d="M7 9.5 12 13l5-3.5"
                                strokeLinecap="round"
                            />
                        </IconCircle>
                        <a href={settings.mobileHref}>{settings.mobileDisplay} (mobile)</a>
                    </div>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-6 flex items-center gap-3.5 text-[15px]"
                    >
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366]">
                            <svg
                                width="17"
                                height="17"
                                viewBox="0 0 24 24"
                                fill="#ffffff"
                                aria-hidden="true"
                            >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.581 0 11.94-5.359 11.943-11.893a11.821 11.821 0 0 0-3.416-8.452" />
                            </svg>
                        </span>
                        <span className="pt-0.5">WhatsApp us — {settings.mobileDisplay}</span>
                    </a>
                    <p className="text-[13.5px] text-gold-light">Find us on Facebook — search &quot;{settings.facebookHandle}&quot;</p>
                </Reveal>

                <Reveal
                    delay={240}
                    className="rounded-card bg-cream-soft p-8 text-ink"
                >
                    <p className="mb-1 font-display text-xl font-bold">Request a Table</p>
                    <p className="mb-3 text-sm text-ink-soft">We&apos;ll confirm by phone — for urgent same-day requests, please call us directly.</p>
                    <div className="mb-5 flex items-center gap-2 rounded-lg border border-line bg-white px-3.5 py-2.5">
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#6E1E2B"
                            strokeWidth="2"
                            className="flex-shrink-0"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="9"
                            />
                            <path d="M12 7v5l3 3" />
                        </svg>
                        <OpeningHoursNotice
                            openingHoursText={openingHoursText}
                            todaysStatusNote={todaysStatusNote}
                            className="text-[13px] font-semibold text-maroon"
                        />
                    </div>
                    <a
                        href={bookingWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-4 flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#1ebe5d] hover:shadow-float"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.581 0 11.94-5.359 11.943-11.893a11.821 11.821 0 0 0-3.416-8.452" />
                        </svg>
                        Book instantly on WhatsApp
                    </a>
                    <div className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wider text-ink-soft/60">
                        <span className="h-px flex-1 bg-line" />
                        or send a request
                        <span className="h-px flex-1 bg-line" />
                    </div>
                    <ReservationForm />
                </Reveal>
            </div>

            <Reveal
                delay={300}
                className="relative mx-auto mt-10 max-w-6xl"
            >
                <div className="overflow-hidden rounded-card border border-cream/15 shadow-lift">
                    <iframe
                        title={`Map showing ${settings.businessName}`}
                        src={`https://www.google.com/maps?q=${encodeURIComponent(`${settings.businessName}, ${settings.addressLine}`)}&output=embed`}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                        className="block h-[340px] w-full border-0"
                    />
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-center">
                    <span className="inline-flex items-center gap-2 text-[15px] font-semibold">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="#E8B339"
                            aria-hidden="true"
                        >
                            <path d="M12 2.5l2.7 5.9 6.3.7-4.7 4.4 1.3 6.3-5.6-3.2-5.6 3.2 1.3-6.3-4.7-4.4 6.3-.7Z" />
                        </svg>
                        {settings.googleRating} · {settings.googleReviewCount} Google reviews
                    </span>
                    <a
                        href={searchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-maroon transition hover:-translate-y-0.5 hover:shadow-float"
                    >
                        Read our reviews on Google →
                    </a>
                </div>
            </Reveal>
        </section>
    );
}

function IconCircle({children}: {children: ReactNode}) {
    return (
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-cream/10">
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#D7B873"
                strokeWidth="1.8"
            >
                {children}
            </svg>
        </span>
    );
}
