import { FastifySchema } from 'fastify';

export interface IUser_Route_Login_SchemaBody {
    email: string;
    password: string;
}

export const schema: FastifySchema = {
    body: {
        type: ['object', 'string'],
        required: ['email', 'password'],
        properties: {
            email: {
                type: 'string',
                format: 'email',
                maximun: 256,
            },
            password: {
                type: 'string',
                maximun: 256,
            },
        },
    },
};
