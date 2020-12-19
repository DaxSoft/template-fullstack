import { FastifySchema } from 'fastify';

export type TRoute_SchemaQuerystring = {
    email: string;
};

export const schema: FastifySchema = {
    querystring: {
        type: 'object',
        required: ['email'],
        properties: {
            email: {
                type: 'string',
                format: 'email',
            },
        },
    },
};
