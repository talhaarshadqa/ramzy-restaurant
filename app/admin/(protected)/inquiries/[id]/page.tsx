import Link from 'next/link';
import {notFound} from 'next/navigation';

import {InquiryStatusForm} from '@/components/admin/InquiryStatusForm';
import {StatusBadge} from '@/components/admin/StatusBadge';
import {Card} from '@/components/ui/Card';
import {getInquiryById} from '@/lib/data/inquiries';

export default async function AdminInquiryDetailPage({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const inquiry = await getInquiryById(id);
    if (!inquiry) notFound();

    return (
        <div>
            <Link
                href="/admin/inquiries"
                className="mb-6 inline-block text-sm font-semibold text-ink-soft hover:text-ink"
            >
                ← Back to Inquiries
            </Link>

            <Card className="max-w-xl p-8">
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h1 className="font-display text-2xl font-bold text-ink">{inquiry.name}</h1>
                        <p className="mt-1 text-sm text-ink-soft">Received {inquiry.createdAt.toLocaleString('en-GB', {dateStyle: 'medium', timeStyle: 'short'})}</p>
                    </div>
                    <StatusBadge status={inquiry.status} />
                </div>

                <dl className="grid grid-cols-2 gap-y-4 text-sm">
                    <dt className="font-semibold text-ink-soft">Phone</dt>
                    <dd>
                        <a
                            href={`tel:${inquiry.phone}`}
                            className="text-maroon hover:underline"
                        >
                            {inquiry.phone}
                        </a>
                    </dd>

                    <dt className="font-semibold text-ink-soft">Email</dt>
                    <dd>{inquiry.email ?? '—'}</dd>

                    <dt className="font-semibold text-ink-soft">Party size</dt>
                    <dd>{inquiry.partySize}</dd>

                    <dt className="font-semibold text-ink-soft">Requested for</dt>
                    <dd>{inquiry.requestedAt.toLocaleString('en-GB', {dateStyle: 'full', timeStyle: 'short'})}</dd>

                    {inquiry.message && (
                        <>
                            <dt className="font-semibold text-ink-soft">Message</dt>
                            <dd className="whitespace-pre-wrap">{inquiry.message}</dd>
                        </>
                    )}
                </dl>

                <div className="mt-8 border-t border-line pt-6">
                    <p className="mb-3 text-sm font-semibold text-ink">Update status</p>
                    <InquiryStatusForm
                        id={inquiry.id}
                        status={inquiry.status}
                    />
                </div>
            </Card>
        </div>
    );
}
