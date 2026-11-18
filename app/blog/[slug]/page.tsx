import type {Metadata} from 'next';

import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';

import {FloatingWhatsApp} from '@/components/site/FloatingWhatsApp';
import {Footer} from '@/components/site/Footer';
import {Header} from '@/components/site/Header';
import {getBlogPostBySlug} from '@/lib/data/blog';

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
    const {slug} = await params;
    const post = await getBlogPostBySlug(slug);
    if (!post) return {};
    return {title: `${post.title} — Ramzy Restaurant`, description: post.excerpt};
}

export default async function BlogPostPage({params}: {params: Promise<{slug: string}>}) {
    const {slug} = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post || !post.isPublished) notFound();

    const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean);

    return (
        <>
            <Header />
            <main className="flex-1">
                <article className="mx-auto max-w-3xl px-6 py-20 md:px-12">
                    <Link
                        href="/blog"
                        className="mb-8 inline-block text-sm font-semibold text-ink-soft hover:text-maroon"
                    >
                        ← Back to Blog
                    </Link>

                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold">{post.publishedAt.toLocaleDateString('en-GB', {dateStyle: 'long'})}</p>
                    <h1 className="mb-8 font-display text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">{post.title}</h1>

                    {post.coverImage && (
                        <div className="relative mb-10 h-72 w-full overflow-hidden rounded-card shadow-card md:h-96">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                sizes="768px"
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-5">
                        {paragraphs.map((paragraph, i) => (
                            <p
                                key={i}
                                className="text-base leading-relaxed text-ink-soft"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </article>
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
