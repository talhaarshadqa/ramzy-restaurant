// Business details (name, address, contact, hours, hero/story/room copy, etc.) are admin-editable
// via /admin/settings — see lib/data/settings.ts getSiteSettings(). Nothing business-related is
// hardcoded here anymore.

// Category slugs that use the medPrice/largePrice fields for something other than "Med/Lrg"
// (Burgers = Single/Meal, Others & Naans' "Chips" row = Small/Large). Keeps the schema simple
// (reuse two price columns) while keeping the public-facing label accurate.
export const PRICE_UNIT_LABELS: Record<string, {withTwoPrices: string}> = {
    'main-dishes': {withTwoPrices: 'Med / Lrg'},
    kebabs: {withTwoPrices: 'Med / Lrg'},
    'sunday-special': {withTwoPrices: 'Med / Lrg'},
    burgers: {withTwoPrices: 'Single / Meal'},
    'others-naans': {withTwoPrices: 'Small / Large'},
};
