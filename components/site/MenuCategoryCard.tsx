import type {MenuCategory, MenuItem} from '@/generated/prisma/client';

import {MenuCategoryIcon} from '@/components/site/MenuCategoryIcon';
import {MenuItemRow} from '@/components/site/MenuItemRow';
import {Card} from '@/components/ui/Card';
import {PRICE_UNIT_LABELS} from '@/lib/constants';

type CategoryWithItems = MenuCategory & {items: MenuItem[]};

export function MenuCategoryCard({category}: {category: CategoryWithItems}) {
    if (category.items.length === 0) return null;

    const hasTwoTierPricing = category.items.some((item) => item.largePrice !== null);
    const unitLabel = hasTwoTierPricing ? PRICE_UNIT_LABELS[category.slug]?.withTwoPrices : undefined;

    const isHighlighted = category.isHighlighted;

    return (
        <Card
            id={category.slug}
            className={`mb-7 scroll-mt-24 p-9 ${isHighlighted ? 'bg-gradient-to-br from-maroon to-maroon-dark text-cream' : ''}`}
        >
            <div className="mb-1 flex items-center gap-3.5">
                {!isHighlighted && <MenuCategoryIcon slug={category.slug} />}
                <h3 className={`font-display text-2xl font-bold ${isHighlighted ? 'text-gold-light' : 'text-ink'}`}>{category.name}</h3>
            </div>
            {unitLabel && <p className="mb-5 ml-12 text-[11px] font-semibold uppercase tracking-wider text-ink-soft/60">Priced {unitLabel}</p>}
            {!unitLabel && <div className="mb-5" />}

            <div className={`grid gap-x-10 ${isHighlighted ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
                {category.items.map((item) =>
                    isHighlighted ? (
                        <div
                            key={item.id}
                            className="flex justify-between border-b border-white/15 py-2 text-sm last:border-0"
                        >
                            <span>{item.name}</span>
                            <span className="font-semibold">
                                {item.singlePrice ? `£${Number(item.singlePrice).toFixed(2)}` : `£${Number(item.medPrice).toFixed(2)} / £${Number(item.largePrice).toFixed(2)}`}
                            </span>
                        </div>
                    ) : (
                        <MenuItemRow
                            key={item.id}
                            item={item}
                        />
                    ),
                )}
            </div>
        </Card>
    );
}
