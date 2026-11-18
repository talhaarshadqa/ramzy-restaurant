import type {HTMLAttributes, ReactNode} from 'react';

type Props = HTMLAttributes<HTMLDivElement> & {children: ReactNode};

export function Card({children, className = '', ...rest}: Props) {
    return (
        <div
            className={`rounded-card bg-white shadow-card ${className}`}
            {...rest}
        >
            {children}
        </div>
    );
}
