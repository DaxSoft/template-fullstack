import { FastifySchema } from 'fastify';

export interface IRoute_UserRegister_SchemaBody {
    email: string;
    password: string;
    checkPassword: string;
    username: string;
    name: string;
}

export const schema: FastifySchema = {
    body: {
        type: ['object', 'string'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
            checkPassword: { type: 'string' },
            username: { type: 'string' },
            name: { type: 'string' },
        },
    },
};
