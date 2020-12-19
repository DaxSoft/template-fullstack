import { PrismaClient, User } from '@prisma/client';
import { FastifyReply } from 'fastify';
import { User_Middleware_Token } from './token';

/*
:--------------------------------------------------------------------------
: @admin
: | Checkout if the user is admin
:--------------------------------------------------------------------------
*/

export async function User_Middleware_Admin(
    request: any,
    reply: FastifyReply,
    prisma: PrismaClient
): Promise<User | null | any> {
    const user = await User_Middleware_Token({
        request,
        reply,
        prisma,
    });
    if (!user) {
        return reply.status(401).send({
            message: 'USER.UNATHORIZED',
        });
    }
    const isAdmin = user.role === 'ADMIN';
    if (!isAdmin) {
        return reply.status(401).send({
            message: 'USER.UNATHORIZED',
        });
    }
    return user;
}

/*
:--------------------------------------------------------------------------
: @admin-raw
: | Checkout if the user is admin on request to the route
:--------------------------------------------------------------------------
*/

export async function User_Middleware_RawAdmin(
    request: any,
    reply: FastifyReply,
    prisma: PrismaClient
) {
    const user = await User_Middleware_Token({
        request,
        reply,
        prisma,
        isRawHeader: true,
    });
    if (!user) {
        return reply.status(401).send({
            message: 'USER.UNATHORIZED',
        });
    }
    const isAdmin = user.role === 'ADMIN';
    if (!isAdmin) {
        return reply.status(401).send({
            message: 'USER.UNATHORIZED',
        });
    }
    return;
}
