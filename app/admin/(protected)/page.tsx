import Link from 'next/link';

import {Card} from '@/components/ui/Card';
import {countNewInquiries} from '@/lib/data/inquiries';

export default async function AdminDashboardPage() {
    const newInquiryCount = await countNewInquiries();

    return (
        <div>
            <h1 className="mb-8 font-display text-3xl font-bold text-ink">Dashboard</h1>

            <div className="grid gap-5 sm:grid-cols-3">
                <Link href="/admin/inquiries">
                    <Card className="p-7 transition hover:shadow-float">
                        <p className="text-sm font-semibold text-ink-soft">New Inquiries</p>
                        <p className="mt-2 font-display text-4xl font-bold text-maroon">{newInquiryCount}</p>
                    </Card>
                </Link>
                <Link href="/admin/menu">
                    <Card className="p-7 transition hover:shadow-float">
                        <p className="text-sm font-semibold text-ink-soft">Menu</p>
                        <p className="mt-2 text-sm text-ink">Edit categories, items & prices</p>
                    </Card>
                </Link>
                <Link href="/admin/settings">
                    <Card className="p-7 transition hover:shadow-float">
                        <p className="text-sm font-semibold text-ink-soft">Settings</p>
                        <p className="mt-2 text-sm text-ink">Opening hours & status note</p>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
