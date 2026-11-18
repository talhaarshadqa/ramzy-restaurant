import type {Metadata} from 'next';

import {BlogCard} from '@/components/site/BlogCard';
import {FloatingWhatsApp} from '@/components/site/FloatingWhatsApp';
import {Footer} from '@/components/site/Footer';
import {Header} from '@/components/site/Header';
import {getBlogPosts} from '@/lib/data/blog';

export const metadata: Metadata = {
    title: 'News & Stories',
    description: 'The latest from Ramzy Restaurant — Sunday specials, behind-the-scenes from the kitchen, and news from Bury New Road, Manchester.',
    alternates: {canonical: '/blog'},
};

export default async function BlogIndexPage() {
    const posts = await getBlogPosts();

    return (
        <>
            <Header />
            <main className="flex-1">
                <section className="mx-auto max-w-6xl px-6 py-24 md:px-12">
                    <div className="mb-14 text-center">
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold">From the Kitchen</p>
                        <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">Our Blog</h1>
                    </div>

                    {posts.length === 0 ? (
                        <p className="text-center text-ink-soft">No posts yet — check back soon.</p>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => (
                                <BlogCard
                                    key={post.id}
                                    post={post}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
