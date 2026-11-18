'use client';

import {useActionState} from 'react';

import {createInquiry, type InquiryFormState} from '@/app/actions/inquiries';
import {FormField, Input, Textarea} from '@/components/ui/FormField';

const initialState: InquiryFormState = {status: 'idle'};

export function ReservationForm() {
    const [state, formAction, isPending] = useActionState(createInquiry, initialState);

    if (state.status === 'success') {
        return (
            <div className="rounded-2xl border border-gold/30 bg-gold/10 p-6 text-center">
                <p className="font-display text-lg font-bold text-ink">Thank you!</p>
                <p className="mt-2 text-sm text-ink-soft">Your request has been sent. We&apos;ll be in touch shortly to confirm — or call us directly if it&apos;s urgent.</p>
            </div>
        );
    }

    return (
        <form
            action={formAction}
            className="flex flex-col gap-4"
        >
            {/* Honeypot — hidden from real users via CSS, left empty by them, filled in by bots. */}
            <div
                className="hidden"
                aria-hidden="true"
            >
                <label htmlFor="website">Leave this field blank</label>
                <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    label="Name"
                    htmlFor="name"
                    error={state.errors?.name}
                >
                    <Input
                        id="name"
                        name="name"
                        required
                        maxLength={120}
                    />
                </FormField>
                <FormField
                    label="Phone"
                    htmlFor="phone"
                    error={state.errors?.phone}
                >
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        maxLength={30}
                    />
                </FormField>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    label="Email (optional)"
                    htmlFor="email"
                    error={state.errors?.email}
                >
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        maxLength={254}
                    />
                </FormField>
                <FormField
                    label="Party size"
                    htmlFor="partySize"
                    error={state.errors?.partySize}
                >
                    <Input
                        id="partySize"
                        name="partySize"
                        type="number"
                        min={1}
                        max={100}
                        defaultValue={2}
                        required
                    />
                </FormField>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    label="Date"
                    htmlFor="requestedDate"
                    error={state.errors?.requestedDate}
                >
                    <Input
                        id="requestedDate"
                        name="requestedDate"
                        type="date"
                        required
                    />
                </FormField>
                <FormField
                    label="Time"
                    htmlFor="requestedTime"
                    error={state.errors?.requestedTime}
                >
                    <Input
                        id="requestedTime"
                        name="requestedTime"
                        type="time"
                        required
                    />
                </FormField>
            </div>

            <FormField
                label="Message (optional)"
                htmlFor="message"
                error={state.errors?.message}
            >
                <Textarea
                    id="message"
                    name="message"
                    rows={3}
                    maxLength={2000}
                />
            </FormField>

            {state.status === 'error' && state.message && <p className="text-sm font-medium text-gold-light">{state.message}</p>}

            <button
                type="submit"
                disabled={isPending}
                className="mt-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-float disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isPending ? 'Sending…' : 'Request a Table'}
            </button>
        </form>
    );
}
