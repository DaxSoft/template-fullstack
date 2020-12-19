import { FastifySchema } from 'fastify';

export interface IUser_Route_Users_SchemaQuerystring {
    pageIndex: number;
    perPage: number;
    search?: string;
}

export const schema: FastifySchema = {
    headers: {
        type: 'object',
        properties: {
            'x-user-token': {
                type: 'string',
            },
        },
        required: ['x-user-token'],
    },
    querystring: {
        type: 'object',
        properties: {
            pageIndex: {
                type: 'integer',
                minimum: 0,
            },
            perPage: {
                type: 'integer',
                minimum: 1,
            },
            search: {
                type: 'string',
            },
        },
        required: ['pageIndex', 'perPage'],
    },
};
