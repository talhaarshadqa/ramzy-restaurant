import type {InquiryStatus} from '@/generated/prisma/client';

const STYLES: Record<InquiryStatus, string> = {
    NEW: 'bg-gold/20 text-maroon',
    CONTACTED: 'bg-blue-100 text-blue-800',
    CONFIRMED: 'bg-green-100 text-green-800',
    CLOSED: 'bg-gray-200 text-gray-700',
    CANCELLED: 'bg-red-100 text-red-700',
};

export function StatusBadge({status}: {status: InquiryStatus}) {
    return <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${STYLES[status]}`}>{status}</span>;
}
