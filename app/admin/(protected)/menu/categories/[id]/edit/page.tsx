import {notFound} from 'next/navigation';

import {updateCategory} from '@/app/actions/menu';
import {CategoryForm} from '@/components/admin/CategoryForm';
import {getMenuCategoryById} from '@/lib/data/menu';

export default async function EditCategoryPage({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const category = await getMenuCategoryById(id);
    if (!category) notFound();

    return (
        <div>
            <h1 className="mb-8 font-display text-3xl font-bold text-ink">Edit Category</h1>
            <CategoryForm
                category={category}
                action={updateCategory.bind(null, category.id)}
            />
        </div>
    );
}
