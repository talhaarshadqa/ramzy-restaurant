'use server';

import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';

import {prisma} from '@/lib/prisma';
import {requireAdmin} from '@/lib/require-admin';
import {categorySchema, menuItemSchema, type MenuItemFormValues} from '@/lib/validation/menu';

export type FormState = {
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

function revalidatePublicMenu() {
    revalidatePath('/');
    revalidatePath('/menu');
}

// --- Categories ---------------------------------------------------------

export async function createCategory(_prevState: FormState, formData: FormData): Promise<FormState> {
    await requireAdmin();

    const parsed = categorySchema.safeParse({
        name: formData.get('name'),
        slug: formData.get('slug'),
        icon: formData.get('icon') || undefined,
        isHighlighted: formData.get('isHighlighted') === 'on',
        tagline: formData.get('tagline') || undefined,
        isFeaturedOnHome: formData.get('isFeaturedOnHome') === 'on',
        displayOrder: formData.get('displayOrder') || 0,
    });

    if (!parsed.success) {
        return {status: 'error', errors: zodErrorsToFieldMap(parsed.error), message: 'Please check the form.'};
    }

    const existing = await prisma.menuCategory.findUnique({where: {slug: parsed.data.slug}});
    if (existing) {
        return {status: 'error', errors: {slug: 'That slug is already in use'}, message: 'Please check the form.'};
    }

    await prisma.menuCategory.create({data: {...parsed.data, tagline: parsed.data.tagline || null}});
    revalidatePublicMenu();
    revalidatePath('/admin/menu');
    redirect('/admin/menu');
}

export async function updateCategory(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
    await requireAdmin();

    const parsed = categorySchema.safeParse({
        name: formData.get('name'),
        slug: formData.get('slug'),
        icon: formData.get('icon') || undefined,
        isHighlighted: formData.get('isHighlighted') === 'on',
        tagline: formData.get('tagline') || undefined,
        isFeaturedOnHome: formData.get('isFeaturedOnHome') === 'on',
        displayOrder: formData.get('displayOrder') || 0,
    });

    if (!parsed.success) {
        return {status: 'error', errors: zodErrorsToFieldMap(parsed.error), message: 'Please check the form.'};
    }

    const existing = await prisma.menuCategory.findUnique({where: {slug: parsed.data.slug}});
    if (existing && existing.id !== id) {
        return {status: 'error', errors: {slug: 'That slug is already in use'}, message: 'Please check the form.'};
    }

    await prisma.menuCategory.update({where: {id}, data: {...parsed.data, tagline: parsed.data.tagline || null}});
    revalidatePublicMenu();
    revalidatePath('/admin/menu');
    redirect('/admin/menu');
}

export async function deleteCategory(formData: FormData) {
    await requireAdmin();
    const id = formData.get('id');
    if (typeof id !== 'string') return;

    await prisma.menuCategory.delete({where: {id}});
    revalidatePublicMenu();
    revalidatePath('/admin/menu');
}

// --- Menu items -----------------------------------------------------------

function buildItemData(parsed: MenuItemFormValues) {
    return {
        categoryId: parsed.categoryId,
        name: parsed.name,
        description: parsed.description || null,
        singlePrice: parsed.pricingMode === 'single' ? parsed.singlePrice : null,
        medPrice: parsed.pricingMode === 'tiered' ? parsed.medPrice : null,
        largePrice: parsed.pricingMode === 'tiered' ? (parsed.largePrice ?? null) : null,
        displayOrder: parsed.displayOrder ?? 0,
        isAvailable: parsed.isAvailable ?? true,
        isSignature: parsed.isSignature ?? false,
        signatureLabel: parsed.signatureLabel || null,
        signatureDescription: parsed.signatureDescription || null,
        signatureOrder: parsed.signatureOrder ?? 0,
    };
}

export async function createMenuItem(_prevState: FormState, formData: FormData): Promise<FormState> {
    await requireAdmin();

    const parsed = menuItemSchema.safeParse({
        categoryId: formData.get('categoryId'),
        name: formData.get('name'),
        description: formData.get('description') || undefined,
        pricingMode: formData.get('pricingMode'),
        singlePrice: formData.get('singlePrice') || undefined,
        medPrice: formData.get('medPrice') || undefined,
        largePrice: formData.get('largePrice') || undefined,
        displayOrder: formData.get('displayOrder') || 0,
        isAvailable: formData.get('isAvailable') === 'on',
        isSignature: formData.get('isSignature') === 'on',
        signatureLabel: formData.get('signatureLabel') || undefined,
        signatureDescription: formData.get('signatureDescription') || undefined,
        signatureOrder: formData.get('signatureOrder') || 0,
    });

    if (!parsed.success) {
        return {status: 'error', errors: zodErrorsToFieldMap(parsed.error), message: 'Please check the form.'};
    }

    await prisma.menuItem.create({data: buildItemData(parsed.data)});
    revalidatePublicMenu();
    revalidatePath('/admin/menu');
    redirect('/admin/menu');
}

export async function updateMenuItem(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
    await requireAdmin();

    const parsed = menuItemSchema.safeParse({
        categoryId: formData.get('categoryId'),
        name: formData.get('name'),
        description: formData.get('description') || undefined,
        pricingMode: formData.get('pricingMode'),
        singlePrice: formData.get('singlePrice') || undefined,
        medPrice: formData.get('medPrice') || undefined,
        largePrice: formData.get('largePrice') || undefined,
        displayOrder: formData.get('displayOrder') || 0,
        isAvailable: formData.get('isAvailable') === 'on',
        isSignature: formData.get('isSignature') === 'on',
        signatureLabel: formData.get('signatureLabel') || undefined,
        signatureDescription: formData.get('signatureDescription') || undefined,
        signatureOrder: formData.get('signatureOrder') || 0,
    });

    if (!parsed.success) {
        return {status: 'error', errors: zodErrorsToFieldMap(parsed.error), message: 'Please check the form.'};
    }

    await prisma.menuItem.update({where: {id}, data: buildItemData(parsed.data)});
    revalidatePublicMenu();
    revalidatePath('/admin/menu');
    redirect('/admin/menu');
}

export async function deleteMenuItem(formData: FormData) {
    await requireAdmin();
    const id = formData.get('id');
    if (typeof id !== 'string') return;

    await prisma.menuItem.delete({where: {id}});
    revalidatePublicMenu();
    revalidatePath('/admin/menu');
}

export async function toggleItemAvailability(formData: FormData) {
    await requireAdmin();
    const id = formData.get('id');
    const nextValue = formData.get('nextValue');
    if (typeof id !== 'string' || typeof nextValue !== 'string') return;

    await prisma.menuItem.update({where: {id}, data: {isAvailable: nextValue === 'true'}});
    revalidatePublicMenu();
    revalidatePath('/admin/menu');
}
