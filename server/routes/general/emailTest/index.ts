import { JobsEmail } from '@/server/jobs/email';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, TRoute_SchemaQuerystring } from './schema';
/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export default function RouteUserLogin({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/general/email-test',
        method: 'GET',
        schema,

        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const { email } = request.query as TRoute_SchemaQuerystring;

                JobsEmail.Test({ email });

                return reply.send({ email: 'test' });
            } catch (error) {
                console.log(error);
                return reply.status(404).send({ email: 'fail' });
            }
        },
    });
}
