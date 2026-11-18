import type {ReactNode} from 'react';

import {AdminNav} from '@/components/admin/AdminNav';
import {requireAdmin} from '@/lib/require-admin';

export default async function AdminProtectedLayout({children}: {children: ReactNode}) {
    await requireAdmin();

    return (
        <div className="min-h-screen bg-cream-soft">
            <AdminNav />
            <main className="mx-auto max-w-6xl px-6 py-10 md:px-10">{children}</main>
        </div>
    );
}
