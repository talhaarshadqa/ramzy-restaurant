'use server';

import {revalidatePath} from 'next/cache';

import type {InquiryStatus} from '@/generated/prisma/client';

import {getSiteSettings} from '@/lib/data/settings';
import {sendReservationEmails} from '@/lib/email';
import {prisma} from '@/lib/prisma';
import {requireAdmin} from '@/lib/require-admin';
import {inquirySchema} from '@/lib/validation/inquiry';

export type InquiryFormState = {
    status: 'idle' | 'success' | 'error';
    errors?: Record<string, string>;
    message?: string;
};

export async function createInquiry(_prevState: InquiryFormState, formData: FormData): Promise<InquiryFormState> {
    const raw = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        partySize: formData.get('partySize'),
        requestedDate: formData.get('requestedDate'),
        requestedTime: formData.get('requestedTime'),
        message: formData.get('message'),
        website: formData.get('website'), // honeypot
    };

    const parsed = inquirySchema.safeParse(raw);

    if (!parsed.success) {
        const errors: Record<string, string> = {};
        for (const issue of parsed.error.issues) {
            const key = issue.path[0];
            if (typeof key === 'string' && !errors[key]) errors[key] = issue.message;
        }
        return {status: 'error', errors, message: 'Please check the form and try again.'};
    }

    // Honeypot tripped — silently "succeed" without writing anything, so bots get no signal.
    if (parsed.data.website) {
        return {status: 'success'};
    }

    const requestedAt = new Date(`${parsed.data.requestedDate}T${parsed.data.requestedTime}:00`);
    if (Number.isNaN(requestedAt.getTime())) {
        return {
            status: 'error',
            errors: {requestedDate: 'Please choose a valid date and time'},
            message: 'Please check the form and try again.',
        };
    }

    const inquiryData = {
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        partySize: parsed.data.partySize,
        requestedAt,
        message: parsed.data.message || null,
    };

    await prisma.inquiry.create({data: inquiryData});

    revalidatePath('/admin/inquiries');

    // Email sending must never block or fail the reservation submission itself.
    try {
        const settings = await getSiteSettings();
        await sendReservationEmails(inquiryData, settings);
    } catch (error) {
        console.error('Failed to send reservation emails:', error);
    }

    return {status: 'success'};
}

export async function updateInquiryStatus(formData: FormData) {
    await requireAdmin();

    const id = formData.get('id');
    const status = formData.get('status');
    if (typeof id !== 'string' || typeof status !== 'string') return;

    await prisma.inquiry.update({where: {id}, data: {status: status as InquiryStatus}});
    revalidatePath('/admin/inquiries');
    revalidatePath(`/admin/inquiries/${id}`);
}
