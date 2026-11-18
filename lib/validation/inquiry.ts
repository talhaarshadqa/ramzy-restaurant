import {z} from 'zod';

export const inquirySchema = z.object({
    name: z.string().trim().min(1, 'Please enter your name').max(120),
    phone: z.string().trim().min(5, 'Please enter a valid phone number').max(30),
    email: z.union([z.literal(''), z.string().trim().email('Please enter a valid email')]).optional(),
    partySize: z.coerce.number().int().min(1, 'Party size must be at least 1').max(100),
    requestedDate: z.string().trim().min(1, 'Please choose a date'),
    requestedTime: z.string().trim().min(1, 'Please choose a time'),
    message: z.string().trim().max(2000).optional(),
    // Honeypot field — real users never fill this in; bots usually do.
    website: z.string().max(0, '').optional(),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;
