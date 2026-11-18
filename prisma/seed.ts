import 'dotenv/config';
import {PrismaPg} from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

import {PrismaClient} from '../generated/prisma/client';

const adapter = new PrismaPg({connectionString: process.env.DATABASE_URL});
const prisma = new PrismaClient({adapter});

type SeedItem = {
    name: string;
    description?: string;
    singlePrice?: number;
    medPrice?: number;
    largePrice?: number;
    signatureLabel?: string;
    signatureDescription?: string;
    signatureOrder?: number;
};

type SeedCategory = {
    name: string;
    slug: string;
    isHighlighted?: boolean;
    tagline?: string;
    isFeaturedOnHome?: boolean;
    items: SeedItem[];
};

// Real menu data transcribed from Ramzy Restaurant's printed menu boards.
const categories: SeedCategory[] = [
    {
        name: 'Starters',
        slug: 'starters',
        tagline: 'Small plates to begin the meal.',
        isFeaturedOnHome: true,
        items: [
            {name: 'Meat Samosa', singlePrice: 1.0},
            {name: 'Chicken Samosa', singlePrice: 1.0},
            {name: 'Veggie Samosa', singlePrice: 1.0},
            {name: 'Fresh Salad', singlePrice: 0.8},
            {name: 'Chicken Leg', singlePrice: 2.5},
        ],
    },
    {
        name: 'Main Dishes',
        slug: 'main-dishes',
        tagline: 'Slow-simmered curries and fragrant basmati.',
        isFeaturedOnHome: true,
        items: [
            {
                name: 'Qabuli Pilau',
                medPrice: 7.0,
                largePrice: 8.0,
                signatureLabel: 'House Favourite',
                signatureDescription: 'Fragrant basmati rice, hand-layered with tender spiced meat and caramelised carrot.',
                signatureOrder: 0,
            },
            {
                name: 'Nahari',
                medPrice: 10.0,
                largePrice: 12.0,
                signatureLabel: 'Sunday Special',
                signatureDescription: 'Slow-simmered overnight until the meat falls from the bone — served Sundays only.',
                signatureOrder: 1,
            },
            // Single-priced exception inside an otherwise Med/Lrg category — matches the real menu board.
            {name: 'Curry on Rice (Any)', singlePrice: 8.0},
            {name: 'Curry Pakora', medPrice: 6.0, largePrice: 8.0},
            {name: 'Lamb Curry', medPrice: 9.0, largePrice: 11.0},
            {name: 'Lamb Chops Curry', medPrice: 9.6, largePrice: 11.5},
            {name: 'Chicken Curry', medPrice: 7.0, largePrice: 9.0},
            {name: 'Mince Peas', medPrice: 7.0, largePrice: 9.0},
            {name: 'Chicken Mince', medPrice: 7.0, largePrice: 9.0},
            {name: 'Aloo Gobi', medPrice: 6.0, largePrice: 8.0},
            {name: 'Aubergine', medPrice: 6.0, largePrice: 8.0},
            {name: 'Spinach', medPrice: 6.0, largePrice: 8.0},
            {name: 'Cauliflower', medPrice: 6.0, largePrice: 8.0},
            {name: 'Okra', medPrice: 6.0, largePrice: 8.0},
            {name: 'Mix Vegetables', medPrice: 6.0, largePrice: 8.0},
            {name: 'Chick Peas', medPrice: 6.0, largePrice: 8.0},
            {name: 'Lentils (Dal)', medPrice: 6.0, largePrice: 8.0},
            {name: 'Red Beans', medPrice: 6.0, largePrice: 8.0},
            {
                name: 'Chicken Biryani',
                medPrice: 7.0,
                largePrice: 8.0,
                signatureLabel: 'Ramzy Classic',
                signatureDescription: 'Basmati rice sealed and slow-cooked with saffron and spiced chicken.',
                signatureOrder: 3,
            },
            {
                name: 'Zerishk Pilau',
                medPrice: 7.0,
                largePrice: 8.5,
                signatureLabel: "Chef's Signature",
                signatureDescription: 'Fragrant basmati rice with a jewelled fruit-and-nut topping.',
                signatureOrder: 5,
            },
            {name: 'Plain Rice', medPrice: 2.0, largePrice: 3.0},
        ],
    },
    {
        name: 'Kebabs',
        slug: 'kebabs',
        tagline: 'Smoky, char-grilled, straight off the skewer.',
        isFeaturedOnHome: true,
        items: [
            {name: 'Lamb Doner', medPrice: 5.0, largePrice: 6.0},
            {name: 'Lamb Doner & Chips', medPrice: 5.0, largePrice: 6.0},
            {name: 'Chicken Doner', medPrice: 5.0, largePrice: 6.0},
            {name: 'Chicken Shawarma', medPrice: 6.0, largePrice: 8.0},
            {
                name: 'Lamb Seekh Kebab',
                medPrice: 7.0,
                largePrice: 8.5,
                signatureLabel: 'Off the Grill',
                signatureDescription: 'Hand-minced lamb, char-grilled and seasoned with warm, smoky spice.',
                signatureOrder: 2,
            },
            {name: 'Chicken Seekh Kebab', medPrice: 7.0, largePrice: 8.0},
            {name: 'Lamb Chops', medPrice: 8.0, largePrice: 9.0},
            {name: 'Mix Doner', description: 'Lamb doner & chicken shawarma', medPrice: 6.0, largePrice: 8.0},
            {
                name: 'Special Mixed',
                description: 'Chicken tikka & seekh kebab',
                medPrice: 9.0,
                largePrice: 10.5,
                signatureLabel: 'To Share',
                signatureDescription: 'Chicken tikka and seekh kebab, char-grilled and ready for the table.',
                signatureOrder: 4,
            },
            // Single-priced exception inside an otherwise Med/Lrg category.
            {name: 'Doner Roll & Nan', singlePrice: 5.0},
        ],
    },
    {
        name: 'Burgers',
        slug: 'burgers',
        items: [
            // This category's two price tiers are Single/Meal, not Med/Lrg — the medPrice/largePrice
            // fields are reused for that (see PRICE_UNIT_LABELS in components/site/MenuSection).
            {name: 'Cheese Burger', medPrice: 3.0, largePrice: 4.99},
            {name: 'Chicken Burger', medPrice: 3.0, largePrice: 4.99},
            {name: 'Veggie Burger', medPrice: 3.0, largePrice: 4.99},
            {name: 'Fish Burger', medPrice: 3.0, largePrice: 4.99},
        ],
    },
    {
        name: 'Others & Naans',
        slug: 'others-naans',
        tagline: 'Fresh-baked naan, straight from the oven.',
        isFeaturedOnHome: true,
        items: [
            {name: 'Fish', singlePrice: 5.0},
            {name: 'Fish & Chips', singlePrice: 6.0},
            {name: 'Chips & Cheese', singlePrice: 2.5},
            // Small/Large tier reusing medPrice/largePrice, same reasoning as Burgers above.
            {name: 'Chips', medPrice: 1.6, largePrice: 2.0},
            {name: 'Onion Rings (5) & Chips', singlePrice: 2.0},
            {name: 'Chicken Nuggets (5) & Chips', singlePrice: 2.5},
            {name: 'Nan', singlePrice: 0.8},
            {name: 'Roti / Chapati', singlePrice: 0.6},
            {name: 'Garlic Nan', singlePrice: 1.5},
            {name: 'Garlic Cheese Nan', singlePrice: 3.0},
            {name: 'Cheese Nan', singlePrice: 2.5},
        ],
    },
    {
        name: 'Drinks',
        slug: 'drinks',
        tagline: 'Chai, coffee, and something cold to finish.',
        isFeaturedOnHome: true,
        items: [
            {name: 'English Tea', singlePrice: 1.0},
            {name: 'Desi Tea', singlePrice: 1.0},
            {name: 'Green Tea', singlePrice: 1.0},
            {name: 'Coffee', singlePrice: 1.0},
            {name: 'Hot Chocolate', singlePrice: 1.5},
            {name: 'Orange Juice', singlePrice: 2.8},
            {name: 'Cans', singlePrice: 1.2},
            {name: 'Bottles', singlePrice: 1.6},
        ],
    },
    {
        name: 'Sweets',
        slug: 'sweets',
        tagline: 'Rich, warm, and worth saving room for.',
        isFeaturedOnHome: true,
        items: [
            {name: 'Mantoo', singlePrice: 8.0},
            {name: 'Firni', singlePrice: 2.0},
            {name: 'Sweet Rice', singlePrice: 2.0},
        ],
    },
    {
        name: 'Meal Deals',
        slug: 'meal-deals',
        isHighlighted: true,
        items: [
            {name: 'Fish & Chips', singlePrice: 7.0},
            {name: 'Any 3 Curries (on rice)', singlePrice: 7.0},
            {name: 'Burger Meal', singlePrice: 5.0},
            {name: 'Seekh Kebab (on naan)', singlePrice: 6.0},
        ],
    },
    {
        name: 'Sunday Special',
        slug: 'sunday-special',
        isHighlighted: true,
        items: [{name: 'Nahari', medPrice: 8.0, largePrice: 10.0}],
    },
];

