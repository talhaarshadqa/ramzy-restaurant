import {LoginForm} from '@/components/admin/LoginForm';

export default function AdminLoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-cream px-6">
            <div className="w-full max-w-sm rounded-card bg-white p-10 shadow-float">
                <p className="mb-1 text-center font-display text-2xl font-bold text-maroon">RAMZY</p>
                <p className="mb-8 text-center text-sm text-ink-soft">Admin sign in</p>
                <LoginForm />
            </div>
        </div>
    );
}
