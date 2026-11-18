import {Reveal} from '@/components/site/Reveal';
import {SectionEyebrow} from '@/components/site/SectionEyebrow';
import {Button} from '@/components/ui/Button';
import {getSignatureDishes} from '@/lib/data/menu';
import {getSiteSettings} from '@/lib/data/settings';
import {formatPrice} from '@/lib/format';

export async function SignatureDishesSection() {
    const [settings, dishes] = await Promise.all([getSiteSettings(), getSignatureDishes()]);

    if (dishes.length === 0) return null;

    return (
        <section className="bg-white px-6 py-24 md:px-12">
            <div className="mx-auto max-w-6xl text-center">
                <Reveal>
                    <SectionEyebrow>The Signatures</SectionEyebrow>
                    <h2 className="mb-4 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">Dishes with a story to tell.</h2>
                    <p className="mx-auto mb-14 max-w-xl text-base text-ink-soft">{settings.signatureSubheading}</p>
                </Reveal>

                <div className="grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
                    {dishes.map((dish, i) => {
                        const priceLabel = dish.singlePrice
                            ? formatPrice(dish.singlePrice)
                            : dish.largePrice
                              ? `${formatPrice(dish.medPrice)} / ${formatPrice(dish.largePrice)}`
                              : formatPrice(dish.medPrice);

                        return (
                            <Reveal
                                key={dish.id}
                                variant="pop"
                                delay={(i % 3) * 90}
                                className="rounded-card border border-line bg-cream-soft p-7"
                            >
                                {dish.signatureLabel && <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">{dish.signatureLabel}</p>}
                                <h3 className="mb-2 font-display text-xl font-bold text-ink">{dish.name}</h3>
                                {dish.signatureDescription && <p className="mb-4 text-sm leading-relaxed text-ink-soft">{dish.signatureDescription}</p>}
                                <p className="font-display text-base font-bold text-maroon">{priceLabel}</p>
                            </Reveal>
                        );
                    })}
                </div>

                <Reveal className="mt-14">
                    <Button
                        href="/menu"
                        variant="ghost"
                    >
                        Explore the Full Menu
                    </Button>
                </Reveal>
            </div>
        </section>
    );
}
