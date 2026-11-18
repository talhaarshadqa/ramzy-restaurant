import {Reveal} from '@/components/site/Reveal';
import {buildGoogleMapsUrls, getSiteSettings} from '@/lib/data/settings';

export async function GoogleRatingBar() {
    const settings = await getSiteSettings();
    const {searchUrl, directionsUrl} = buildGoogleMapsUrls(settings.businessName, settings.addressLine);

    return (
        <Reveal
            variant="pop"
            delay={550}
            className="relative z-10 mx-auto -mt-14 max-w-4xl px-6"
        >
            <div className="flex flex-wrap items-center justify-between gap-5 rounded-card bg-white p-7 shadow-lift">
                <div className="flex items-center gap-3.5">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gold/15">
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="#B8923F"
                        >
                            <path d="M12 2.5l2.7 5.9 6.3.7-4.7 4.4 1.3 6.3-5.6-3.2-5.6 3.2 1.3-6.3-4.7-4.4 6.3-.7Z" />
                        </svg>
                    </span>
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="font-display text-xl font-bold text-ink">{settings.googleRating}</span>
                            <a
                                href={searchUrl}
                                className="border-b border-[#d9c396] text-sm font-semibold text-ink-soft"
                            >
                                {settings.googleReviewCount} Google reviews
                            </a>
                        </div>
                        <p className="mt-0.5 text-xs text-ink-soft/80">
                            {settings.priceRange} · {settings.neighbourhood}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2.5">
                    <a
                        href={directionsUrl}
                        className="rounded-full border-[1.5px] border-maroon px-5 py-2.5 text-sm font-semibold text-maroon"
                    >
                        Get Directions
                    </a>
                    <a
                        href={settings.phoneHref}
                        className="rounded-full bg-maroon px-5 py-2.5 text-sm font-semibold text-cream"
                    >
                        Call
                    </a>
                </div>
            </div>
        </Reveal>
    );
}
