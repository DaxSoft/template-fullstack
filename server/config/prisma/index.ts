/*
:--------------------------------------------------------------------------
: Requirements
:--------------------------------------------------------------------------
*/

import { PrismaClient } from '@prisma/client';
import { User_CreateDefaultAdmin } from '@/app/user/admin';

/*
:--------------------------------------------------------------------------
: Default Config
:--------------------------------------------------------------------------
*/

async function defaultConfig(prisma: PrismaClient) {
    await User_CreateDefaultAdmin(prisma);
}

/*
:--------------------------------------------------------------------------
: Export
:--------------------------------------------------------------------------
*/

export async function PrismaConfig() {
    const prisma = new PrismaClient({
        log: [
            {
                emit: 'event',
                level: 'query',
            },
            {
                emit: 'event',
                level: 'info',
            },
            {
                emit: 'event',
                level: 'warn',
            },
            {
                emit: 'event',
                level: 'error',
            },
        ],
    });
    await prisma.$connect();
    await defaultConfig(prisma);
    prisma.$on('error', (event) => {
        const { message, timestamp, target } = event;
        console.log('PRISMA ERROR', {
            message,
            timestamp,
            target,
        });
    });
    return prisma;
}
