import {Resend} from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_ADDRESS = process.env.EMAIL_FROM ?? 'Ramzy Restaurant <onboarding@resend.dev>';

type ReservationEmailInput = {
    name: string;
    phone: string;
    email?: string | null;
    partySize: number;
    requestedAt: Date;
    message?: string | null;
};

type ReservationEmailSettings = {
    businessName: string;
    phoneDisplay: string;
    ownerNotificationEmail: string | null;
};

// Resend requires no domain verification to send from onboarding@resend.dev, so this works
// out of the box once RESEND_API_KEY is set — see README for upgrading to a verified domain.
export async function sendReservationEmails(inquiry: ReservationEmailInput, settings: ReservationEmailSettings) {
    if (!resend) {
        console.warn('RESEND_API_KEY not set — skipping reservation confirmation emails.');
        return;
    }

    const formattedDate = inquiry.requestedAt.toLocaleString('en-GB', {dateStyle: 'full', timeStyle: 'short'});
    const partyLabel = `${inquiry.partySize} ${inquiry.partySize === 1 ? 'person' : 'people'}`;

    const tasks: Promise<unknown>[] = [];

    if (inquiry.email) {
        tasks.push(
            resend.emails.send({
                from: FROM_ADDRESS,
                to: inquiry.email,
                subject: `We've received your reservation request — ${settings.businessName}`,
                text: `Hi ${inquiry.name},\n\nThanks for your reservation request at ${settings.businessName} for ${partyLabel} on ${formattedDate}.\n\nWe'll confirm by phone shortly. For urgent same-day requests, please call us directly at ${settings.phoneDisplay}.\n\nSee you soon,\n${settings.businessName}`,
            }),
        );
    }

    if (settings.ownerNotificationEmail) {
        tasks.push(
            resend.emails.send({
                from: FROM_ADDRESS,
                to: settings.ownerNotificationEmail,
                subject: `New reservation request — ${inquiry.name} (party of ${inquiry.partySize})`,
                text: `New reservation request:\n\nName: ${inquiry.name}\nPhone: ${inquiry.phone}\nEmail: ${inquiry.email || '—'}\nParty size: ${inquiry.partySize}\nRequested: ${formattedDate}\nMessage: ${inquiry.message || '—'}\n\nView and manage this in the admin dashboard under Inquiries.`,
            }),
        );
    }

    const results = await Promise.allSettled(tasks);
    for (const result of results) {
        if (result.status === 'rejected') console.error('Reservation email failed to send:', result.reason);
    }
}
