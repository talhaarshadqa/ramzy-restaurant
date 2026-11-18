import type {ButtonHTMLAttributes, ReactNode} from 'react';

import Link from 'next/link';

type Variant = 'primary' | 'outline' | 'ghost' | 'outline-light';

const base = 'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition';

const variants: Record<Variant, string> = {
    primary: 'bg-gold text-ink hover:-translate-y-0.5 hover:shadow-float',
    outline: 'border-[1.5px] border-maroon text-maroon hover:bg-maroon hover:text-cream',
    'outline-light': 'border-[1.5px] border-cream/50 text-cream-soft hover:bg-white/10',
    ghost: 'bg-maroon text-cream hover:bg-maroon-dark',
};

type CommonProps = {
    variant?: Variant;
    className?: string;
    children: ReactNode;
};

type ButtonAsLink = CommonProps & {
    href: string;
};

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonAsLink | ButtonAsButton) {
    const {variant = 'primary', className = '', children} = props;
    const classes = `${base} ${variants[variant]} ${className}`;

    if ('href' in props) {
        return (
            <Link
                href={props.href}
                className={classes}
            >
                {children}
            </Link>
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- discarding these so only valid <button> attrs remain in buttonProps
    const {variant: _variant, className: _className, children: _children, ...buttonProps} = props as ButtonAsButton;

    return (
        <button
            className={classes}
            {...buttonProps}
        >
            {children}
        </button>
    );
}
