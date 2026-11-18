import {prisma} from '@/lib/prisma';

export function getMenuCategories({includeUnavailable = false}: {includeUnavailable?: boolean} = {}) {
    return prisma.menuCategory.findMany({
        orderBy: {displayOrder: 'asc'},
        include: {
            items: {
                where: includeUnavailable ? undefined : {isAvailable: true},
                orderBy: {displayOrder: 'asc'},
            },
        },
    });
}

export function getMenuCategoryById(id: string) {
    return prisma.menuCategory.findUnique({where: {id}});
}

export function getMenuItemById(id: string) {
    return prisma.menuItem.findUnique({where: {id}, include: {category: true}});
}

export function getFeaturedCategories() {
    return prisma.menuCategory.findMany({
        where: {isFeaturedOnHome: true},
        orderBy: {displayOrder: 'asc'},
    });
}

export function getSignatureDishes() {
    return prisma.menuItem.findMany({
        where: {isSignature: true, isAvailable: true},
        orderBy: {signatureOrder: 'asc'},
    });
}
