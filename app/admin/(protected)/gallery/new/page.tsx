import {createGalleryImage} from '@/app/actions/gallery';
import {GalleryImageForm} from '@/components/admin/GalleryImageForm';

export default function NewGalleryImagePage() {
    return (
        <div>
            <h1 className="mb-8 font-display text-3xl font-bold text-ink">Add Photo</h1>
            <GalleryImageForm action={createGalleryImage} />
        </div>
    );
}