async function main() {
    const adminEmail = process.env.SEED_ADMIN_EMAIL;
    const adminPassword = process.env.SEED_ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
        console.warn(
            '⚠️  SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD not set — falling back to a dev-only admin login. ' +
                'Set these in .env and re-run `npx prisma db seed` before giving this to a client.',
        );
    }

    const email = adminEmail ?? 'admin@example.com';
    const password = adminPassword ?? 'dev-only-password';
    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.adminUser.upsert({
        where: {email},
        update: {passwordHash},
        create: {email, passwordHash, name: 'Ramzy Admin'},
    });
    console.log(`✓ Admin user ready: ${email}`);

    // Hours are editable via /admin/settings specifically because of an unresolved discrepancy:
    // the printed menu card says "Open 7 Days a Week 11am – 6pm" (used as the seed default below),
    // but the live Google Business listing showed "Closes 7pm" on the day this was checked.
    // The owner should confirm the real hours and update this via the admin settings page.
    await prisma.siteSettings.upsert({
        where: {id: 'singleton'},
        update: {},
        create: {
            id: 'singleton',
            openingHoursText: 'Open 7 Days a Week 11am – 6pm',
            todaysStatusNote: null,
        },
    });
    console.log('✓ Site settings ready');

    for (let categoryIndex = 0; categoryIndex < categories.length; categoryIndex++) {
        const category = categories[categoryIndex];

        const categoryRecord = await prisma.menuCategory.upsert({
            where: {slug: category.slug},
            update: {
                name: category.name,
                isHighlighted: category.isHighlighted ?? false,
                tagline: category.tagline ?? null,
                isFeaturedOnHome: category.isFeaturedOnHome ?? false,
                displayOrder: categoryIndex,
            },
            create: {
                name: category.name,
                slug: category.slug,
                isHighlighted: category.isHighlighted ?? false,
                tagline: category.tagline ?? null,
                isFeaturedOnHome: category.isFeaturedOnHome ?? false,
                displayOrder: categoryIndex,
            },
        });

        for (let itemIndex = 0; itemIndex < category.items.length; itemIndex++) {
            const item = category.items[itemIndex];
            const existing = await prisma.menuItem.findFirst({
                where: {categoryId: categoryRecord.id, name: item.name},
            });

            const data = {
                categoryId: categoryRecord.id,
                name: item.name,
                description: item.description ?? null,
                singlePrice: item.singlePrice ?? null,
                medPrice: item.medPrice ?? null,
                largePrice: item.largePrice ?? null,
                displayOrder: itemIndex,
                isAvailable: true,
                isSignature: item.signatureLabel !== undefined,
                signatureLabel: item.signatureLabel ?? null,
                signatureDescription: item.signatureDescription ?? null,
                signatureOrder: item.signatureOrder ?? 0,
            };

            if (existing) {
                await prisma.menuItem.update({where: {id: existing.id}, data});
            } else {
                await prisma.menuItem.create({data});
            }
        }

        console.log(`✓ ${category.name} (${category.items.length} items)`);
    }

    const blogPosts = [
        {
            title: 'Welcome to Ramzy Restaurant',
            slug: 'welcome-to-ramzy-restaurant',
            excerpt: "We're delighted to bring halal South Asian cooking to Bury New Road — here's a little about what to expect.",
            coverImage: '/images/interior.jpg',
            content:
                "Ramzy Restaurant is now open on Bury New Road, Cheetham Hill — and we couldn't be happier to welcome you in.\n\nOur kitchen serves hearty, halal South Asian and Afghan-style cooking: hand-pressed kebabs straight off the grill, slow-simmered curries, fragrant Qabuli Pilau, and fresh-baked naan made throughout the day.\n\nWhether you're after a quick bite on your way through, a family dinner, or you're planning catering for a celebration, our table is open seven days a week. We look forward to seeing you soon.",
        },
        {
            title: 'Behind the Scenes: How We Build Our Curries',
            slug: 'behind-the-scenes-how-we-build-our-curries',
            excerpt: 'A look at the tempering, spicing and slow cooking that goes into every pot at Ramzy.',
            coverImage: '/images/kitchen.jpg',
            content:
                "Every curry at Ramzy starts the same way: whole spices bloomed in hot oil, followed by onions cooked low and slow until they turn deep gold. It's a step that takes patience, but it's the base that everything else builds on.\n\nFrom there, each dish gets its own treatment — ginger and garlic pounded fresh, tomatoes simmered down, and a final tempering of curry leaves and mustard seed to finish. Nothing is rushed, and nothing comes from a jar.\n\nIt's the same method our kitchen uses every single day, whether we're making a small batch of Dal or a full pot of Nahari for the weekend.",
        },
        {
            title: 'Join Us for Our Sunday Nahari Special',
            slug: 'join-us-for-our-sunday-nahari-special',
            excerpt: 'A slow-cooked tradition, served every Sunday — a great excuse to gather the family.',
            coverImage: '/images/family.jpg',
            content:
                "Nahari is a dish that rewards patience — a rich, slow-simmered stew traditionally cooked overnight until the meat is falling-apart tender. Every Sunday, we bring it to the table at Ramzy as our weekend special, Med for £8.00 or Large for £10.00.\n\nIt's become a favourite for families gathering after a busy week, and it pairs perfectly with fresh naan straight from the kitchen.\n\nTables fill up quickly on Sundays, so if you're planning to join us, a quick call ahead to reserve is always a good idea.",
        },
    ];

    for (const post of blogPosts) {
        await prisma.blogPost.upsert({
            where: {slug: post.slug},
            update: post,
            create: post,
        });
    }
    console.log(`✓ Blog (${blogPosts.length} posts)`);

    type SeedImage = {slot: 'HERO_SLIDER' | 'GALLERY' | 'MASTERPIECES' | 'ROOM'; imagePath: string; altText: string};
    const galleryImages: SeedImage[] = [
        {slot: 'HERO_SLIDER', imagePath: '/images/interior.jpg', altText: 'Ramzy Restaurant dining room'},
        {slot: 'HERO_SLIDER', imagePath: '/images/biryani.jpg', altText: 'Qabuli Pilau'},
        {slot: 'HERO_SLIDER', imagePath: '/images/kebab.jpg', altText: 'Seekh kebab platter'},
        {slot: 'HERO_SLIDER', imagePath: '/images/spread.jpg', altText: "Chef's curry spread"},
        {slot: 'HERO_SLIDER', imagePath: '/images/tandoori.jpg', altText: 'Tandoori chicken'},

        {slot: 'GALLERY', imagePath: '/images/interior.jpg', altText: 'Restaurant ambience'},
        {slot: 'GALLERY', imagePath: '/images/biryani.jpg', altText: 'Qabuli Pilau'},
        {slot: 'GALLERY', imagePath: '/images/kebab.jpg', altText: 'Seekh kebab platter'},
        {slot: 'GALLERY', imagePath: '/images/spread.jpg', altText: "Chef's curry spread"},
        {slot: 'GALLERY', imagePath: '/images/naan.jpg', altText: 'Fresh-baked naan bread'},
        {slot: 'GALLERY', imagePath: '/images/chai.jpg', altText: 'Traditional chai'},
        {slot: 'GALLERY', imagePath: '/images/tandoori.jpg', altText: 'Tandoori chicken'},
        {slot: 'GALLERY', imagePath: '/images/dessert.jpg', altText: 'Gulab Jamun'},

        {slot: 'MASTERPIECES', imagePath: '/images/biryani.jpg', altText: 'Qabuli Pilau'},
        {slot: 'MASTERPIECES', imagePath: '/images/kebab.jpg', altText: 'Seekh kebab platter'},
        {slot: 'MASTERPIECES', imagePath: '/images/tandoori.jpg', altText: 'Tandoori chicken'},
        {slot: 'MASTERPIECES', imagePath: '/images/spread.jpg', altText: "Chef's curry spread"},
        {slot: 'MASTERPIECES', imagePath: '/images/naan.jpg', altText: 'Fresh-baked naan'},
        {slot: 'MASTERPIECES', imagePath: '/images/dessert.jpg', altText: 'Gulab Jamun'},
        {slot: 'MASTERPIECES', imagePath: '/images/chai.jpg', altText: 'Traditional chai'},

        {slot: 'ROOM', imagePath: '/images/about.jpg', altText: 'Inside Ramzy Restaurant'},
    ];

    for (let i = 0; i < galleryImages.length; i++) {
        const image = galleryImages[i];
        const slotIndex = galleryImages.slice(0, i).filter((img) => img.slot === image.slot).length;
        const existing = await prisma.galleryImage.findFirst({where: {slot: image.slot, imagePath: image.imagePath}});

        const data = {slot: image.slot, imagePath: image.imagePath, altText: image.altText, displayOrder: slotIndex, isActive: true};

        if (existing) {
            await prisma.galleryImage.update({where: {id: existing.id}, data});
        } else {
            await prisma.galleryImage.create({data});
        }
    }
    console.log(`✓ Gallery (${galleryImages.length} photos)`);

    console.log('Seed complete.');
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
