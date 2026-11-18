import {cache} from 'react';

import {prisma} from '@/lib/prisma';

const DEFAULTS = {
    id: 'singleton',
    openingHoursText: 'Open 7 Days a Week 11am – 6pm',
    todaysStatusNote: null,
    businessName: 'Ramzy Restaurant',
    addressLine: '13 Bury New Road, Cheetham Hill, Manchester M8 8FW',
    neighbourhood: 'Cheetham Hill, Manchester',
    phoneDisplay: '0161 915 6242',
    phoneHref: 'tel:+441619156242',
    mobileDisplay: '07762 520633',
    mobileHref: 'tel:+447762520633',
    facebookHandle: 'Ramzy Manchester',
    googleRating: 4.7,
    googleReviewCount: 182,
    priceRange: '£10–20 per person',
    ownerNotificationEmail: null,
    heroEyebrow: 'حلال · Halal Kitchen · Manchester',
    heroTagline: 'Kebabs, curries and biryani — freshly made, halal, and served seven days a week in the heart of Manchester.',
    heroBadge1: 'Open 7 Days',
    heroBadge2: 'Bury New Road, Manchester',
    storyHeading: 'A name that means',
    storyHeadingAccent: 'hospitality.',
    storyParagraph:
        "Food, at Ramzy, is never rushed. It's hand-pressed kebabs off the grill, onions cooked low and slow until they turn deep gold, and naan baked fresh through the day — the same halal South Asian cooking that's been passed down and perfected over years.",
    storyQuote: 'Ramzy is a place of gathering, of family, of quiet weekday lunches and loud Sunday dinners. Pull up a chair — the table is set.',
    masterpiecesHeading: 'Crafted icons &',
    masterpiecesHeadingAccent: 'signature plates.',
    cuisineHeading: 'Explore the menu, course by course.',
    cuisineSubheading: 'From smoky grills to slow-simmered curries, fragrant pilau and fresh-baked naan — every category tells its own part of the story.',
    signatureSubheading: 'A few of the plates our regulars return for.',
    roomHeading: 'Step inside,',
    roomHeadingAccent: 'and stay a while.',
    roomParagraph1: 'Warm light, the smell of fresh naan from the kitchen, and tables that fill up fast on a Sunday — this is a room built for gathering, not rushing.',
    roomParagraph2: "Whether it's a quick bite between errands on Bury New Road or a full table for a celebration, we've got a seat for you.",
    statDishesValue: '65+',
    statDishesLabel: 'Dishes on the Menu',
    statHalalValue: '100%',
    statHalalLabel: 'Halal',
    updatedAt: new Date(),
} as const;

// Cached per-request (React's cache()) so every section that needs settings on the same page
// render shares one DB round trip instead of each component querying independently.
export const getSiteSettings = cache(async () => {
    const settings = await prisma.siteSettings.findUnique({where: {id: 'singleton'}});

    // Should always exist after seeding, but fall back defensively rather than throwing on a public page.
    if (!settings) return DEFAULTS;

    return {
        ...settings,
        googleRating: Number(settings.googleRating),
    };
});

export function buildGoogleMapsUrls(businessName: string, addressLine: string) {
    const query = `${businessName} ${addressLine}`;
    return {
        searchUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
        directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressLine)}`,
    };
}

// Builds a WhatsApp click-to-chat link from a tel: href (or any string containing the number).
// The restaurant's WhatsApp is the same as its mobile number, so we derive it from settings
// rather than storing it separately. An optional message is pre-filled in the chat box.
export function buildWhatsAppUrl(telHrefOrNumber: string, message?: string) {
    const digits = telHrefOrNumber.replace(/\D/g, '');
    const base = `https://wa.me/${digits}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
