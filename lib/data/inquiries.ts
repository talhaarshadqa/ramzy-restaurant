import type {InquiryStatus} from '@/generated/prisma/client';

import {prisma} from '@/lib/prisma';

export function getInquiries({status}: {status?: InquiryStatus} = {}) {
    return prisma.inquiry.findMany({
        where: status ? {status} : undefined,
        orderBy: {createdAt: 'desc'},
    });
}

export function getInquiryById(id: string) {
    return prisma.inquiry.findUnique({where: {id}});
}

export function countNewInquiries() {
    return prisma.inquiry.count({where: {status: 'NEW'}});
}
