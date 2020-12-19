import { FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import yup from 'yup';
import {
    UserError_RegisterPassword_NotRule,
    UserError_RegisterPassword_NotSame,
} from '@/app/user/error/RouteRegister';
import { IRoute_UserRegister_SchemaBody } from '../schema';

export async function RouteUser_Register_HandlerPassword(
    prisma: PrismaClient,
    body: IRoute_UserRegister_SchemaBody,
    reply: FastifyReply
): Promise<any> {
    try {
        if (body.password !== body.checkPassword) {
            return reply.status(404).send(UserError_RegisterPassword_NotSame);
        }

        const schema = yup.string();
        const isValid = await schema.min(8).required().isValid(body.password);

        if (!isValid) {
            return reply.status(404).send(UserError_RegisterPassword_NotRule);
        }

        return;
    } catch (error) {
        return;
    }
}
