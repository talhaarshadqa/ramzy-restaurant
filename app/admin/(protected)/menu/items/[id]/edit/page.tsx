import {notFound} from 'next/navigation';

import {updateMenuItem} from '@/app/actions/menu';
import {MenuItemForm} from '@/components/admin/MenuItemForm';
import {getMenuCategories, getMenuItemById} from '@/lib/data/menu';

export default async function EditMenuItemPage({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const [item, categories] = await Promise.all([getMenuItemById(id), getMenuCategories({includeUnavailable: true})]);
    if (!item) notFound();

    // Prisma's Decimal type can't cross the Server -> Client Component boundary, so convert
    // the price fields to plain numbers before handing them to the (client) form.
    const serializedItem = {
        ...item,
        singlePrice: item.singlePrice === null ? null : Number(item.singlePrice),
        medPrice: item.medPrice === null ? null : Number(item.medPrice),
        largePrice: item.largePrice === null ? null : Number(item.largePrice),
    };

    return (
        <div>
            <h1 className="mb-8 font-display text-3xl font-bold text-ink">Edit Menu Item</h1>
            <MenuItemForm
                item={serializedItem}
                categories={categories}
                action={updateMenuItem.bind(null, item.id)}
            />
        </div>
    );
}
