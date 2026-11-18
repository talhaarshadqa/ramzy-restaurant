'use client';

import {useActionState} from 'react';

import type {GalleryFormState} from '@/app/actions/gallery';
import type {GalleryImage} from '@/generated/prisma/client';

import {FormField, Input, Select} from '@/components/ui/FormField';

const initialState: GalleryFormState = {status: 'idle'};

const SLOT_OPTIONS = [
    {value: 'HERO_SLIDER', label: 'Homepage Hero Slider'},
    {value: 'GALLERY', label: '"Inside Ramzy" Gallery'},
    {value: 'MASTERPIECES', label: 'Masterpieces Scrolling Row'},
    {value: 'ROOM', label: 'Room Section Photo'},
] as const;

export function GalleryImageForm({image, action}: {image?: GalleryImage; action: (prevState: GalleryFormState, formData: FormData) => Promise<GalleryFormState>}) {
    const [state, formAction, isPending] = useActionState(action, initialState);

    return (
        <form
            action={formAction}
            className="flex max-w-lg flex-col gap-4"
        >
            <FormField
                label="Where it appears"
                htmlFor="slot"
                error={state.errors?.slot}
            >
                <Select
                    id="slot"
                    name="slot"
                    defaultValue={image?.slot ?? 'GALLERY'}
                    required
                >
                    {SLOT_OPTIONS.map((opt) => (
                        <option
                            key={opt.value}
                            value={opt.value}
                        >
                            {opt.label}
                        </option>
                    ))}
                </Select>
            </FormField>

            <FormField
                label="Image path"
                htmlFor="imagePath"
                error={state.errors?.imagePath}
                hint="e.g. /images/biryani.jpg — files currently in public/images/"
            >
                <Input
                    id="imagePath"
                    name="imagePath"
                    defaultValue={image?.imagePath}
                    required
                    maxLength={300}
                />
            </FormField>

            <FormField
                label="Alt text"
                htmlFor="altText"
                error={state.errors?.altText}
                hint="Describes the photo for accessibility and search"
            >
                <Input
                    id="altText"
                    name="altText"
                    defaultValue={image?.altText}
                    required
                    maxLength={200}
                />
            </FormField>

            <FormField
                label="Display order"
                htmlFor="displayOrder"
                hint="Lower numbers show first within the same slot"
            >
                <Input
                    id="displayOrder"
                    name="displayOrder"
                    type="number"
                    defaultValue={image?.displayOrder ?? 0}
                />
            </FormField>

            <label className="flex items-center gap-2 text-sm font-semibold text-ink">
                <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={image?.isActive ?? true}
                    className="h-4 w-4"
                />
                Active (visible on the public site)
            </label>

            {state.status === 'error' && state.message && <p className="text-sm font-medium text-maroon">{state.message}</p>}

            <button
                type="submit"
                disabled={isPending}
                className="mt-2 w-fit rounded-full bg-maroon px-7 py-3 text-sm font-semibold text-cream disabled:opacity-60"
            >
                {isPending ? 'Saving…' : 'Save Photo'}
            </button>
        </form>
    );
}
