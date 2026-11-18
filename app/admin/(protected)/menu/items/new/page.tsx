import {createMenuItem} from '@/app/actions/menu';
import {MenuItemForm} from '@/components/admin/MenuItemForm';
import {getMenuCategories} from '@/lib/data/menu';

export default async function NewMenuItemPage() {
    const categories = await getMenuCategories({includeUnavailable: true});

    return (
        <div>
            <h1 className="mb-8 font-display text-3xl font-bold text-ink">New Menu Item</h1>
            <MenuItemForm
                categories={categories}
                action={createMenuItem}
            />
        </div>
    );
}
