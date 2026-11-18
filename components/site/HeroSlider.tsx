'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';

import type {GalleryImage} from '@/generated/prisma/client';

const FALLBACK_SLIDES = [
    {src: '/images/interior.jpg', alt: 'Ramzy Restaurant dining room'},
    {src: '/images/biryani.jpg', alt: 'Qabuli Pilau'},
    {src: '/images/kebab.jpg', alt: 'Seekh kebab platter'},
    {src: '/images/spread.jpg', alt: "Chef's curry spread"},
    {src: '/images/tandoori.jpg', alt: 'Tandoori chicken'},
];

export function HeroSlider({slides: dbSlides}: {slides: GalleryImage[]}) {
    const slides = dbSlides.length > 0 ? dbSlides.map((s) => ({src: s.imagePath, alt: s.altText})) : FALLBACK_SLIDES;
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setCurrent((i) => (i + 1) % slides.length);
        }, 5000);
        return () => clearInterval(id);
    }, [slides.length]);

    return (
        <div className="absolute inset-0">
            {slides.map((slide, i) => (
                <Image
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className={`object-cover transition-opacity duration-1000 ease-in-out ${i === current ? 'opacity-100' : 'opacity-0'}`}
                />
            ))}

            {/* Deep maroon-noir tint over the photos so the cream/gold text stays legible */}
            <div className="absolute inset-0 bg-gradient-to-br from-maroon/70 to-noir/85" />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-noir/40" />

            <div className="absolute inset-x-0 bottom-10 flex justify-center gap-2">
                {slides.map((slide, i) => (
                    <button
                        key={slide.src}
                        type="button"
                        onClick={() => setCurrent(i)}
                        aria-label={`Show slide ${i + 1}: ${slide.alt}`}
                        aria-current={i === current}
                        className={`h-2 rounded-full transition-all ${i === current ? 'w-6 bg-gold' : 'w-2 bg-cream/40'}`}
                    />
                ))}
            </div>
        </div>
    );
}
