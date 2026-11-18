import type {ReactNode} from 'react';

export function FormField({label, htmlFor, error, children, hint}: {label: string; htmlFor: string; error?: string; hint?: string; children: ReactNode}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label
                htmlFor={htmlFor}
                className="text-sm font-semibold text-ink"
            >
                {label}
            </label>
            {children}
            {hint && !error && <p className="text-xs text-ink-soft">{hint}</p>}
            {error && <p className="text-xs font-medium text-maroon">{error}</p>}
        </div>
    );
}

const fieldClasses =
    'w-full rounded-lg border border-line bg-cream-soft px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20';

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`${fieldClasses} ${props.className ?? ''}`}
        />
    );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            className={`${fieldClasses} ${props.className ?? ''}`}
        />
    );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select
            {...props}
            className={`${fieldClasses} ${props.className ?? ''}`}
        />
    );
}
