'use client';

import {useActionState} from 'react';

import type {FormState} from '@/app/actions/menu';
import type {MenuCategory} from '@/generated/prisma/client';

import {FormField, Input} from '@/components/ui/FormField';

const initialState: FormState = {status: 'idle'};

export function CategoryForm({category, action}: {category?: MenuCategory; action: (prevState: FormState, formData: FormData) => Promise<FormState>}) {
    const [state, formAction, isPending] = useActionState(action, initialState);

    return (
        <form
            action={formAction}
            className="flex max-w-lg flex-col gap-4"
        >
            <FormField
                label="Name"
                htmlFor="name"
                error={state.errors?.name}
            >
                <Input
                    id="name"
                    name="name"
                    defaultValue={category?.name}
                    required
                    maxLength={120}
                />
            </FormField>
            <FormField
                label="Slug"
                htmlFor="slug"
                error={state.errors?.slug}
                hint="Lowercase letters, numbers and hyphens only, e.g. main-dishes"
            >
                <Input
                    id="slug"
                    name="slug"
                    defaultValue={category?.slug}
                    required
                    maxLength={120}
                />
            </FormField>
            <FormField
                label="Display order"
                htmlFor="displayOrder"
                error={state.errors?.displayOrder}
            >
                <Input
                    id="displayOrder"
                    name="displayOrder"
                    type="number"
                    defaultValue={category?.displayOrder ?? 0}
                />
            </FormField>
            <label className="flex items-center gap-2 text-sm font-semibold text-ink">
                <input
                    type="checkbox"
                    name="isHighlighted"
                    defaultChecked={category?.isHighlighted}
                    className="h-4 w-4"
                />
                Highlighted (e.g. Meal Deals, Sunday Special)
            </label>

            <FormField
                label="Homepage tagline (optional)"
                htmlFor="tagline"
                error={state.errors?.tagline}
                hint='Shown on the homepage "Cuisine" tile for this category, e.g. "Smoky, char-grilled, straight off the skewer."'
            >
                <Input
                    id="tagline"
                    name="tagline"
                    defaultValue={category?.tagline ?? ''}
                    maxLength={200}
                />
            </FormField>

            <label className="flex items-center gap-2 text-sm font-semibold text-ink">
                <input
                    type="checkbox"
                    name="isFeaturedOnHome"
                    defaultChecked={category?.isFeaturedOnHome}
                    className="h-4 w-4"
                />
                Featured on homepage &quot;Cuisine&quot; section
            </label>

            {state.status === 'error' && state.message && <p className="text-sm font-medium text-maroon">{state.message}</p>}

            <button
                type="submit"
                disabled={isPending}
                className="mt-2 w-fit rounded-full bg-maroon px-7 py-3 text-sm font-semibold text-cream disabled:opacity-60"
            >
                {isPending ? 'Saving…' : 'Save Category'}
            </button>
        </form>
    );
}
