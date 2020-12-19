import { IBootstrap_Routes } from '@/routes/index';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, IRoute_UserRegister_SchemaBody } from './schema';
import { parseJsonBody } from '@/libraries/utils/routes';
import { User_Method_Create } from '@/app/user/method/create';
import { RouteUser_Register_HandlerUsername } from './handler/username';
import { RouteUser_Register_HandlerEmail } from './handler/email';
import { RouteUser_Register_HandlerPassword } from './handler/password';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export default function RouteUserRegister({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/user/register',
        method: 'POST',
        schema,
        preHandler: [parseJsonBody],
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const body = request.body as IRoute_UserRegister_SchemaBody;

                await RouteUser_Register_HandlerEmail(prisma, body, reply);
                await RouteUser_Register_HandlerUsername(prisma, body, reply);
                await RouteUser_Register_HandlerPassword(prisma, body, reply);

                const user = await User_Method_Create(prisma, {
                    email: body.email,
                    username: body.username,
                    name: body.name,
                    password: body.password,
                });

                return reply.send(true);
            } catch (error) {
                return reply.status(404).send(false);
            }
        },
    });
}
