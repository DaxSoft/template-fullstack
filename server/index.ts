/*
:--------------------------------------------------------------------------
: Requirements
:--------------------------------------------------------------------------
*/

import dotenv from 'dotenv';
import fastifyInstance from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyExpress from 'fastify-express';
import fastifyMulter from 'fastify-multer';
import fastifyStatic from 'fastify-static';
import path from 'path';
import DOMAIN_CONFIG from './config/domain';
import { NextConfig } from './config/next/index';
import { PrismaConfig } from './config/prisma/index';
import { QueueRunner } from './config/queue/setup';
import { RedisConnection } from './config/redis/index';
import { ConfigWebsocket } from './config/ws/index';
import Bootstrap_Routes from './routes';
import { StartPoint } from './app/bootstrap';

/*
:--------------------------------------------------------------------------
: Constant
:--------------------------------------------------------------------------
*/

dotenv.config();

const ONLY_SERVER = process.env.ONLY_SERVER
    ? eval(process.env.ONLY_SERVER)
    : false;

/*
:--------------------------------------------------------------------------
: @bootstrap
:--------------------------------------------------------------------------
*/

void (async function () {
    /*
    :-----------------------------------------------------------------------
    : Handler
    :-----------------------------------------------------------------------
    */

    const fastify: any = fastifyInstance({
        logger: false,
        pluginTimeout: ONLY_SERVER ? 1e4 : 3e4,
    });

    /*
    :--------------------------------------------------------------------------
    : DB as Prisma
    :--------------------------------------------------------------------------
    */

    const Prisma = await PrismaConfig();

    /*
    :--------------------------------------------------------------------------
    : Register
    :--------------------------------------------------------------------------
    */

    await fastify.register(fastifyExpress);

    fastify.register(fastifyCors, {
        origin: true,
    });

    fastify.register(fastifyMulter.default.contentParser);

    fastify.register(fastifyStatic, {
        root: path.join(__dirname, 'public', 'uploads'),
        prefix: '/public/uploads/',
    });

    /*
    :--------------------------------------------------------------------------
    : Setup redis
    :--------------------------------------------------------------------------
    */

    const RedisClient = await RedisConnection();
    globalThis.redis = RedisClient;

    /*
    :--------------------------------------------------------------------------
    : Setup Socket
    :--------------------------------------------------------------------------
    */

    const SocketServer = await ConfigWebsocket(fastify);

    /*
    :--------------------------------------------------------------------------
    : Bull Queues
    :--------------------------------------------------------------------------
    */

    await QueueRunner(fastify);

    /*
    :--------------------------------------------------------------------------
    : Routes
    :--------------------------------------------------------------------------
    */

    await Bootstrap_Routes({
        fastify,
        prisma: Prisma,
        redis: RedisClient,
        socket: SocketServer,
    });

    /*
    :--------------------------------------------------------------------------
    : Next
    :--------------------------------------------------------------------------
    */

    await NextConfig(fastify, Prisma);

    /*
    :--------------------------------------------------------------------------
    : Start Point
    :--------------------------------------------------------------------------
    */

    await StartPoint({
        fastify,
        prisma: Prisma,
        redis: RedisClient,
        socket: SocketServer,
    });

    /*
    :--------------------------------------------------------------------------
    : Server
    :--------------------------------------------------------------------------
    */

    try {
        await fastify.listen(DOMAIN_CONFIG.PORT);
        console.log(`goto http://localhost:${DOMAIN_CONFIG.PORT}/`);
        fastify.log.info(`server listening on ${DOMAIN_CONFIG.PORT}`);
    } catch (error) {
        await Prisma.$disconnect();
        console.log({
            error,
        });
        fastify.log.error(error);
        process.exit(1);
    }
})();
