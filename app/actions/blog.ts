'use server';

import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';

import {prisma} from '@/lib/prisma';
import {requireAdmin} from '@/lib/require-admin';
import {blogPostSchema} from '@/lib/validation/blog';

export type BlogFormState = {
    status: 'idle' | 'error';
    errors?: Record<string, string>;
    message?: string;
};

function zodErrorsToFieldMap(error: {issues: {path: PropertyKey[]; message: string}[]}) {
    const errors: Record<string, string> = {};
    for (const issue of error.issues) {
        const key = issue.path[0];
        if (typeof key === 'string' && !errors[key]) errors[key] = issue.message;
    }
    return errors;
}

function revalidateBlog(slug?: string) {
    revalidatePath('/');
    revalidatePath('/blog');
    if (slug) revalidatePath(`/blog/${slug}`);
}

function parseForm(formData: FormData) {
    return blogPostSchema.safeParse({
        title: formData.get('title'),
        slug: formData.get('slug'),
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        coverImage: formData.get('coverImage') || undefined,
        isPublished: formData.get('isPublished') === 'on',
    });
}

export async function createBlogPost(_prevState: BlogFormState, formData: FormData): Promise<BlogFormState> {
    await requireAdmin();

    const parsed = parseForm(formData);
    if (!parsed.success) {
        return {status: 'error', errors: zodErrorsToFieldMap(parsed.error), message: 'Please check the form.'};
    }

    const existing = await prisma.blogPost.findUnique({where: {slug: parsed.data.slug}});
    if (existing) {
        return {status: 'error', errors: {slug: 'That slug is already in use'}, message: 'Please check the form.'};
    }

    await prisma.blogPost.create({
        data: {
            title: parsed.data.title,
            slug: parsed.data.slug,
            excerpt: parsed.data.excerpt,
            content: parsed.data.content,
            coverImage: parsed.data.coverImage || null,
            isPublished: parsed.data.isPublished ?? true,
        },
    });

    revalidateBlog(parsed.data.slug);
    revalidatePath('/admin/blog');
    redirect('/admin/blog');
}

export async function updateBlogPost(id: string, _prevState: BlogFormState, formData: FormData): Promise<BlogFormState> {
    await requireAdmin();

    const parsed = parseForm(formData);
    if (!parsed.success) {
        return {status: 'error', errors: zodErrorsToFieldMap(parsed.error), message: 'Please check the form.'};
    }

    const existing = await prisma.blogPost.findUnique({where: {slug: parsed.data.slug}});
    if (existing && existing.id !== id) {
        return {status: 'error', errors: {slug: 'That slug is already in use'}, message: 'Please check the form.'};
    }

    await prisma.blogPost.update({
        where: {id},
        data: {
            title: parsed.data.title,
            slug: parsed.data.slug,
            excerpt: parsed.data.excerpt,
            content: parsed.data.content,
            coverImage: parsed.data.coverImage || null,
            isPublished: parsed.data.isPublished ?? true,
        },
    });

    revalidateBlog(parsed.data.slug);
    revalidatePath('/admin/blog');
    redirect('/admin/blog');
}

export async function deleteBlogPost(formData: FormData) {
    await requireAdmin();
    const id = formData.get('id');
    if (typeof id !== 'string') return;

    const post = await prisma.blogPost.delete({where: {id}});
    revalidateBlog(post.slug);
    revalidatePath('/admin/blog');
}
