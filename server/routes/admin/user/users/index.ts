import { IBootstrap_Routes } from '@/routes/index';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Prisma } from '@prisma/client';
import { schema, IUser_Route_Users_SchemaQuerystring } from './schema';
import { User_Middleware_Admin } from '@/app/user/middleware/admin';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export default function RouteAdminUser_Users({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/admin/users',
        method: 'GET',
        schema,
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                await User_Middleware_Admin(request, reply, prisma);

                const {
                    pageIndex,
                    perPage,
                    search,
                } = request.query as IUser_Route_Users_SchemaQuerystring;

                let filter: Prisma.FindManyUserArgs = {
                    take: perPage || 99,
                    skip: pageIndex || 0,
                };

                if (!!search) {
                    filter = {
                        ...filter,
                        where: {
                            name: {
                                startsWith: search,
                            },
                        },
                    };
                }

                let models = await prisma.user.findMany(filter);
                const total = await prisma.user.count();

                return reply.send({
                    pageIndex: filter.skip,
                    perPage: filter.take,
                    total,
                    data: models,
                });
            } catch (error) {
                console.log(error);
                return reply.status(404).send(false);
            }
        },
    });
}
