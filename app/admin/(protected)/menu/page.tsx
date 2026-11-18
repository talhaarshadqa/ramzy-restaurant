import Link from 'next/link';

import {deleteCategory, deleteMenuItem, toggleItemAvailability} from '@/app/actions/menu';
import {ConfirmDeleteButton} from '@/components/admin/ConfirmDeleteButton';
import {Card} from '@/components/ui/Card';
import {getMenuCategories} from '@/lib/data/menu';
import {formatPrice} from '@/lib/format';

export default async function AdminMenuPage() {
    const categories = await getMenuCategories({includeUnavailable: true});

    return (
        <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <h1 className="font-display text-3xl font-bold text-ink">Menu</h1>
                <div className="flex gap-3">
                    <Link
                        href="/admin/menu/categories/new"
                        className="rounded-full border-[1.5px] border-maroon px-5 py-2 text-sm font-semibold text-maroon"
                    >
                        + Category
                    </Link>
                    <Link
                        href="/admin/menu/items/new"
                        className="rounded-full bg-maroon px-5 py-2 text-sm font-semibold text-cream"
                    >
                        + Menu Item
                    </Link>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                {categories.map((category) => (
                    <Card
                        key={category.id}
                        className="p-6"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h2 className="font-display text-xl font-bold text-ink">
                                    {category.name}
                                    {category.isHighlighted && <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 text-[11px] font-semibold text-maroon">Highlighted</span>}
                                </h2>
                                <p className="text-xs text-ink-soft">/{category.slug}</p>
                            </div>
                            <div className="flex gap-3">
                                <Link
                                    href={`/admin/menu/categories/${category.id}/edit`}
                                    className="text-xs font-semibold text-ink-soft hover:text-ink"
                                >
                                    Edit
                                </Link>
                                <form action={deleteCategory}>
                                    <input
                                        type="hidden"
                                        name="id"
                                        value={category.id}
                                    />
                                    <ConfirmDeleteButton confirmMessage={`Delete "${category.name}" and all its items?`} />
                                </form>
                            </div>
                        </div>

                        {category.items.length === 0 ? (
                            <p className="text-sm text-ink-soft">No items yet.</p>
                        ) : (
                            <table className="w-full text-sm">
                                <tbody>
                                    {category.items.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-t border-line"
                                        >
                                            <td className="py-2.5 pr-3">
                                                <span className={item.isAvailable ? '' : 'text-ink-soft/50 line-through'}>{item.name}</span>
                                            </td>
                                            <td className="py-2.5 pr-3 font-semibold text-maroon">
                                                {item.singlePrice
                                                    ? formatPrice(item.singlePrice)
                                                    : item.largePrice
                                                      ? `${formatPrice(item.medPrice)} / ${formatPrice(item.largePrice)}`
                                                      : formatPrice(item.medPrice)}
                                            </td>
                                            <td className="py-2.5 pr-3 text-right">
                                                <form
                                                    action={toggleItemAvailability}
                                                    className="inline"
                                                >
                                                    <input
                                                        type="hidden"
                                                        name="id"
                                                        value={item.id}
                                                    />
                                                    <input
                                                        type="hidden"
                                                        name="nextValue"
                                                        value={(!item.isAvailable).toString()}
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="text-xs font-semibold text-ink-soft hover:text-ink"
                                                    >
                                                        {item.isAvailable ? 'Hide' : 'Show'}
                                                    </button>
                                                </form>
                                            </td>
                                            <td className="py-2.5 pr-3 text-right">
                                                <Link
                                                    href={`/admin/menu/items/${item.id}/edit`}
                                                    className="text-xs font-semibold text-ink-soft hover:text-ink"
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                            <td className="py-2.5 text-right">
                                                <form action={deleteMenuItem}>
                                                    <input
                                                        type="hidden"
                                                        name="id"
                                                        value={item.id}
                                                    />
                                                    <ConfirmDeleteButton confirmMessage={`Delete "${item.name}"?`} />
                                                </form>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
}
