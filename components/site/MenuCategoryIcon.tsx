import type {ReactNode} from 'react';

const ICONS: Record<string, ReactNode> = {
    starters: (
        <>
            <circle
                cx="6"
                cy="7"
                r="1.6"
            />
            <circle
                cx="12"
                cy="7"
                r="1.6"
            />
            <circle
                cx="18"
                cy="7"
                r="1.6"
            />
            <path d="M4 17c2-3 4-3 8-3s6 0 8 3" />
        </>
    ),
    'main-dishes': (
        <>
            <path d="M3 10h18l-1.5 8.5a2 2 0 0 1-2 1.5H6.5a2 2 0 0 1-2-1.5L3 10Z" />
            <path d="M8 10c0-3 1-5 1-5M12 10c0-4 1.5-6 1.5-6M16 10c0-3 1-5 1-5" />
        </>
    ),
    kebabs: (
        <>
            <path d="M3 21 21 3" />
            <circle
                cx="7"
                cy="17"
                r="1.6"
            />
            <circle
                cx="12"
                cy="12"
                r="1.6"
            />
            <circle
                cx="17"
                cy="7"
                r="1.6"
            />
        </>
    ),
    burgers: (
        <>
            <path d="M4 11c0-3.5 3.6-6 8-6s8 2.5 8 6" />
            <rect
                x="3"
                y="11"
                width="18"
                height="3"
                rx="1.5"
            />
            <path d="M4 17h16" />
            <rect
                x="3"
                y="14.2"
                width="18"
                height="2.4"
                rx="1.2"
            />
        </>
    ),
    'others-naans': (
        <>
            <ellipse
                cx="12"
                cy="12"
                rx="9"
                ry="6"
                fill="none"
            />
            <circle
                cx="9"
                cy="11"
                r="0.8"
                fill="currentColor"
                stroke="none"
            />
            <circle
                cx="15"
                cy="11"
                r="0.8"
                fill="currentColor"
                stroke="none"
            />
            <circle
                cx="12"
                cy="14"
                r="0.8"
                fill="currentColor"
                stroke="none"
            />
        </>
    ),
    drinks: (
        <>
            <path d="M6 3h12l-1.2 15a2 2 0 0 1-2 1.8h-5.6a2 2 0 0 1-2-1.8L6 3Z" />
            <path d="M5 8h14" />
        </>
    ),
    sweets: <path d="M12 2.5l2.7 5.9 6.3.7-4.7 4.4 1.3 6.3-5.6-3.2-5.6 3.2 1.3-6.3-4.7-4.4 6.3-.7Z" />,
};

const DEFAULT_ICON = ICONS.sweets;

export function MenuCategoryIcon({slug, color = '#6E1E2B'}: {slug: string; color?: string}) {
    return (
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold/15">
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            >
                {ICONS[slug] ?? DEFAULT_ICON}
            </svg>
        </span>
    );
}
