import { FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { UserError_RegisterEmail_Have } from '@/app/user/error/RouteRegister';
import { IRoute_UserRegister_SchemaBody } from '../schema';

export async function RouteUser_Register_HandlerEmail(
    prisma: PrismaClient,
    body: IRoute_UserRegister_SchemaBody,
    reply: FastifyReply
): Promise<any> {
    try {
        const user = await prisma.user.findUnique({
            where: { email: body.email },
        });

        if (!!user) {
            return reply.status(404).send(UserError_RegisterEmail_Have);
        }

        return;
    } catch (error) {
        return;
    }
}
