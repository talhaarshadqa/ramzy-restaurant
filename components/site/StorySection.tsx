import {Reveal} from '@/components/site/Reveal';
import {SectionEyebrow} from '@/components/site/SectionEyebrow';
import {SparkleField} from '@/components/site/SparkleField';
import {getSiteSettings} from '@/lib/data/settings';

const FEATURES = [
    {
        label: 'Halal Certified',
        path: 'M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    },
    {
        label: 'Dine-in & Takeaway',
        path: 'M3 7h18M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M5 7h14l-1.2 13.2A2 2 0 0 1 15.8 22H8.2a2 2 0 0 1-2-1.8L5 7Z',
    },
    {
        label: 'Catering Available',
        path: 'M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8',
    },
] as const;

export async function StorySection() {
    const settings = await getSiteSettings();

    return (
        <section
            id="about"
            className="relative overflow-hidden bg-noir px-6 py-24 text-center text-cream md:px-12 md:py-32"
        >
            <SparkleField />

            <div className="relative mx-auto max-w-2xl">
                <Reveal>
                    <SectionEyebrow>What is Ramzy?</SectionEyebrow>
                    <h2 className="mb-8 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                        {settings.storyHeading} <span className="italic text-gold-light">{settings.storyHeadingAccent}</span>
                    </h2>
                </Reveal>

                <Reveal delay={120}>
                    <p className="mb-6 text-base leading-relaxed text-cream/80 md:text-lg">{settings.storyParagraph}</p>
                </Reveal>

                <Reveal delay={220}>
                    <blockquote className="mx-auto my-10 max-w-lg border-l-2 border-gold pl-6 text-left font-display text-xl italic leading-relaxed text-gold-light md:text-2xl">
                        &ldquo;{settings.storyQuote}&rdquo;
                    </blockquote>
                </Reveal>

                <div className="flex flex-wrap justify-center gap-3">
                    {FEATURES.map((feature, i) => (
                        <Reveal
                            key={feature.label}
                            variant="pop"
                            delay={300 + i * 100}
                        >
                            <div className="flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-2.5 text-sm font-semibold text-cream/90">
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#D7B873"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                >
                                    <path d={feature.path} />
                                </svg>
                                {feature.label}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
