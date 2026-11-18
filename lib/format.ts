// Prisma Decimal fields serialize to Decimal-like objects on the server and plain strings/numbers
// once passed through to client components — accept anything with a sensible toString/Number conversion.
export function formatPrice(value: unknown): string {
    const num = Number(value);
    return `£${num.toFixed(2)}`;
}
