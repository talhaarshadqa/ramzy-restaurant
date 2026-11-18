import Image from 'next/image';
import Link from 'next/link';

import type {BlogPost} from '@/generated/prisma/client';

export function BlogCard({post}: {post: BlogPost}) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group block overflow-hidden rounded-card bg-white shadow-card transition hover:shadow-float"
        >
            <div className="relative h-52 w-full overflow-hidden bg-cream">
                {post.coverImage && (
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition group-hover:scale-105"
                    />
                )}
            </div>
            <div className="p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gold">{post.publishedAt.toLocaleDateString('en-GB', {dateStyle: 'long'})}</p>
                <h3 className="mb-2 font-display text-xl font-bold text-ink group-hover:text-maroon">{post.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
            </div>
        </Link>
    );
}
