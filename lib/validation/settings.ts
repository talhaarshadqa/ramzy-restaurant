import {z} from 'zod';

export const settingsSchema = z.object({
    openingHoursText: z.string().trim().min(1, 'Opening hours text is required').max(200),
    todaysStatusNote: z.string().trim().max(200).optional(),

    businessName: z.string().trim().min(1, 'Business name is required').max(120),
    addressLine: z.string().trim().min(1, 'Address is required').max(200),
    neighbourhood: z.string().trim().min(1, 'Neighbourhood is required').max(120),
    phoneDisplay: z.string().trim().min(1, 'Phone number is required').max(40),
    phoneHref: z.string().trim().min(1, 'Phone link is required').max(60),
    mobileDisplay: z.string().trim().min(1, 'Mobile number is required').max(40),
    mobileHref: z.string().trim().min(1, 'Mobile link is required').max(60),
    facebookHandle: z.string().trim().min(1, 'Facebook handle is required').max(120),
    googleRating: z.coerce.number().min(0).max(5),
    googleReviewCount: z.coerce.number().int().min(0),
    priceRange: z.string().trim().min(1, 'Price range is required').max(60),
    ownerNotificationEmail: z.union([z.literal(''), z.string().trim().email('Please enter a valid email')]).optional(),

    heroEyebrow: z.string().trim().min(1).max(120),
    heroTagline: z.string().trim().min(1).max(400),
    heroBadge1: z.string().trim().min(1).max(60),
    heroBadge2: z.string().trim().min(1).max(60),

    storyHeading: z.string().trim().min(1).max(120),
    storyHeadingAccent: z.string().trim().min(1).max(120),
    storyParagraph: z.string().trim().min(1).max(1000),
    storyQuote: z.string().trim().min(1).max(500),

    masterpiecesHeading: z.string().trim().min(1).max(120),
    masterpiecesHeadingAccent: z.string().trim().min(1).max(120),

    cuisineHeading: z.string().trim().min(1).max(160),
    cuisineSubheading: z.string().trim().min(1).max(400),

    signatureSubheading: z.string().trim().min(1).max(300),

    roomHeading: z.string().trim().min(1).max(120),
    roomHeadingAccent: z.string().trim().min(1).max(120),
    roomParagraph1: z.string().trim().min(1).max(600),
    roomParagraph2: z.string().trim().min(1).max(600),

    statDishesValue: z.string().trim().min(1).max(20),
    statDishesLabel: z.string().trim().min(1).max(60),
    statHalalValue: z.string().trim().min(1).max(20),
    statHalalLabel: z.string().trim().min(1).max(60),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
