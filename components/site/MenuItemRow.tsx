import type {MenuItem} from '@/generated/prisma/client';

import {formatPrice} from '@/lib/format';

export function MenuItemRow({item}: {item: MenuItem}) {
    const priceLabel = item.singlePrice ? formatPrice(item.singlePrice) : item.largePrice ? `${formatPrice(item.medPrice)} / ${formatPrice(item.largePrice)}` : formatPrice(item.medPrice);

    return (
        <div className="flex items-start justify-between gap-4 rounded-lg px-2.5 py-2 transition hover:bg-cream-soft">
            <span className="text-sm text-ink">
                {item.name}
                {item.description && <span className="ml-1.5 text-xs text-ink-soft/70">({item.description})</span>}
            </span>
            <span className="whitespace-nowrap rounded-full bg-gold/10 px-2.5 py-1 text-[13px] font-bold text-maroon">{priceLabel}</span>
        </div>
    );
}
