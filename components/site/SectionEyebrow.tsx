export function SectionEyebrow({children, tone = 'gold'}: {children: string; tone?: 'gold' | 'cream'}) {
    const color = tone === 'gold' ? 'text-gold' : 'text-gold-light';
    const line = tone === 'gold' ? 'bg-gold/40' : 'bg-gold-light/40';

    return (
        <div className="mb-5 flex items-center justify-center gap-4">
            <span className={`h-px w-10 ${line}`} />
            <span className={`text-xs font-bold uppercase tracking-[0.25em] ${color}`}>{children}</span>
            <span className={`h-px w-10 ${line}`} />
        </div>
    );
}
