'use client';

import {useActionState, useRef, useEffect} from 'react';

import {changeAdminPassword, type ChangePasswordFormState} from '@/app/actions/password';
import {FormField, Input} from '@/components/ui/FormField';

const initialState: ChangePasswordFormState = {status: 'idle'};

export function ChangePasswordForm() {
    const [state, formAction, isPending] = useActionState(changeAdminPassword, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.status === 'success') formRef.current?.reset();
    }, [state.status]);

    return (
        <form
            ref={formRef}
            action={formAction}
            className="flex max-w-2xl flex-col gap-6"
        >
            <fieldset className="flex flex-col gap-4 rounded-card border border-line bg-white p-6">
                <legend className="-ml-1 mb-1 px-1 text-sm font-bold uppercase tracking-wide text-maroon">Change Password</legend>

                <FormField
                    label="Current password"
                    htmlFor="currentPassword"
                    error={state.errors?.currentPassword}
                >
                    <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        autoComplete="current-password"
                        required
                    />
                </FormField>

                <FormField
                    label="New password"
                    htmlFor="newPassword"
                    error={state.errors?.newPassword}
                    hint="At least 8 characters. Use a mix of letters, numbers and a symbol."
                >
                    <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength={8}
                        maxLength={100}
                    />
                </FormField>

                <FormField
                    label="Confirm new password"
                    htmlFor="confirmPassword"
                    error={state.errors?.confirmPassword}
                >
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength={8}
                        maxLength={100}
                    />
                </FormField>
            </fieldset>

            {state.status === 'success' && <p className="text-sm font-medium text-green-700">{state.message ?? 'Password updated.'}</p>}
            {state.status === 'error' && state.message && <p className="text-sm font-medium text-maroon">{state.message}</p>}

            <button
                type="submit"
                disabled={isPending}
                className="w-fit rounded-full bg-maroon px-7 py-3 text-sm font-semibold text-cream disabled:opacity-60"
            >
                {isPending ? 'Updating…' : 'Update Password'}
            </button>
        </form>
    );
}
