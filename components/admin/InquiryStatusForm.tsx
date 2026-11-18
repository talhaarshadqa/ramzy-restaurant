'use client';

import {useTransition} from 'react';

import type {InquiryStatus} from '@/generated/prisma/client';

import {updateInquiryStatus} from '@/app/actions/inquiries';
import {Select} from '@/components/ui/FormField';

const STATUSES: InquiryStatus[] = ['NEW', 'CONTACTED', 'CONFIRMED', 'CLOSED', 'CANCELLED'];

export function InquiryStatusForm({id, status}: {id: string; status: InquiryStatus}) {
    const [isPending, startTransition] = useTransition();

    return (
        <form
            action={(formData) => startTransition(() => updateInquiryStatus(formData))}
            className="flex items-center gap-3"
        >
            <input
                type="hidden"
                name="id"
                value={id}
            />
            <Select
                key={status}
                name="status"
                defaultValue={status}
                disabled={isPending}
                className="w-auto"
                onChange={(event) => event.currentTarget.form?.requestSubmit()}
            >
                {STATUSES.map((value) => (
                    <option
                        key={value}
                        value={value}
                    >
                        {value}
                    </option>
                ))}
            </Select>
            {isPending && <span className="text-xs text-ink-soft">Saving…</span>}
        </form>
    );
}
