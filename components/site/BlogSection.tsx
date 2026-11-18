import type {BlogPost} from '@/generated/prisma/client';

import {BlogCard} from '@/components/site/BlogCard';
import {Reveal} from '@/components/site/Reveal';
import {Button} from '@/components/ui/Button';

export function BlogSection({posts}: {posts: BlogPost[]}) {
    if (posts.length === 0) return null;

    return (
        <section className="mx-auto max-w-6xl px-6 py-24 md:px-12">
            <Reveal className="mb-14 text-center">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold">From the Kitchen</p>
                <h2 className="font-display text-4xl font-bold tracking-tight text-ink">Latest News</h2>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, i) => (
                    <Reveal
                        key={post.id}
                        variant="pop"
                        delay={i * 100}
                    >
                        <BlogCard post={post} />
                    </Reveal>
                ))}
            </div>

            <Reveal className="mt-10 text-center">
                <Button
                    href="/blog"
                    variant="ghost"
                >
                    Read All Posts
                </Button>
            </Reveal>
        </section>
    );
}
