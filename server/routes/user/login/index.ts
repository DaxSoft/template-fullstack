import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, IUser_Route_Login_SchemaBody } from './schema';
import { parseJsonBody } from '@/libraries/utils/routes';
import { User_Method_IsPasswordValid } from '@/app/user/method/password';
import { User_Method_CreateToken } from '@/app/user/method/token';

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
        url: '/api/user/login',
        method: 'POST',
        schema,
        preHandler: [parseJsonBody],
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const body = request.body as IUser_Route_Login_SchemaBody;
                const user = await prisma.user.findUnique({
                    where: { email: body.email },
                });
                if (!user) {
                    return reply
                        .status(404)
                        .send({ message: 'USER.ERROR.LOGIN_EMAIL' });
                }
                const isPasswordValid = await User_Method_IsPasswordValid(
                    body.password,
                    user.password
                );

                if (!isPasswordValid) {
                    return reply
                        .status(404)
                        .send({ message: 'USER.ERROR.LOGIN_PASSWORD' });
                }

                const token = await User_Method_CreateToken(user.email);

                return reply.send({ token });
            } catch (error) {
                return reply.status(404).send({ message: 'USER.ERROR.LOGIN' });
            }
        },
    });
}
