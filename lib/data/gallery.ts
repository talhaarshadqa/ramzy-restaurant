import {cache} from 'react';

import type {GallerySlot} from '@/generated/prisma/client';

import {prisma} from '@/lib/prisma';

export const getGalleryImages = cache(async (slot: GallerySlot) => {
    return prisma.galleryImage.findMany({
        where: {slot, isActive: true},
        orderBy: {displayOrder: 'asc'},
    });
});

export async function getAllGalleryImages() {
    return prisma.galleryImage.findMany({
        orderBy: [{slot: 'asc'}, {displayOrder: 'asc'}],
    });
}

export async function getGalleryImageById(id: string) {
    return prisma.galleryImage.findUnique({where: {id}});
}
