import { IBootstrap_Routes } from '@/routes/index';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema } from './schema';
import { User_Middleware_Token } from '@/app/user/middleware/token';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export default function RouteUserProfile({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/user/profile',
        method: 'GET',
        schema,
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                let user = await User_Middleware_Token({
                    request: request as any,
                    reply,
                    prisma,
                });

                if (!user) {
                    return reply.status(404).send({
                        message: 'USER.ERROR.FOUND',
                    });
                }

                return reply.send(user);
            } catch (error) {
                return reply.status(404).send({
                    message: 'USER.ERROR.FOUND',
                });
            }
        },
    });
}
