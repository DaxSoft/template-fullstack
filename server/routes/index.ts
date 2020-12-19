import { Server } from 'socket.io';
/*
:--------------------------------------------------------------------------
: Requirements
:--------------------------------------------------------------------------
*/

import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { RedisClient } from 'redis';
import * as Routes from './routes';

/*
:--------------------------------------------------------------------------
: Bootstrap routes
:--------------------------------------------------------------------------
*/

export interface IBootstrap_Routes {
    fastify: FastifyInstance;
    prisma: PrismaClient;
    redis: RedisClient;
    socket: Server;
}

export default async function Bootstrap_Routes({
    fastify,
    prisma,
    redis,
    socket,
}: IBootstrap_Routes) {
    const overallRoutes: Record<string | symbol, any>[] = Object.values(Routes);
    return overallRoutes.map((routes) =>
        Object.values(routes).map(
            (route) => !!route && route({ fastify, prisma, redis, socket })
        )
    );
}
