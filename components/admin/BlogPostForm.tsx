'use client';

import {useActionState} from 'react';

import type {BlogFormState} from '@/app/actions/blog';
import type {BlogPost} from '@/generated/prisma/client';

import {FormField, Input, Textarea} from '@/components/ui/FormField';

const initialState: BlogFormState = {status: 'idle'};

export function BlogPostForm({post, action}: {post?: BlogPost; action: (prevState: BlogFormState, formData: FormData) => Promise<BlogFormState>}) {
    const [state, formAction, isPending] = useActionState(action, initialState);

    return (
        <form
            action={formAction}
            className="flex max-w-2xl flex-col gap-4"
        >
            <FormField
                label="Title"
                htmlFor="title"
                error={state.errors?.title}
            >
                <Input
                    id="title"
                    name="title"
                    defaultValue={post?.title}
                    required
                    maxLength={200}
                />
            </FormField>

            <FormField
                label="Slug"
                htmlFor="slug"
                error={state.errors?.slug}
                hint="Lowercase letters, numbers and hyphens only — used in the URL /blog/<slug>"
            >
                <Input
                    id="slug"
                    name="slug"
                    defaultValue={post?.slug}
                    required
                    maxLength={200}
                />
            </FormField>

            <FormField
                label="Cover image path (optional)"
                htmlFor="coverImage"
                error={state.errors?.coverImage}
                hint="e.g. /images/kitchen.jpg — files currently in public/images/"
            >
                <Input
                    id="coverImage"
                    name="coverImage"
                    defaultValue={post?.coverImage ?? ''}
                    maxLength={300}
                />
            </FormField>

            <FormField
                label="Excerpt"
                htmlFor="excerpt"
                error={state.errors?.excerpt}
                hint="Short summary shown on blog cards (max 300 characters)"
            >
                <Textarea
                    id="excerpt"
                    name="excerpt"
                    defaultValue={post?.excerpt}
                    rows={2}
                    maxLength={300}
                    required
                />
            </FormField>

            <FormField
                label="Content"
                htmlFor="content"
                error={state.errors?.content}
                hint="Plain text — separate paragraphs with a blank line"
            >
                <Textarea
                    id="content"
                    name="content"
                    defaultValue={post?.content}
                    rows={12}
                    required
                />
            </FormField>

            <label className="flex items-center gap-2 text-sm font-semibold text-ink">
                <input
                    type="checkbox"
                    name="isPublished"
                    defaultChecked={post?.isPublished ?? true}
                    className="h-4 w-4"
                />
                Published (visible on the public site)
            </label>

            {state.status === 'error' && state.message && <p className="text-sm font-medium text-maroon">{state.message}</p>}

            <button
                type="submit"
                disabled={isPending}
                className="mt-2 w-fit rounded-full bg-maroon px-7 py-3 text-sm font-semibold text-cream disabled:opacity-60"
            >
                {isPending ? 'Saving…' : 'Save Post'}
            </button>
        </form>
    );
}
