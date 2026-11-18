import type {Metadata} from 'next';

import {FloatingWhatsApp} from '@/components/site/FloatingWhatsApp';
import {Footer} from '@/components/site/Footer';
import {Header} from '@/components/site/Header';
import {MenuSection} from '@/components/site/MenuSection';
import {getMenuCategories} from '@/lib/data/menu';

export const metadata: Metadata = {
    title: 'Full Menu — Ramzy Restaurant',
    description: 'The full halal menu at Ramzy Restaurant, Bury New Road, Manchester.',
};

export const metadata = {
    title: 'Menu',
    description: 'The full Ramzy Restaurant menu — halal kebabs, curries, biryani, naan, drinks and sweets, freshly made in Cheetham Hill, Manchester.',
    alternates: {canonical: '/menu'},
};

export default async function MenuPage() {
    const categories = await getMenuCategories();

    return (
        <>
            <Header />
            <main className="flex-1">
                <MenuSection
                    categories={categories}
                    variant="full"
                />
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
