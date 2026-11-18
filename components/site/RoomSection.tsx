import Image from 'next/image';

import {Reveal} from '@/components/site/Reveal';
import {SectionEyebrow} from '@/components/site/SectionEyebrow';
import {SparkleField} from '@/components/site/SparkleField';
import {Button} from '@/components/ui/Button';
import {getGalleryImages} from '@/lib/data/gallery';
import {getSiteSettings} from '@/lib/data/settings';

const FALLBACK_IMAGE = {imagePath: '/images/about.jpg', altText: 'Inside Ramzy Restaurant'};

export async function RoomSection() {
    const [settings, images] = await Promise.all([getSiteSettings(), getGalleryImages('ROOM')]);
    const image = images[0] ?? FALLBACK_IMAGE;

    return (
        <section className="relative overflow-hidden bg-noir px-6 py-24 text-cream md:px-12 md:py-32">
            <SparkleField />

            <div className="relative mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
                <Reveal
                    variant="pop"
                    className="relative"
                >
                    <div className="relative h-[440px] w-full overflow-hidden rounded-card shadow-lift">
                        <Image
                            src={image.imagePath}
                            alt={image.altText}
                            fill
                            sizes="(min-width: 768px) 480px, 100vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-6 -left-6 flex items-center gap-2.5 rounded-2xl bg-cream px-5 py-4 shadow-float">
                        <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                        <span className="text-sm font-semibold text-ink">Halal Kitchen</span>
                    </div>
                </Reveal>

                <Reveal
                    delay={150}
                    className="text-center md:text-left"
                >
                    <SectionEyebrow tone="cream">The Room</SectionEyebrow>
                    <h2 className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                        {settings.roomHeading} <span className="italic text-gold-light">{settings.roomHeadingAccent}</span>
                    </h2>
                    <p className="mb-5 text-base leading-relaxed text-cream/80">{settings.roomParagraph1}</p>
                    <p className="mb-8 text-base leading-relaxed text-cream/80">{settings.roomParagraph2}</p>
                    <Button
                        href="/#visit"
                        variant="primary"
                    >
                        Book Your Table
                    </Button>
                </Reveal>
            </div>
        </section>
    );
}
