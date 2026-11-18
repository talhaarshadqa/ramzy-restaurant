import {z} from 'zod';

export const gallerySlotValues = ['HERO_SLIDER', 'GALLERY', 'MASTERPIECES', 'ROOM'] as const;

export const galleryImageSchema = z.object({
    slot: z.enum(gallerySlotValues),
    imagePath: z.string().trim().min(1, 'Image path is required').max(300),
    altText: z.string().trim().min(1, 'Alt text is required').max(200),
    displayOrder: z.coerce.number().int().optional(),
    isActive: z.coerce.boolean().optional(),
});

export type GalleryImageFormValues = z.infer<typeof galleryImageSchema>;
