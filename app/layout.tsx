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

export const metadata: Metadata = {
    title: 'Ramzy Restaurant — Halal South Asian Cuisine in Manchester',
    description: 'Halal South Asian & Afghan-style cooking on Bury New Road, Cheetham Hill, Manchester. Kebabs, curries, biryani and more — open 7 days a week.',
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
