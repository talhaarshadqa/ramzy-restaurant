import Image from 'next/image';

import {Reveal} from '@/components/site/Reveal';
import {getGalleryImages} from '@/lib/data/gallery';

const FALLBACK_PHOTOS = [
    {imagePath: '/images/interior.jpg', altText: 'Restaurant ambience'},
    {imagePath: '/images/biryani.jpg', altText: 'Qabuli Pilau'},
    {imagePath: '/images/kebab.jpg', altText: 'Seekh kebab platter'},
    {imagePath: '/images/spread.jpg', altText: "Chef's curry spread"},
    {imagePath: '/images/naan.jpg', altText: 'Fresh-baked naan bread'},
    {imagePath: '/images/chai.jpg', altText: 'Traditional chai'},
    {imagePath: '/images/tandoori.jpg', altText: 'Tandoori chicken'},
    {imagePath: '/images/dessert.jpg', altText: 'Gulab Jamun'},
];

export async function GallerySection() {
    const images = await getGalleryImages('GALLERY');
    const photos = images.length > 0 ? images : FALLBACK_PHOTOS;

    return (
        <section
            id="gallery"
            className="mx-auto max-w-6xl px-6 py-24 md:px-12"
        >
            <Reveal className="mb-14 text-center">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold">A Closer Look</p>
                <h2 className="font-display text-4xl font-bold tracking-tight text-ink">Inside Ramzy</h2>
            </Reveal>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {photos.map((photo, i) => (
                    <Reveal
                        key={`${photo.imagePath}-${i}`}
                        variant="pop"
                        delay={i * 80}
                        className={`relative aspect-square overflow-hidden rounded-card shadow-card transition hover:scale-[1.02] ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                    >
                        <Image
                            src={photo.imagePath}
                            alt={photo.altText}
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover"
                        />
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
