import {createCategory} from '@/app/actions/menu';
import {CategoryForm} from '@/components/admin/CategoryForm';

export default function NewCategoryPage() {
    return (
        <div>
            <h1 className="mb-8 font-display text-3xl font-bold text-ink">New Category</h1>
            <CategoryForm action={createCategory} />
        </div>
    );
}
