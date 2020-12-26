import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, IRouteAdmin_UserDelete_SchemaBody } from './schema';
import { User_Middleware_Admin } from '@/app/user/middleware/admin';
import { User_Method_IsPasswordValid } from '@/app/user/method/password';
import { parseJsonBody } from '@/libraries/utils/routes';
import { MAIN_ACCOUNT_EMAIL } from '@/app/user/admin';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export default function RouteAdminUser_Delete({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/admin/user/delete',
        method: 'POST',
        schema,
        preHandler: [parseJsonBody],
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const user = await User_Middleware_Admin(
                    request,
                    reply,
                    prisma
                );

                if (!user.password) {
                    return reply.status(404).send(false);
                }

                const {
                    emails,
                    password,
                } = request.body as IRouteAdmin_UserDelete_SchemaBody;

                const isPasswordValid = await User_Method_IsPasswordValid(
                    password,
                    user.password
                );

                if (!isPasswordValid) {
                    return reply.status(404).send(false);
                }

                await Promise.all(
                    emails
                        .filter((userEmail) => userEmail !== MAIN_ACCOUNT_EMAIL)
                        .map(
                            (userEmail: string) =>
                                new Promise((resolve, reject) => {
                                    try {
                                        prisma.user
                                            .delete({
                                                where: {
                                                    email: userEmail,
                                                },
                                            })
                                            .then((vln) => resolve(vln))
                                            .catch(() => reject(null));
                                    } catch (error) {
                                        reject(null);
                                    }
                                })
                        )
                );

                return reply.send(true);
            } catch (error) {
                console.log(error);
                return reply.status(404).send(false);
            }
        },
    });
}
