import type {MetadataRoute} from 'next';

import {getBlogPosts} from '@/lib/data/blog';

const SITE_URL = 'https://ramzyrestaurant.co.uk';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getBlogPosts();

    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.publishedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [
        {url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1},
        {url: `${SITE_URL}/menu`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9},
        {url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7},
        ...postEntries,
    ];
}
