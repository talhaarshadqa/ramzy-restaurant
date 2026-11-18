'use server';

import {AuthError} from 'next-auth';
import {redirect} from 'next/navigation';

import {signIn, signOut} from '@/auth';

export type LoginFormState = {
    status: 'idle' | 'error';
    message?: string;
};

export async function logoutAction() {
    await signOut({redirectTo: '/admin/login'});
}

export async function loginAction(_prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        await signIn('credentials', {
            email,
            password,
            redirect: false,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            return {status: 'error', message: 'Incorrect email or password.'};
        }
        throw error;
    }

    redirect('/admin');
}
