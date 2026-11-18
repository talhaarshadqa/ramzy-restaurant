import type {Metadata} from 'next';

import {Playfair_Display, Work_Sans} from 'next/font/google';

import './globals.css';

const playfair = Playfair_Display({
    variable: '--font-playfair',
    subsets: ['latin'],
    weight: ['500', '600', '700', '800'],
});

const workSans = Work_Sans({
    variable: '--font-worksans',
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

const SITE_DESCRIPTION =
    'Halal South Asian & Afghan-style cooking on Bury New Road, Cheetham Hill, Manchester. Freshly made kebabs, curries, biryani and naan — dine-in, takeaway and catering, open 7 days a week.';

export const metadata: Metadata = {
    metadataBase: new URL('https://ramzyrestaurant.co.uk'),
    title: {
        default: 'Ramzy Restaurant — Halal South Asian Cuisine in Manchester',
        template: '%s · Ramzy Restaurant',
    },
    description: SITE_DESCRIPTION,
    applicationName: 'Ramzy Restaurant',
    keywords: [
        'halal restaurant Manchester',
        'South Asian food Manchester',
        'Pakistani restaurant Cheetham Hill',
        'Afghan cuisine Manchester',
        'kebabs Manchester',
        'biryani Manchester',
        'halal takeaway Bury New Road',
        'restaurant Cheetham Hill',
    ],
    alternates: {canonical: '/'},
    openGraph: {
        type: 'website',
        locale: 'en_GB',
        url: 'https://ramzyrestaurant.co.uk',
        siteName: 'Ramzy Restaurant',
        title: 'Ramzy Restaurant — Halal South Asian Cuisine in Manchester',
        description: SITE_DESCRIPTION,
        images: [{url: '/images/spread.jpg', width: 1200, height: 630, alt: 'A spread of dishes at Ramzy Restaurant, Manchester'}],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ramzy Restaurant — Halal South Asian Cuisine in Manchester',
        description: SITE_DESCRIPTION,
        images: ['/images/spread.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1},
    },
};

export default function RootLayout({children}: LayoutProps<'/'>) {
    return (
        <html
            lang="en"
            className={`${playfair.variable} ${workSans.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col font-body bg-cream text-ink">{children}</body>
        </html>
    );
}
