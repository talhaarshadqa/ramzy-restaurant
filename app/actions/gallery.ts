'use server';

import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';

import {prisma} from '@/lib/prisma';
import {requireAdmin} from '@/lib/require-admin';
import {galleryImageSchema} from '@/lib/validation/gallery';

export type GalleryFormState = {
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

function revalidateSite() {
    revalidatePath('/', 'layout');
}

function parseForm(formData: FormData) {
    return galleryImageSchema.safeParse({
        slot: formData.get('slot'),
        imagePath: formData.get('imagePath'),
        altText: formData.get('altText'),
        displayOrder: formData.get('displayOrder') || 0,
        isActive: formData.get('isActive') === 'on',
    });
}

export async function createGalleryImage(_prevState: GalleryFormState, formData: FormData): Promise<GalleryFormState> {
    await requireAdmin();

    const parsed = parseForm(formData);
    if (!parsed.success) {
        return {status: 'error', errors: zodErrorsToFieldMap(parsed.error), message: 'Please check the form.'};
    }

    await prisma.galleryImage.create({
        data: {
            slot: parsed.data.slot,
            imagePath: parsed.data.imagePath,
            altText: parsed.data.altText,
            displayOrder: parsed.data.displayOrder ?? 0,
            isActive: parsed.data.isActive ?? true,
        },
    });

    revalidateSite();
    revalidatePath('/admin/gallery');
    redirect('/admin/gallery');
}

export async function updateGalleryImage(id: string, _prevState: GalleryFormState, formData: FormData): Promise<GalleryFormState> {
    await requireAdmin();

    const parsed = parseForm(formData);
    if (!parsed.success) {
        return {status: 'error', errors: zodErrorsToFieldMap(parsed.error), message: 'Please check the form.'};
    }

    await prisma.galleryImage.update({
        where: {id},
        data: {
            slot: parsed.data.slot,
            imagePath: parsed.data.imagePath,
            altText: parsed.data.altText,
            displayOrder: parsed.data.displayOrder ?? 0,
            isActive: parsed.data.isActive ?? true,
        },
    });

    revalidateSite();
    revalidatePath('/admin/gallery');
    redirect('/admin/gallery');
}

export async function deleteGalleryImage(formData: FormData) {
    await requireAdmin();
    const id = formData.get('id');
    if (typeof id !== 'string') return;

    await prisma.galleryImage.delete({where: {id}});
    revalidateSite();
    revalidatePath('/admin/gallery');
}
