'use client';

import type {ReactNode} from 'react';

import {useActionState} from 'react';

import type {getSiteSettings} from '@/lib/data/settings';

import {updateSiteSettings, type SettingsFormState} from '@/app/actions/settings';
import {FormField, Input, Textarea} from '@/components/ui/FormField';

const initialState: SettingsFormState = {status: 'idle'};

type Settings = Awaited<ReturnType<typeof getSiteSettings>>;

function Fieldset({title, children}: {title: string; children: ReactNode}) {
    return (
        <fieldset className="flex flex-col gap-4 rounded-card border border-line bg-white p-6">
            <legend className="-ml-1 mb-1 px-1 text-sm font-bold uppercase tracking-wide text-maroon">{title}</legend>
            {children}
        </fieldset>
    );
}

export function SettingsForm({settings}: {settings: Settings}) {
    const [state, formAction, isPending] = useActionState(updateSiteSettings, initialState);

    return (
        <form
            action={formAction}
            className="flex max-w-2xl flex-col gap-6"
        >
            <Fieldset title="Hours">
                <FormField
                    label="Opening hours text"
                    htmlFor="openingHoursText"
                    error={state.errors?.openingHoursText}
                    hint='Shown across the site, e.g. "Open 7 Days a Week 11am – 6pm"'
                >
                    <Input
                        id="openingHoursText"
                        name="openingHoursText"
                        defaultValue={settings.openingHoursText}
                        required
                        maxLength={200}
                    />
                </FormField>
                <FormField
                    label="Today's status note (optional)"
                    htmlFor="todaysStatusNote"
                    hint='For one-off changes, e.g. "Closing early today for a private booking". Leave blank to clear.'
                >
                    <Input
                        id="todaysStatusNote"
                        name="todaysStatusNote"
                        defaultValue={settings.todaysStatusNote ?? ''}
                        maxLength={200}
                    />
                </FormField>
            </Fieldset>

            <Fieldset title="Business Info">
                <FormField
                    label="Business name"
                    htmlFor="businessName"
                    error={state.errors?.businessName}
                >
                    <Input
                        id="businessName"
                        name="businessName"
                        defaultValue={settings.businessName}
                        required
                        maxLength={120}
                    />
                </FormField>
                <FormField
                    label="Address"
                    htmlFor="addressLine"
                    error={state.errors?.addressLine}
                >
                    <Input
                        id="addressLine"
                        name="addressLine"
                        defaultValue={settings.addressLine}
                        required
                        maxLength={200}
                    />
                </FormField>
                <FormField
                    label="Neighbourhood"
                    htmlFor="neighbourhood"
                    error={state.errors?.neighbourhood}
                >
                    <Input
                        id="neighbourhood"
                        name="neighbourhood"
                        defaultValue={settings.neighbourhood}
                        required
                        maxLength={120}
                    />
                </FormField>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        label="Phone (display)"
                        htmlFor="phoneDisplay"
                        error={state.errors?.phoneDisplay}
                    >
                        <Input
                            id="phoneDisplay"
                            name="phoneDisplay"
                            defaultValue={settings.phoneDisplay}
                            required
                            maxLength={40}
                        />
                    </FormField>
                    <FormField
                        label="Phone (tel: link)"
                        htmlFor="phoneHref"
                        error={state.errors?.phoneHref}
                        hint="e.g. tel:+441619156242"
                    >
                        <Input
                            id="phoneHref"
                            name="phoneHref"
                            defaultValue={settings.phoneHref}
                            required
                            maxLength={60}
                        />
                    </FormField>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        label="Mobile (display)"
                        htmlFor="mobileDisplay"
                        error={state.errors?.mobileDisplay}
                    >
                        <Input
                            id="mobileDisplay"
                            name="mobileDisplay"
                            defaultValue={settings.mobileDisplay}
                            required
                            maxLength={40}
                        />
                    </FormField>
                    <FormField
                        label="Mobile (tel: link)"
                        htmlFor="mobileHref"
                        error={state.errors?.mobileHref}
                    >
                        <Input
                            id="mobileHref"
                            name="mobileHref"
                            defaultValue={settings.mobileHref}
                            required
                            maxLength={60}
                        />
                    </FormField>
                </div>
                <FormField
                    label="Facebook handle"
                    htmlFor="facebookHandle"
                    error={state.errors?.facebookHandle}
                >
                    <Input
                        id="facebookHandle"
                        name="facebookHandle"
                        defaultValue={settings.facebookHandle}
                        required
                        maxLength={120}
                    />
                </FormField>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        label="Google rating"
                        htmlFor="googleRating"
                        error={state.errors?.googleRating}
                    >
                        <Input
                            id="googleRating"
                            name="googleRating"
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            defaultValue={settings.googleRating}
                            required
                        />
                    </FormField>
                    <FormField
                        label="Google review count"
                        htmlFor="googleReviewCount"
                        error={state.errors?.googleReviewCount}
                    >
                        <Input
                            id="googleReviewCount"
                            name="googleReviewCount"
                            type="number"
                            min="0"
                            defaultValue={settings.googleReviewCount}
                            required
                        />
                    </FormField>
                </div>
                <FormField
                    label="Price range"
                    htmlFor="priceRange"
                    error={state.errors?.priceRange}
                    hint="e.g. £10–20 per person"
                >
                    <Input
                        id="priceRange"
                        name="priceRange"
                        defaultValue={settings.priceRange}
                        required
                        maxLength={60}
                    />
                </FormField>
            </Fieldset>

            <Fieldset title="Reservation Email Notifications">
                <FormField
                    label="Owner notification email"
                    htmlFor="ownerNotificationEmail"
                    error={state.errors?.ownerNotificationEmail}
                    hint="New reservation requests will be emailed here. Leave blank to disable owner notifications."
                >
                    <Input
                        id="ownerNotificationEmail"
                        name="ownerNotificationEmail"
                        type="email"
                        defaultValue={settings.ownerNotificationEmail ?? ''}
                        maxLength={200}
                    />
                </FormField>
            </Fieldset>

            <Fieldset title="Hero Section">
                <FormField
                    label="Eyebrow text"
                    htmlFor="heroEyebrow"
                    error={state.errors?.heroEyebrow}
                >
                    <Input
                        id="heroEyebrow"
                        name="heroEyebrow"
                        defaultValue={settings.heroEyebrow}
                        required
                        maxLength={120}
                    />
                </FormField>
                <FormField
                    label="Tagline"
                    htmlFor="heroTagline"
                    error={state.errors?.heroTagline}
                >
                    <Textarea
                        id="heroTagline"
                        name="heroTagline"
                        defaultValue={settings.heroTagline}
                        rows={2}
                        required
                        maxLength={400}
                    />
                </FormField>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        label="Badge 1"
                        htmlFor="heroBadge1"
                        error={state.errors?.heroBadge1}
                    >
                        <Input
                            id="heroBadge1"
                            name="heroBadge1"
                            defaultValue={settings.heroBadge1}
                            required
                            maxLength={60}
                        />
                    </FormField>
                    <FormField
                        label="Badge 2"
                        htmlFor="heroBadge2"
                        error={state.errors?.heroBadge2}
                    >
                        <Input
                            id="heroBadge2"
                            name="heroBadge2"
                            defaultValue={settings.heroBadge2}
                            required
                            maxLength={60}
                        />
                    </FormField>
                </div>
            </Fieldset>

            <Fieldset title='Story Section ("What is Ramzy?")'>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        label="Heading"
                        htmlFor="storyHeading"
                        error={state.errors?.storyHeading}
                    >
                        <Input
                            id="storyHeading"
                            name="storyHeading"
                            defaultValue={settings.storyHeading}
                            required
                            maxLength={120}
                        />
                    </FormField>
                    <FormField
                        label="Heading accent (italic)"
                        htmlFor="storyHeadingAccent"
                        error={state.errors?.storyHeadingAccent}
                    >
                        <Input
                            id="storyHeadingAccent"
                            name="storyHeadingAccent"
                            defaultValue={settings.storyHeadingAccent}
                            required
                            maxLength={120}
                        />
                    </FormField>
                </div>
                <FormField
                    label="Paragraph"
                    htmlFor="storyParagraph"
                    error={state.errors?.storyParagraph}
                >
                    <Textarea
                        id="storyParagraph"
                        name="storyParagraph"
                        defaultValue={settings.storyParagraph}
                        rows={4}
                        required
                        maxLength={1000}
                    />
                </FormField>
                <FormField
                    label="Pull-quote"
                    htmlFor="storyQuote"
                    error={state.errors?.storyQuote}
                >
                    <Textarea
                        id="storyQuote"
                        name="storyQuote"
                        defaultValue={settings.storyQuote}
                        rows={3}
                        required
                        maxLength={500}
                    />
                </FormField>
            </Fieldset>

            <Fieldset title="Masterpieces Section">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        label="Heading"
                        htmlFor="masterpiecesHeading"
                        error={state.errors?.masterpiecesHeading}
                    >
                        <Input
                            id="masterpiecesHeading"
                            name="masterpiecesHeading"
                            defaultValue={settings.masterpiecesHeading}
                            required
                            maxLength={120}
                        />
                    </FormField>
                    <FormField
                        label="Heading accent (italic)"
                        htmlFor="masterpiecesHeadingAccent"
                        error={state.errors?.masterpiecesHeadingAccent}
                    >
                        <Input
                            id="masterpiecesHeadingAccent"
                            name="masterpiecesHeadingAccent"
                            defaultValue={settings.masterpiecesHeadingAccent}
                            required
                            maxLength={120}
                        />
                    </FormField>
                </div>
                <p className="text-xs text-ink-soft">The scrolling photos themselves are managed in Photos → Masterpieces Scrolling Row.</p>
            </Fieldset>

            <Fieldset title="Cuisine Categories Section">
                <FormField
                    label="Heading"
                    htmlFor="cuisineHeading"
                    error={state.errors?.cuisineHeading}
                >
                    <Input
                        id="cuisineHeading"
                        name="cuisineHeading"
                        defaultValue={settings.cuisineHeading}
                        required
                        maxLength={160}
                    />
                </FormField>
                <FormField
                    label="Subheading"
                    htmlFor="cuisineSubheading"
                    error={state.errors?.cuisineSubheading}
                >
                    <Textarea
                        id="cuisineSubheading"
                        name="cuisineSubheading"
                        defaultValue={settings.cuisineSubheading}
                        rows={2}
                        required
                        maxLength={400}
                    />
                </FormField>
                <p className="text-xs text-ink-soft">The category tiles themselves (and their taglines) are managed per-category in Menu → Categories.</p>
            </Fieldset>

            <Fieldset title="Signature Dishes Section">
                <FormField
                    label="Subheading"
                    htmlFor="signatureSubheading"
                    error={state.errors?.signatureSubheading}
                >
                    <Textarea
                        id="signatureSubheading"
                        name="signatureSubheading"
                        defaultValue={settings.signatureSubheading}
                        rows={2}
                        required
                        maxLength={300}
                    />
                </FormField>
                <p className="text-xs text-ink-soft">Which dishes appear here is managed per-item in Menu → Items (mark an item as a &quot;Signature&quot;).</p>
            </Fieldset>

            <Fieldset title="Room Section">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        label="Heading"
                        htmlFor="roomHeading"
                        error={state.errors?.roomHeading}
                    >
                        <Input
                            id="roomHeading"
                            name="roomHeading"
                            defaultValue={settings.roomHeading}
                            required
                            maxLength={120}
                        />
                    </FormField>
                    <FormField
                        label="Heading accent (italic)"
                        htmlFor="roomHeadingAccent"
                        error={state.errors?.roomHeadingAccent}
                    >
                        <Input
                            id="roomHeadingAccent"
                            name="roomHeadingAccent"
                            defaultValue={settings.roomHeadingAccent}
                            required
                            maxLength={120}
                        />
                    </FormField>
                </div>
                <FormField
                    label="Paragraph 1"
                    htmlFor="roomParagraph1"
                    error={state.errors?.roomParagraph1}
                >
                    <Textarea
                        id="roomParagraph1"
                        name="roomParagraph1"
                        defaultValue={settings.roomParagraph1}
                        rows={3}
                        required
                        maxLength={600}
                    />
                </FormField>
                <FormField
                    label="Paragraph 2"
                    htmlFor="roomParagraph2"
                    error={state.errors?.roomParagraph2}
                >
                    <Textarea
                        id="roomParagraph2"
                        name="roomParagraph2"
                        defaultValue={settings.roomParagraph2}
                        rows={3}
                        required
                        maxLength={600}
                    />
                </FormField>
                <p className="text-xs text-ink-soft">The photo is managed in Photos → Room Section Photo.</p>
            </Fieldset>

            <Fieldset title='Stats Section ("The Tale So Far")'>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        label="Dishes stat value"
                        htmlFor="statDishesValue"
                        error={state.errors?.statDishesValue}
                    >
                        <Input
                            id="statDishesValue"
                            name="statDishesValue"
                            defaultValue={settings.statDishesValue}
                            required
                            maxLength={20}
                        />
                    </FormField>
                    <FormField
                        label="Dishes stat label"
                        htmlFor="statDishesLabel"
                        error={state.errors?.statDishesLabel}
                    >
                        <Input
                            id="statDishesLabel"
                            name="statDishesLabel"
                            defaultValue={settings.statDishesLabel}
                            required
                            maxLength={60}
                        />
                    </FormField>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        label="Halal stat value"
                        htmlFor="statHalalValue"
                        error={state.errors?.statHalalValue}
                    >
                        <Input
                            id="statHalalValue"
                            name="statHalalValue"
                            defaultValue={settings.statHalalValue}
                            required
                            maxLength={20}
                        />
                    </FormField>
                    <FormField
                        label="Halal stat label"
                        htmlFor="statHalalLabel"
                        error={state.errors?.statHalalLabel}
                    >
                        <Input
                            id="statHalalLabel"
                            name="statHalalLabel"
                            defaultValue={settings.statHalalLabel}
                            required
                            maxLength={60}
                        />
                    </FormField>
                </div>
            </Fieldset>

            {state.status === 'success' && <p className="text-sm font-medium text-green-700">Saved.</p>}
            {state.status === 'error' && state.message && <p className="text-sm font-medium text-maroon">{state.message}</p>}

            <button
                type="submit"
                disabled={isPending}
                className="w-fit rounded-full bg-maroon px-7 py-3 text-sm font-semibold text-cream disabled:opacity-60"
            >
                {isPending ? 'Saving…' : 'Save Settings'}
            </button>
        </form>
    );
}
