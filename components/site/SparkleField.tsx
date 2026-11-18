const DOTS = [
    {top: '12%', left: '8%', size: 3, opacity: 0.6},
    {top: '22%', left: '88%', size: 2, opacity: 0.5},
    {top: '35%', left: '18%', size: 2, opacity: 0.4},
    {top: '15%', left: '45%', size: 2, opacity: 0.5},
    {top: '60%', left: '92%', size: 3, opacity: 0.5},
    {top: '70%', left: '6%', size: 2, opacity: 0.45},
    {top: '48%', left: '70%', size: 2, opacity: 0.4},
    {top: '85%', left: '35%', size: 3, opacity: 0.55},
    {top: '28%', left: '60%', size: 2, opacity: 0.35},
    {top: '78%', left: '80%', size: 2, opacity: 0.45},
    {top: '5%', left: '70%', size: 2, opacity: 0.4},
    {top: '92%', left: '55%', size: 2, opacity: 0.4},
] as const;

export function SparkleField() {
    return (
        <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
        >
            {DOTS.map((dot, i) => (
                <span
                    key={i}
                    className="absolute rounded-full bg-gold-light"
                    style={{top: dot.top, left: dot.left, width: dot.size, height: dot.size, opacity: dot.opacity}}
                />
            ))}
        </div>
    );
}
