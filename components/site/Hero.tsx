import {HeroSlider} from '@/components/site/HeroSlider';
import {Reveal} from '@/components/site/Reveal';
import {SectionEyebrow} from '@/components/site/SectionEyebrow';
import {SparkleField} from '@/components/site/SparkleField';
import {Button} from '@/components/ui/Button';
import {getGalleryImages} from '@/lib/data/gallery';
import {getSiteSettings} from '@/lib/data/settings';

export async function Hero() {
    const [settings, slides] = await Promise.all([getSiteSettings(), getGalleryImages('HERO_SLIDER')]);
    const badges = [settings.heroBadge1, settings.heroBadge2];

    return (
        <header
            id="top"
            className="relative overflow-hidden px-6 pb-24 pt-32 text-center text-cream md:px-12 md:pb-36 md:pt-36"
            style={{clipPath: 'polygon(0 0, 100% 0, 100% 94%, 0 100%)'}}
        >
            <HeroSlider slides={slides} />
            <SparkleField />

            <Reveal className="relative mb-6">
                <SectionEyebrow tone="cream">{settings.heroEyebrow}</SectionEyebrow>
            </Reveal>

            <Reveal delay={120}>
                <h1 className="relative font-display text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">{settings.businessName}</h1>
            </Reveal>

            <Reveal delay={220}>
                <p className="relative mx-auto mt-5 max-w-xl text-lg text-[#f0dfc4] md:text-xl">{settings.heroTagline}</p>
            </Reveal>

            <Reveal
                delay={320}
                className="relative mt-6 flex flex-wrap justify-center gap-2"
            >
                {badges.map((label) => (
                    <span
                        key={label}
                        className="rounded-full border border-cream/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-light"
                    >
                        {label}
                    </span>
                ))}
            </Reveal>

            <Reveal
                variant="pop"
                delay={420}
                className="relative mt-10 flex flex-wrap justify-center gap-4"
            >
                <Button
                    href="/menu"
                    variant="primary"
                >
                    View Our Menu
                </Button>
                <Button
                    href="/#visit"
                    variant="outline-light"
                >
                    Find Us
                </Button>
            </Reveal>
        </header>
    );
}
