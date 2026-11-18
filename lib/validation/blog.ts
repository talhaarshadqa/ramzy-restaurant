import {z} from 'zod';

export const blogPostSchema = z.object({
    title: z.string().trim().min(1, 'Title is required').max(200),
    slug: z
        .string()
        .trim()
        .min(1, 'Slug is required')
        .max(200)
        .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Use lowercase letters, numbers and hyphens only'),
    excerpt: z.string().trim().min(1, 'Excerpt is required').max(300),
    content: z.string().trim().min(1, 'Content is required'),
    coverImage: z.string().trim().max(300).optional(),
    isPublished: z.coerce.boolean().optional(),
});

export type BlogPostFormValues = z.infer<typeof blogPostSchema>;
