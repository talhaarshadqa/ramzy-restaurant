import {prisma} from '@/lib/prisma';

export function getBlogPosts({includeUnpublished = false, take}: {includeUnpublished?: boolean; take?: number} = {}) {
    return prisma.blogPost.findMany({
        where: includeUnpublished ? undefined : {isPublished: true},
        orderBy: {publishedAt: 'desc'},
        take,
    });
}

export function getBlogPostBySlug(slug: string) {
    return prisma.blogPost.findUnique({where: {slug}});
}

export function getBlogPostById(id: string) {
    return prisma.blogPost.findUnique({where: {id}});
}
