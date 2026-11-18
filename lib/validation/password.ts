import {z} from 'zod';

export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, 'Please enter your current password'),
        newPassword: z
            .string()
            .min(8, 'New password must be at least 8 characters')
            .max(100, 'New password is too long'),
        confirmPassword: z.string().min(1, 'Please confirm your new password'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    })
    .refine((data) => data.newPassword !== data.currentPassword, {
        path: ['newPassword'],
        message: 'New password must be different from your current password',
    });
