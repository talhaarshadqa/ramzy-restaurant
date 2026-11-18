-- CreateEnum
CREATE TYPE "GallerySlot" AS ENUM ('HERO_SLIDER', 'GALLERY', 'MASTERPIECES', 'ROOM');

-- AlterTable
ALTER TABLE "MenuCategory" ADD COLUMN     "isFeaturedOnHome" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tagline" TEXT;

-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "isSignature" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "signatureDescription" TEXT,
ADD COLUMN     "signatureLabel" TEXT,
ADD COLUMN     "signatureOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "SiteSettings" ADD COLUMN     "addressLine" TEXT NOT NULL DEFAULT '13 Bury New Road, Cheetham Hill, Manchester M8 8FW',
ADD COLUMN     "businessName" TEXT NOT NULL DEFAULT 'Ramzy Restaurant',
ADD COLUMN     "cuisineHeading" TEXT NOT NULL DEFAULT 'Explore the menu, course by course.',
ADD COLUMN     "cuisineSubheading" TEXT NOT NULL DEFAULT 'From smoky grills to slow-simmered curries, fragrant pilau and fresh-baked naan — every category tells its own part of the story.',
ADD COLUMN     "facebookHandle" TEXT NOT NULL DEFAULT 'Ramzy Manchester',
ADD COLUMN     "googleRating" DECIMAL(2,1) NOT NULL DEFAULT 4.7,
ADD COLUMN     "googleReviewCount" INTEGER NOT NULL DEFAULT 182,
ADD COLUMN     "heroBadge1" TEXT NOT NULL DEFAULT 'Open 7 Days',
ADD COLUMN     "heroBadge2" TEXT NOT NULL DEFAULT 'Bury New Road, Manchester',
ADD COLUMN     "heroEyebrow" TEXT NOT NULL DEFAULT 'حلال · Halal Kitchen · Manchester',
ADD COLUMN     "heroTagline" TEXT NOT NULL DEFAULT 'Kebabs, curries and biryani — freshly made, halal, and served seven days a week in the heart of Manchester.',
ADD COLUMN     "masterpiecesHeading" TEXT NOT NULL DEFAULT 'Crafted icons &',
ADD COLUMN     "masterpiecesHeadingAccent" TEXT NOT NULL DEFAULT 'signature plates.',
ADD COLUMN     "mobileDisplay" TEXT NOT NULL DEFAULT '07762 520633',
ADD COLUMN     "mobileHref" TEXT NOT NULL DEFAULT 'tel:+447762520633',
ADD COLUMN     "neighbourhood" TEXT NOT NULL DEFAULT 'Cheetham Hill, Manchester',
ADD COLUMN     "ownerNotificationEmail" TEXT,
ADD COLUMN     "phoneDisplay" TEXT NOT NULL DEFAULT '0161 915 6242',
ADD COLUMN     "phoneHref" TEXT NOT NULL DEFAULT 'tel:+441619156242',
ADD COLUMN     "priceRange" TEXT NOT NULL DEFAULT '£10–20 per person',
ADD COLUMN     "roomHeading" TEXT NOT NULL DEFAULT 'Step inside,',
ADD COLUMN     "roomHeadingAccent" TEXT NOT NULL DEFAULT 'and stay a while.',
ADD COLUMN     "roomParagraph1" TEXT NOT NULL DEFAULT 'Warm light, the smell of fresh naan from the kitchen, and tables that fill up fast on a Sunday — this is a room built for gathering, not rushing.',
ADD COLUMN     "roomParagraph2" TEXT NOT NULL DEFAULT 'Whether it''s a quick bite between errands on Bury New Road or a full table for a celebration, we''ve got a seat for you.',
ADD COLUMN     "signatureSubheading" TEXT NOT NULL DEFAULT 'A few of the plates our regulars return for.',
ADD COLUMN     "statDishesLabel" TEXT NOT NULL DEFAULT 'Dishes on the Menu',
ADD COLUMN     "statDishesValue" TEXT NOT NULL DEFAULT '65+',
ADD COLUMN     "statHalalLabel" TEXT NOT NULL DEFAULT 'Halal',
ADD COLUMN     "statHalalValue" TEXT NOT NULL DEFAULT '100%',
ADD COLUMN     "storyHeading" TEXT NOT NULL DEFAULT 'A name that means',
ADD COLUMN     "storyHeadingAccent" TEXT NOT NULL DEFAULT 'hospitality.',
ADD COLUMN     "storyParagraph" TEXT NOT NULL DEFAULT 'Food, at Ramzy, is never rushed. It''s hand-pressed kebabs off the grill, onions cooked low and slow until they turn deep gold, and naan baked fresh through the day — the same halal South Asian cooking that''s been passed down and perfected over years.',
ADD COLUMN     "storyQuote" TEXT NOT NULL DEFAULT 'Ramzy is a place of gathering, of family, of quiet weekday lunches and loud Sunday dinners. Pull up a chair — the table is set.';

-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" TEXT NOT NULL,
    "slot" "GallerySlot" NOT NULL,
    "imagePath" TEXT NOT NULL,
    "altText" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GalleryImage_slot_isActive_displayOrder_idx" ON "GalleryImage"("slot", "isActive", "displayOrder");
