import {notFound} from 'next/navigation';

import {updateGalleryImage} from '@/app/actions/gallery';
import {GalleryImageForm} from '@/components/admin/GalleryImageForm';
import {getGalleryImageById} from '@/lib/data/gallery';

export default async function EditGalleryImagePage({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const image = await getGalleryImageById(id);
    if (!image) notFound();

    return (
        <div>
            <h1 className="mb-8 font-display text-3xl font-bold text-ink">Edit Photo</h1>
            <GalleryImageForm
                image={image}
                action={updateGalleryImage.bind(null, image.id)}
            />
        </div>
    );
}
