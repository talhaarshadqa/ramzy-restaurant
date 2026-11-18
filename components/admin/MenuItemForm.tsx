'use client';

import {useActionState, useState} from 'react';

import type {FormState} from '@/app/actions/menu';
import type {MenuCategory, MenuItem} from '@/generated/prisma/client';

import {FormField, Input, Select, Textarea} from '@/components/ui/FormField';

const initialState: FormState = {status: 'idle'};

// Prisma's Decimal type can't cross the Server -> Client Component boundary, so callers pass
// price fields pre-converted to plain numbers (see items/[id]/edit/page.tsx).
type SerializedMenuItem = Omit<MenuItem, 'singlePrice' | 'medPrice' | 'largePrice'> & {
    singlePrice: number | null;
    medPrice: number | null;
    largePrice: number | null;
};

export function MenuItemForm({
    item,
    categories,
    defaultCategoryId,
    action,
}: {
    item?: SerializedMenuItem;
    categories: MenuCategory[];
    defaultCategoryId?: string;
    action: (prevState: FormState, formData: FormData) => Promise<FormState>;
}) {
    const [state, formAction, isPending] = useActionState(action, initialState);
    const [pricingMode, setPricingMode] = useState<'single' | 'tiered'>(item?.medPrice !== null && item?.medPrice !== undefined ? 'tiered' : 'single');
    const [isSignature, setIsSignature] = useState(item?.isSignature ?? false);

    return (
        <form
            action={formAction}
            className="flex max-w-lg flex-col gap-4"
        >
            <FormField
                label="Category"
                htmlFor="categoryId"
                error={state.errors?.categoryId}
            >
                <Select
                    id="categoryId"
                    name="categoryId"
                    defaultValue={item?.categoryId ?? defaultCategoryId}
                    required
                >
                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </Select>
            </FormField>

            <FormField
                label="Name"
                htmlFor="name"
                error={state.errors?.name}
            >
                <Input
                    id="name"
                    name="name"
                    defaultValue={item?.name}
                    required
                    maxLength={160}
                />
            </FormField>

            <FormField
                label="Description (optional)"
                htmlFor="description"
                error={state.errors?.description}
            >
                <Textarea
                    id="description"
                    name="description"
                    defaultValue={item?.description ?? ''}
                    rows={2}
                    maxLength={300}
                />
            </FormField>

            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-ink">Pricing</span>
                <div className="flex gap-5">
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="radio"
                            name="pricingMode"
                            value="single"
                            checked={pricingMode === 'single'}
                            onChange={() => setPricingMode('single')}
                        />
                        Single price
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="radio"
                            name="pricingMode"
                            value="tiered"
                            checked={pricingMode === 'tiered'}
                            onChange={() => setPricingMode('tiered')}
                        />
                        Med / Large (two prices)
                    </label>
                </div>
            </div>

            {pricingMode === 'single' ? (
                <FormField
                    label="Price (£)"
                    htmlFor="singlePrice"
                    error={state.errors?.singlePrice}
                >
                    <Input
                        id="singlePrice"
                        name="singlePrice"
                        type="number"
                        step="0.01"
                        min="0"
                        defaultValue={item?.singlePrice ? Number(item.singlePrice) : undefined}
                    />
                </FormField>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        label="Med / small price (£)"
                        htmlFor="medPrice"
                        error={state.errors?.medPrice}
                    >
                        <Input
                            id="medPrice"
                            name="medPrice"
                            type="number"
                            step="0.01"
                            min="0"
                            defaultValue={item?.medPrice ? Number(item.medPrice) : undefined}
                        />
                    </FormField>
                    <FormField
                        label="Large price (£, optional)"
                        htmlFor="largePrice"
                        error={state.errors?.largePrice}
                    >
                        <Input
                            id="largePrice"
                            name="largePrice"
                            type="number"
                            step="0.01"
                            min="0"
                            defaultValue={item?.largePrice ? Number(item.largePrice) : undefined}
                        />
                    </FormField>
                </div>
            )}

            <FormField
                label="Display order"
                htmlFor="displayOrder"
                error={state.errors?.displayOrder}
            >
                <Input
                    id="displayOrder"
                    name="displayOrder"
                    type="number"
                    defaultValue={item?.displayOrder ?? 0}
                />
            </FormField>

            <label className="flex items-center gap-2 text-sm font-semibold text-ink">
                <input
                    type="checkbox"
                    name="isAvailable"
                    defaultChecked={item?.isAvailable ?? true}
                    className="h-4 w-4"
                />
                Available on public menu
            </label>

            <label className="flex items-center gap-2 text-sm font-semibold text-ink">
                <input
                    type="checkbox"
                    name="isSignature"
                    checked={isSignature}
                    onChange={(e) => setIsSignature(e.target.checked)}
                    className="h-4 w-4"
                />
                Show in homepage &quot;Signatures&quot; section
            </label>

            {isSignature && (
                <>
                    <FormField
                        label="Signature label"
                        htmlFor="signatureLabel"
                        error={state.errors?.signatureLabel}
                        hint='e.g. "House Favourite", "Sunday Special", "Off the Grill"'
                    >
                        <Input
                            id="signatureLabel"
                            name="signatureLabel"
                            defaultValue={item?.signatureLabel ?? ''}
                            maxLength={60}
                        />
                    </FormField>
                    <FormField
                        label="Signature description"
                        htmlFor="signatureDescription"
                        error={state.errors?.signatureDescription}
                        hint="Editorial blurb shown on the homepage card (the price always pulls from this item's real price above)"
                    >
                        <Textarea
                            id="signatureDescription"
                            name="signatureDescription"
                            defaultValue={item?.signatureDescription ?? ''}
                            rows={2}
                            maxLength={300}
                        />
                    </FormField>
                    <FormField
                        label="Signature display order"
                        htmlFor="signatureOrder"
                        error={state.errors?.signatureOrder}
                    >
                        <Input
                            id="signatureOrder"
                            name="signatureOrder"
                            type="number"
                            defaultValue={item?.signatureOrder ?? 0}
                        />
                    </FormField>
                </>
            )}

            {state.status === 'error' && state.message && <p className="text-sm font-medium text-maroon">{state.message}</p>}

            <button
                type="submit"
                disabled={isPending}
                className="mt-2 w-fit rounded-full bg-maroon px-7 py-3 text-sm font-semibold text-cream disabled:opacity-60"
            >
                {isPending ? 'Saving…' : 'Save Item'}
            </button>
        </form>
    );
}
