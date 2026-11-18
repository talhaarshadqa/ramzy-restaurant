import Link from 'next/link';

import type {InquiryStatus} from '@/generated/prisma/client';

import {StatusBadge} from '@/components/admin/StatusBadge';
import {Card} from '@/components/ui/Card';
import {getInquiries} from '@/lib/data/inquiries';

const FILTERS: Array<InquiryStatus | 'ALL'> = ['ALL', 'NEW', 'CONTACTED', 'CONFIRMED', 'CLOSED', 'CANCELLED'];

export default async function AdminInquiriesPage({searchParams}: {searchParams: Promise<{status?: string}>}) {
    const {status} = await searchParams;
    const activeFilter = status && FILTERS.includes(status as InquiryStatus) ? (status as InquiryStatus) : 'ALL';

    const inquiries = await getInquiries(activeFilter === 'ALL' ? {} : {status: activeFilter});

    return (
        <div>
            <h1 className="mb-6 font-display text-3xl font-bold text-ink">Inquiries</h1>

            <div className="mb-6 flex flex-wrap gap-2">
                {FILTERS.map((filterValue) => (
                    <Link
                        key={filterValue}
                        href={filterValue === 'ALL' ? '/admin/inquiries' : `/admin/inquiries?status=${filterValue}`}
                        className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide ${
                            activeFilter === filterValue ? 'bg-maroon text-cream' : 'bg-white text-ink-soft'
                        }`}
                    >
                        {filterValue}
                    </Link>
                ))}
            </div>

            {inquiries.length === 0 ? (
                <Card className="p-8 text-sm text-ink-soft">No inquiries{activeFilter !== 'ALL' ? ` with status ${activeFilter}` : ''}.</Card>
            ) : (
                <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[640px] text-sm">
                            <thead className="bg-cream-soft text-left text-xs font-semibold uppercase tracking-wide text-ink-soft">
                                <tr>
                                    <th className="px-5 py-3">Name</th>
                                    <th className="px-5 py-3">Phone</th>
                                    <th className="px-5 py-3">Party</th>
                                    <th className="px-5 py-3">Requested</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3">Received</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inquiries.map((inquiry) => (
                                    <tr
                                        key={inquiry.id}
                                        className="border-t border-line hover:bg-cream-soft"
                                    >
                                        <td className="px-5 py-3">
                                            <Link
                                                href={`/admin/inquiries/${inquiry.id}`}
                                                className="font-semibold text-ink hover:text-maroon"
                                            >
                                                {inquiry.name}
                                            </Link>
                                        </td>
                                        <td className="px-5 py-3 text-ink-soft">{inquiry.phone}</td>
                                        <td className="px-5 py-3 text-ink-soft">{inquiry.partySize}</td>
                                        <td className="px-5 py-3 text-ink-soft">{inquiry.requestedAt.toLocaleString('en-GB', {dateStyle: 'medium', timeStyle: 'short'})}</td>
                                        <td className="px-5 py-3">
                                            <StatusBadge status={inquiry.status} />
                                        </td>
                                        <td className="px-5 py-3 text-ink-soft">{inquiry.createdAt.toLocaleDateString('en-GB', {dateStyle: 'medium'})}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    );
}
