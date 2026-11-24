import {OpeningHoursNotice} from '@/components/site/OpeningHoursNotice';
import {getSiteSettings} from '@/lib/data/settings';

export async function Footer() {
    const settings = await getSiteSettings();

    return (
        <footer className="bg-[#1f140d] px-6 py-10 text-[#c9b795] md:px-12">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                    <p className="font-display text-lg font-bold text-cream">{settings.businessName}</p>
                    <p className="mt-2 text-sm">{settings.addressLine}</p>
                    <p className="mt-1 text-sm">
                        <a
                            href={settings.phoneHref}
                            className="hover:text-cream"
                        >
                            {settings.phoneDisplay}
                        </a>
                        {' · '}
                        <a
                            href={settings.mobileHref}
                            className="hover:text-cream"
                        >
                            {settings.mobileDisplay}
                        </a>
                    </p>
                </div>
                <OpeningHoursNotice
                    openingHoursText={settings.openingHoursText}
                    todaysStatusNote={settings.todaysStatusNote}
                    className="text-sm"
                />
                <div className="text-sm">
                    <p>Facebook: {settings.facebookHandle}</p>
                    <p className="mt-1">
                        {settings.googleRating}★ · {settings.googleReviewCount} Google reviews
                    </p>
                </div>
            </div>
            <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-6 text-xs text-[#9c8669] sm:flex-row sm:items-center sm:justify-between">
                <p>
                    © {new Date().getFullYear()} {settings.businessName}. All rights reserved.
                </p>
                <p>
                    Designed &amp; Developed by{' '}
                    <a
                        href="https://www.instagram.com/talhaarshad.official"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#c9b795] underline-offset-4 transition-colors duration-200 hover:text-cream hover:underline"
                    >
                        Talha Arshad
                    </a>
                </p>
            </div>
        </footer>
    );
}
