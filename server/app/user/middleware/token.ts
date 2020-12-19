import { PrismaClient, User, Prisma } from '@prisma/client';
import { FastifyReply } from 'fastify';
import { User_Method_VerifyToken } from '../method/token';

function getRawHeaderToken(request: any): string {
    let rawHeaders = request.headers.cookie as string;
    rawHeaders += ';';
    const hasUserToken = /(x-user-token=(.*?)((;|\n)\s?))/gimu.test(rawHeaders);
    if (!hasUserToken) {
        return '';
    }

    const getCookie = /(x-user-token=(.*?)((;|\n)\s?))/gimu.exec(rawHeaders);

    // console.log(getCookie);

    return !!getCookie ? getCookie[2] : '';
}

// 'x-user-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRheC1zb2Z0QGxpdmUuY29tIiwiaWF0IjoxNTk5NjY2MjgxLCJleHAiOjE2MDAyNzEwODF9.UW2R5F2iVmTcSqGdOq-cj7LoqGiKkL8AKwmAS8ugeJU'
/*
'x-user-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRheC1zb2Z0QGxpdmUuY29tIiwiaWF0IjoxNTk5ODQ2OD
U5LCJleHAiOjE2MDA0NTE2NTl9.MnSnkiTpP2nRe_l4d7stzu6VDzM4fMShR2WFHTEblFQ; x-user-teste=1747e4dc3db'
*/

/*
:--------------------------------------------------------------------------
: @token
: | Checkout if the user is ON with the x-user-token and returns the object
: | with the data from user
:--------------------------------------------------------------------------
*/

interface IUser_Middleware_Token {
    request: any;
    reply: FastifyReply;
    prisma: PrismaClient;
    isRawHeader?: Boolean;
}

export async function User_Middleware_Token({
    request,
    reply,
    prisma,
    isRawHeader = false,
}: IUser_Middleware_Token): Promise<User | null> {
    const userToken: string = !isRawHeader
        ? (request.headers['x-user-token'] as string)
        : getRawHeaderToken(request);

    if (!userToken) {
        return reply.status(401).send({
            message: 'USER.IS_OFF',
        });
    }

    let decodedToken: Record<any, any> = await User_Method_VerifyToken(
        userToken
    );

    if (!decodedToken || !decodedToken.email) {
        return reply.status(401).send({
            message: 'USER.TOKEN_INVALID',
        });
    }

    const user = await prisma.user.findUnique({
        where: { email: decodedToken.email },
    });

    if (!user) {
        return reply.status(401).send({
            message: 'USER.INVALID_ACCOUNT',
        });
    }

    const isBanned = user.isBanned === true;

    // console.log(user);

    if (isBanned) {
        return reply.status(401).send({
            message: 'USER.INVALID_ACCESS',
        });
    }

    request.user = user;

    return user;
}
