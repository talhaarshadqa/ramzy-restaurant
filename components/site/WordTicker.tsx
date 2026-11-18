const WORDS = ['Halal', 'Spice', 'Tradition', 'Hospitality', 'Craft', 'Family', 'Gathering', 'Celebration'];

function WordRow() {
    return (
        <div className="flex flex-shrink-0 items-center">
            {WORDS.map((word) => (
                <span
                    key={word}
                    className="flex items-center"
                >
                    <span className="px-6 font-display text-2xl font-semibold tracking-wide text-cream/90 md:text-3xl">{word}</span>
                    <span className="text-xl text-gold">✦</span>
                </span>
            ))}
        </div>
    );
}

export function WordTicker() {
    return (
        <div className="overflow-hidden border-y border-cream/10 bg-noir py-6">
            <div className="flex w-max animate-marquee">
                <WordRow />
                <WordRow />
            </div>
        </div>
    );
}
