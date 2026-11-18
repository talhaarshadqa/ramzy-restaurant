'use server';

import bcrypt from 'bcryptjs';

import {prisma} from '@/lib/prisma';
import {requireAdmin} from '@/lib/require-admin';
import {changePasswordSchema} from '@/lib/validation/password';

export type ChangePasswordFormState = {
    status: 'idle' | 'success' | 'error';
    errors?: Record<string, string>;
    message?: string;
};

export async function changeAdminPassword(
    _prevState: ChangePasswordFormState,
    formData: FormData,
): Promise<ChangePasswordFormState> {
    const session = await requireAdmin();

    const parsed = changePasswordSchema.safeParse({
        currentPassword: formData.get('currentPassword'),
        newPassword: formData.get('newPassword'),
        confirmPassword: formData.get('confirmPassword'),
    });

    if (!parsed.success) {
        const errors: Record<string, string> = {};
        for (const issue of parsed.error.issues) {
            const key = issue.path[0];
            if (typeof key === 'string' && !errors[key]) errors[key] = issue.message;
        }
        return {status: 'error', errors, message: 'Please check the form.'};
    }

    const adminId = session.user?.id;
    if (!adminId) {
        return {status: 'error', message: 'Could not identify your account. Please sign in again.'};
    }

    const admin = await prisma.adminUser.findUnique({where: {id: adminId}});
    if (!admin) {
        return {status: 'error', message: 'Could not identify your account. Please sign in again.'};
    }

    const currentMatches = await bcrypt.compare(parsed.data.currentPassword, admin.passwordHash);
    if (!currentMatches) {
        return {status: 'error', errors: {currentPassword: 'Current password is incorrect'}, message: 'Please check the form.'};
    }

    const passwordHash = await bcrypt.hash(parsed.data.newPassword, 10);
    await prisma.adminUser.update({where: {id: admin.id}, data: {passwordHash}});

    return {status: 'success', message: 'Password updated. Use your new password next time you sign in.'};
}
