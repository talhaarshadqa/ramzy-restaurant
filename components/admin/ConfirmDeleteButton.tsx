'use client';

import type {ReactNode} from 'react';

export function ConfirmDeleteButton({confirmMessage, children = 'Delete'}: {confirmMessage: string; children?: ReactNode}) {
    return (
        <button
            type="submit"
            onClick={(event) => {
                if (!window.confirm(confirmMessage)) event.preventDefault();
            }}
            className="text-xs font-semibold text-maroon hover:underline"
        >
            {children}
        </button>
    );
}
