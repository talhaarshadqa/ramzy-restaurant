import {z} from 'zod';

export const categorySchema = z.object({
    name: z.string().trim().min(1, 'Name is required').max(120),
    slug: z
        .string()
        .trim()
        .min(1, 'Slug is required')
        .max(120)
        .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Use lowercase letters, numbers and hyphens only'),
    icon: z.string().trim().max(60).optional(),
    isHighlighted: z.coerce.boolean().optional(),
    // Homepage "Cuisine" teaser tile: a short blurb + whether to show this category there.
    tagline: z.string().trim().max(200).optional(),
    isFeaturedOnHome: z.coerce.boolean().optional(),
    displayOrder: z.coerce.number().int().optional(),
});

// Pricing rule mirrors the real menu: either a single price, or a med price (with an optional
// large price) — never both single and med/large set at once.
export const menuItemSchema = z
    .object({
        categoryId: z.string().trim().min(1, 'Category is required'),
        name: z.string().trim().min(1, 'Name is required').max(160),
        description: z.string().trim().max(300).optional(),
        pricingMode: z.enum(['single', 'tiered']),
        singlePrice: z.coerce.number().min(0).max(9999.99).optional(),
        medPrice: z.coerce.number().min(0).max(9999.99).optional(),
        largePrice: z.coerce.number().min(0).max(9999.99).optional(),
        displayOrder: z.coerce.number().int().optional(),
        isAvailable: z.coerce.boolean().optional(),
        // Homepage "Signatures" showcase: marking a real item keeps its price always accurate.
        isSignature: z.coerce.boolean().optional(),
        signatureLabel: z.string().trim().max(60).optional(),
        signatureDescription: z.string().trim().max(300).optional(),
        signatureOrder: z.coerce.number().int().optional(),
    })
    .refine((data) => (data.pricingMode === 'single' ? data.singlePrice !== undefined : data.medPrice !== undefined), {
        message: 'Enter a price',
        path: ['singlePrice'],
    });

export type CategoryFormValues = z.infer<typeof categorySchema>;
export type MenuItemFormValues = z.infer<typeof menuItemSchema>;
