'use server';

import {revalidatePath} from 'next/cache';

import {prisma} from '@/lib/prisma';
import {requireAdmin} from '@/lib/require-admin';
import {settingsSchema} from '@/lib/validation/settings';

export type SettingsFormState = {
    status: 'idle' | 'success' | 'error';
    errors?: Record<string, string>;
    message?: string;
};

const FIELD_NAMES = [
    'openingHoursText',
    'todaysStatusNote',
    'businessName',
    'addressLine',
    'neighbourhood',
    'phoneDisplay',
    'phoneHref',
    'mobileDisplay',
    'mobileHref',
    'facebookHandle',
    'googleRating',
    'googleReviewCount',
    'priceRange',
    'ownerNotificationEmail',
    'heroEyebrow',
    'heroTagline',
    'heroBadge1',
    'heroBadge2',
    'storyHeading',
    'storyHeadingAccent',
    'storyParagraph',
    'storyQuote',
    'masterpiecesHeading',
    'masterpiecesHeadingAccent',
    'cuisineHeading',
    'cuisineSubheading',
    'signatureSubheading',
    'roomHeading',
    'roomHeadingAccent',
    'roomParagraph1',
    'roomParagraph2',
    'statDishesValue',
    'statDishesLabel',
    'statHalalValue',
    'statHalalLabel',
] as const;

export async function updateSiteSettings(_prevState: SettingsFormState, formData: FormData): Promise<SettingsFormState> {
    await requireAdmin();

    const raw: Record<string, FormDataEntryValue | undefined> = {};
    for (const key of FIELD_NAMES) {
        raw[key] = formData.get(key) ?? undefined;
    }

    const parsed = settingsSchema.safeParse(raw);
    if (!parsed.success) {
        const errors: Record<string, string> = {};
        for (const issue of parsed.error.issues) {
            const key = issue.path[0];
            if (typeof key === 'string' && !errors[key]) errors[key] = issue.message;
        }
        return {status: 'error', errors, message: 'Please check the form.'};
    }

    const data = {
        ...parsed.data,
        todaysStatusNote: parsed.data.todaysStatusNote || null,
        ownerNotificationEmail: parsed.data.ownerNotificationEmail || null,
    };

    await prisma.siteSettings.upsert({
        where: {id: 'singleton'},
        update: data,
        create: {id: 'singleton', ...data},
    });

    revalidatePath('/', 'layout');
    revalidatePath('/admin/settings');

    return {status: 'success'};
}
