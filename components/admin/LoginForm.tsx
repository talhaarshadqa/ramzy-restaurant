'use client';

import {useActionState} from 'react';

import {loginAction, type LoginFormState} from '@/app/actions/auth';
import {FormField, Input} from '@/components/ui/FormField';

const initialState: LoginFormState = {status: 'idle'};

export function LoginForm() {
    const [state, formAction, isPending] = useActionState(loginAction, initialState);

    return (
        <form
            action={formAction}
            className="flex flex-col gap-4"
        >
            <FormField
                label="Email"
                htmlFor="email"
            >
                <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="username"
                />
            </FormField>
            <FormField
                label="Password"
                htmlFor="password"
            >
                <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                />
            </FormField>

            {state.status === 'error' && state.message && <p className="text-sm font-medium text-maroon">{state.message}</p>}

            <button
                type="submit"
                disabled={isPending}
                className="mt-2 rounded-full bg-maroon px-7 py-3 text-sm font-semibold text-cream transition hover:bg-maroon-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isPending ? 'Signing in…' : 'Sign In'}
            </button>
        </form>
    );
}
