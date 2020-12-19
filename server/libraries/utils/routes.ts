'use strict';

import { FastifyRequest } from 'fastify';

// ------------------------------------------------------------------
// | [requirement]
// ------------------------------------------------------------------

export async function parseJsonBody(request: FastifyRequest): Promise<void> {
    if (typeof request.body === 'string') {
        request.body = JSON.parse(request.body);
    }
}
