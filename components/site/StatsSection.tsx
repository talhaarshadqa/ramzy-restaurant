import {Reveal} from '@/components/site/Reveal';
import {SectionEyebrow} from '@/components/site/SectionEyebrow';
import {SparkleField} from '@/components/site/SparkleField';
import {getSiteSettings} from '@/lib/data/settings';

export async function StatsSection() {
    const settings = await getSiteSettings();

    const stats = [
        {value: `${settings.googleRating}★`, label: 'Google Rating'},
        {value: `${settings.googleReviewCount}`, label: 'Reviews & Counting'},
        {value: settings.statDishesValue, label: settings.statDishesLabel},
        {value: settings.statHalalValue, label: settings.statHalalLabel},
    ];

    return (
        <section className="relative overflow-hidden bg-noir px-6 py-20 text-center text-cream md:px-12">
            <SparkleField />
            <div className="relative mx-auto max-w-4xl">
                <Reveal>
                    <SectionEyebrow>The Tale So Far</SectionEyebrow>
                    <h2 className="mb-14 font-display text-3xl font-bold tracking-tight md:text-4xl">A story worth telling.</h2>
                </Reveal>

                <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
                    {stats.map((stat, i) => (
                        <Reveal
                            key={stat.label}
                            variant="pop"
                            delay={i * 120}
                        >
                            <p className="font-display text-4xl font-bold text-gold-light md:text-5xl">{stat.value}</p>
                            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-cream/70">{stat.label}</p>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
