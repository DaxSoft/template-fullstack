/*
:--------------------------------------------------------------------------
: Requirements
:--------------------------------------------------------------------------
*/

import { PrismaClient } from '@prisma/client';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import NextInstance from 'next';
import dotenv from 'dotenv';
dotenv.config();

import { isDeploying } from '../is_deploying';

import { User_Middleware_RawAdmin } from '@/app/user/middleware/admin';

/*
:--------------------------------------------------------------------------
: Testing only server?
:--------------------------------------------------------------------------
*/

const ONLY_SERVER = process.env.ONLY_SERVER
    ? eval(process.env.ONLY_SERVER)
    : false;

const IS_DEV = isDeploying();

/*
:--------------------------------------------------------------------------
: Handler
:--------------------------------------------------------------------------
*/

export async function NextConfig(
    fastify: FastifyInstance,
    prisma: PrismaClient
): Promise<Boolean> {
    if (ONLY_SERVER === true) return false;

    await fastify.register((fastify, opts, next) => {
        const app = NextInstance({ dev: !IS_DEV });
        const handle = app.getRequestHandler();

        app.prepare()
            .then(() => {
                if (IS_DEV) {
                    fastify.get('/_next/*', (request: any, reply: any) => {
                        return handle(request.raw, reply.raw).then(() => {
                            reply.sent = true;
                        });
                    });
                }

                fastify.all('/*', (request: any, reply: any) => {
                    return handle(request.raw, reply.raw).then(() => {
                        reply.sent = true;
                    });
                });

                fastify.all('/admin/*', async (request: any, reply: any) => {
                    // console.log(request.client, request.headers);

                    await User_Middleware_RawAdmin(
                        request as FastifyRequest,
                        reply as FastifyReply,
                        prisma
                    );
                    return handle(request.raw, reply.raw).then(() => {
                        reply.sent = true;
                    });
                });

                fastify.setNotFoundHandler((request: any, reply: any) => {
                    return app.render404(request.raw, reply.raw).then(() => {
                        reply.sent = true;
                    });
                });

                next();
            })
            .catch((err) => next(err));
    });

    return true;
}
