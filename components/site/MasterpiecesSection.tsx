import Image from 'next/image';

import type {GalleryImage} from '@/generated/prisma/client';

import {Reveal} from '@/components/site/Reveal';
import {SectionEyebrow} from '@/components/site/SectionEyebrow';
import {Button} from '@/components/ui/Button';
import {getGalleryImages} from '@/lib/data/gallery';
import {getSiteSettings} from '@/lib/data/settings';

const FALLBACK_DISHES = [
    {imagePath: '/images/biryani.jpg', altText: 'Qabuli Pilau'},
    {imagePath: '/images/kebab.jpg', altText: 'Seekh kebab platter'},
    {imagePath: '/images/tandoori.jpg', altText: 'Tandoori chicken'},
    {imagePath: '/images/spread.jpg', altText: "Chef's curry spread"},
    {imagePath: '/images/naan.jpg', altText: 'Fresh-baked naan'},
    {imagePath: '/images/dessert.jpg', altText: 'Gulab Jamun'},
    {imagePath: '/images/chai.jpg', altText: 'Traditional chai'},
];

function DishRow({dishes}: {dishes: {imagePath: string; altText: string}[]}) {
    return (
        <div className="flex flex-shrink-0 items-center gap-6 px-3">
            {dishes.map((dish, i) => (
                <div
                    key={`${dish.imagePath}-${i}`}
                    className="relative h-48 w-48 flex-shrink-0 overflow-hidden rounded-3xl border-4 border-cream/10 shadow-lift md:h-64 md:w-64"
                    style={{transform: `rotate(${i % 2 === 0 ? -6 : 6}deg)`}}
                >
                    <Image
                        src={dish.imagePath}
                        alt={dish.altText}
                        fill
                        sizes="256px"
                        className="object-cover"
                    />
                </div>
            ))}
        </div>
    );
}

export async function MasterpiecesSection() {
    const [settings, images] = await Promise.all([getSiteSettings(), getGalleryImages('MASTERPIECES')]);
    const dishes: GalleryImage[] | typeof FALLBACK_DISHES = images.length > 0 ? images : FALLBACK_DISHES;

    return (
        <section className="overflow-hidden bg-noir py-24">
            <Reveal className="mx-auto mb-14 max-w-2xl px-6 text-center text-cream md:px-12">
                <SectionEyebrow tone="cream">The Masterpieces</SectionEyebrow>
                <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                    {settings.masterpiecesHeading} <span className="italic text-gold-light">{settings.masterpiecesHeadingAccent}</span>
                </h2>
            </Reveal>

            <div className="mb-14 overflow-hidden">
                <div className="flex w-max animate-marquee py-4">
                    <DishRow dishes={dishes} />
                    <DishRow dishes={dishes} />
                </div>
            </div>

            <div className="text-center">
                <Button
                    href="#gallery"
                    variant="outline-light"
                >
                    View the Full Gallery
                </Button>
            </div>
        </section>
    );
}
