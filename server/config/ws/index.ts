import { FastifyInstance } from 'fastify';
import { Server } from 'socket.io';

/*
:--------------------------------------------------------------------------
: Export
:--------------------------------------------------------------------------
*/

export async function ConfigWebsocket(
    fastify: FastifyInstance
): Promise<Server> {
    const server = new Server(fastify.server, {});
    server.on('connection', async (socket) => {
        // here I can use socket.emit() and all
    });
    globalThis.socket = server;
    return server;
}
