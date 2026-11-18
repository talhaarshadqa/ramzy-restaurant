import {getSiteSettings} from '@/lib/data/settings';

const SITE_URL = 'https://ramzyrestaurant.co.uk';

// Emits Restaurant schema.org JSON-LD so Google can show the business as a rich result
// (name, address, hours, rating, cuisine) in local search and Maps. Values come from the
// admin-editable settings, so the structured data stays in sync with the live site.
export async function StructuredData() {
    const s = await getSiteSettings();
    const postcode = s.addressLine.match(/[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}/i)?.[0];
    const telephone = s.phoneHref.replace('tel:', '');

    const data = {
        '@context': 'https://schema.org',
        '@type': 'Restaurant',
        name: s.businessName,
        description: 'Halal South Asian & Afghan-style cooking — kebabs, curries, biryani and fresh-baked naan.',
        url: SITE_URL,
        telephone,
        servesCuisine: ['Halal', 'South Asian', 'Pakistani', 'Afghan'],
        priceRange: '££',
        image: [`${SITE_URL}/images/spread.jpg`, `${SITE_URL}/images/kebab.jpg`, `${SITE_URL}/images/biryani.jpg`],
        address: {
            '@type': 'PostalAddress',
            streetAddress: s.addressLine.split(',')[0]?.trim() || s.addressLine,
            addressLocality: 'Manchester',
            addressRegion: 'Greater Manchester',
            ...(postcode ? {postalCode: postcode} : {}),
            addressCountry: 'GB',
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '11:00',
                closes: '18:00',
            },
        ],
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: s.googleRating,
            reviewCount: s.googleReviewCount,
            bestRating: 5,
        },
        acceptsReservations: 'True',
        menu: `${SITE_URL}/menu`,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
        />
    );
}
