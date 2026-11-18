import type {MenuCategory, MenuItem} from '@/generated/prisma/client';

import {MenuCategoryCard} from '@/components/site/MenuCategoryCard';
import {Button} from '@/components/ui/Button';

type CategoryWithItems = MenuCategory & {items: MenuItem[]};

type Props = {
    categories: CategoryWithItems[];
    variant: 'preview' | 'full';
};

export function MenuSection({categories, variant}: Props) {
    const visibleCategories = variant === 'preview' ? categories.filter((c) => !c.isHighlighted).slice(0, 2) : categories;

    return (
        <section
            id="menu"
            className="border-y border-line bg-cream-soft px-6 py-24 md:px-12"
        >
            <div className="mx-auto max-w-4xl">
                <div className="mb-16 text-center">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold">Taste the Tradition</p>
                    <h2 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">Our Menu</h2>
                </div>

                {visibleCategories.map((category) => (
                    <MenuCategoryCard
                        key={category.id}
                        category={category}
                    />
                ))}

                {variant === 'preview' && (
                    <div className="mt-6 text-center">
                        <Button
                            href="/menu"
                            variant="ghost"
                        >
                            View Full Menu
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
