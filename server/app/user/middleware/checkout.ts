import { User_Method_Checkout } from '@/app/user/method/checkout';
import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

/*
:--------------------------------------------------------------------------
: @checkout
: | Check if exists an user on database
:--------------------------------------------------------------------------
*/

export async function User_Middleware_Checkout(
    request: FastifyRequest,
    reply: FastifyReply,
    prisma: PrismaClient
) {
    try {
        const body = request.body as Record<any, any>;
        const checkoutIfExists = await User_Method_Checkout(prisma, body.email);
        if (!!checkoutIfExists) {
            return reply.status(404).send({
                message: 'USER.ERROR.REGISTER_EXISTS',
            });
        }
        return;
    } catch (error) {
        return reply.status(404).send({
            message: 'USER.ERROR.REGISTER',
        });
    }
}
