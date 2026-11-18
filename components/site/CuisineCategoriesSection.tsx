import Link from 'next/link';

import {Reveal} from '@/components/site/Reveal';
import {SectionEyebrow} from '@/components/site/SectionEyebrow';
import {getFeaturedCategories} from '@/lib/data/menu';
import {getSiteSettings} from '@/lib/data/settings';

export async function CuisineCategoriesSection() {
    const [settings, categories] = await Promise.all([getSiteSettings(), getFeaturedCategories()]);

    if (categories.length === 0) return null;

    return (
        <section className="bg-cream-soft px-6 py-24 md:px-12">
            <div className="mx-auto max-w-5xl text-center">
                <Reveal>
                    <SectionEyebrow>The Cuisine</SectionEyebrow>
                    <h2 className="mb-4 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">{settings.cuisineHeading}</h2>
                    <p className="mx-auto mb-14 max-w-xl text-base text-ink-soft">{settings.cuisineSubheading}</p>
                </Reveal>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category, i) => (
                        <Reveal
                            key={category.slug}
                            variant="pop"
                            delay={i * 90}
                        >
                            <Link
                                href={`/menu#${category.slug}`}
                                className="group block rounded-card border border-line bg-white p-7 text-left shadow-card transition hover:-translate-y-1 hover:shadow-float"
                            >
                                <h3 className="mb-2 font-display text-xl font-bold text-ink group-hover:text-maroon">{category.name}</h3>
                                {category.tagline && <p className="text-sm leading-relaxed text-ink-soft">{category.tagline}</p>}
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
