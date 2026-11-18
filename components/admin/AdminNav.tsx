import Link from 'next/link';

import {logoutAction} from '@/app/actions/auth';

const links = [
    {href: '/admin', label: 'Dashboard'},
    {href: '/admin/menu', label: 'Menu'},
    {href: '/admin/gallery', label: 'Photos'},
    {href: '/admin/blog', label: 'Blog'},
    {href: '/admin/inquiries', label: 'Inquiries'},
    {href: '/admin/settings', label: 'Settings'},
];

export function AdminNav() {
    return (
        <nav className="border-b border-line bg-white px-6 py-4 md:px-10">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link
                        href="/admin"
                        className="font-display text-lg font-bold text-maroon"
                    >
                        RAMZY Admin
                    </Link>
                    <div className="hidden gap-6 sm:flex">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-semibold text-ink-soft hover:text-ink"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
                <form action={logoutAction}>
                    <button
                        type="submit"
                        className="text-sm font-semibold text-ink-soft hover:text-maroon"
                    >
                        Log out
                    </button>
                </form>
            </div>
            <div className="mt-3 flex gap-5 sm:hidden">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-xs font-semibold text-ink-soft hover:text-ink"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
