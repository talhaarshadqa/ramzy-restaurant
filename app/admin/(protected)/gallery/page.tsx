import Image from 'next/image';
import Link from 'next/link';

import {deleteGalleryImage} from '@/app/actions/gallery';
import {ConfirmDeleteButton} from '@/components/admin/ConfirmDeleteButton';
import {Card} from '@/components/ui/Card';
import {getAllGalleryImages} from '@/lib/data/gallery';

const SLOT_LABELS: Record<string, string> = {
    HERO_SLIDER: 'Homepage Hero Slider',
    GALLERY: '"Inside Ramzy" Gallery',
    MASTERPIECES: 'Masterpieces Scrolling Row',
    ROOM: 'Room Section Photo',
};

export default async function AdminGalleryPage() {
    const images = await getAllGalleryImages();
    const bySlot = new Map<string, typeof images>();
    for (const image of images) {
        const list = bySlot.get(image.slot) ?? [];
        list.push(image);
        bySlot.set(image.slot, list);
    }

    return (
        <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <h1 className="font-display text-3xl font-bold text-ink">Photos</h1>
                <Link
                    href="/admin/gallery/new"
                    className="rounded-full bg-maroon px-5 py-2 text-sm font-semibold text-cream"
                >
                    + Add Photo
                </Link>
            </div>

            {images.length === 0 ? (
                <Card className="p-8 text-sm text-ink-soft">No photos yet.</Card>
            ) : (
                <div className="flex flex-col gap-8">
                    {Object.keys(SLOT_LABELS).map((slot) => {
                        const slotImages = bySlot.get(slot);
                        if (!slotImages || slotImages.length === 0) return null;

                        return (
                            <div key={slot}>
                                <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-soft">{SLOT_LABELS[slot]}</h2>
                                <Card className="overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-cream-soft text-left text-xs font-semibold uppercase tracking-wide text-ink-soft">
                                            <tr>
                                                <th className="px-5 py-3">Preview</th>
                                                <th className="px-5 py-3">Path</th>
                                                <th className="px-5 py-3">Order</th>
                                                <th className="px-5 py-3">Status</th>
                                                <th className="px-5 py-3" />
                                                <th className="px-5 py-3" />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {slotImages.map((image) => (
                                                <tr
                                                    key={image.id}
                                                    className="border-t border-line hover:bg-cream-soft"
                                                >
                                                    <td className="px-5 py-3">
                                                        <div className="relative h-12 w-16 overflow-hidden rounded-md bg-cream-soft">
                                                            <Image
                                                                src={image.imagePath}
                                                                alt={image.altText}
                                                                fill
                                                                sizes="64px"
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-3 font-mono text-xs text-ink-soft">{image.imagePath}</td>
                                                    <td className="px-5 py-3 text-ink-soft">{image.displayOrder}</td>
                                                    <td className="px-5 py-3">
                                                        {image.isActive ? (
                                                            <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-800">Active</span>
                                                        ) : (
                                                            <span className="rounded-full bg-gray-200 px-2.5 py-1 text-xs font-bold text-gray-700">Hidden</span>
                                                        )}
                                                    </td>
                                                    <td className="px-5 py-3 text-right">
                                                        <Link
                                                            href={`/admin/gallery/${image.id}/edit`}
                                                            className="text-xs font-semibold text-ink-soft hover:text-ink"
                                                        >
                                                            Edit
                                                        </Link>
                                                    </td>
                                                    <td className="px-5 py-3 text-right">
                                                        <form action={deleteGalleryImage}>
                                                            <input
                                                                type="hidden"
                                                                name="id"
                                                                value={image.id}
                                                            />
                                                            <ConfirmDeleteButton confirmMessage="Delete this photo?" />
                                                        </form>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
