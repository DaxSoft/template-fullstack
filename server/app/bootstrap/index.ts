import { IBootstrap_Routes } from '@/types/routes';

/*
:--------------------------------------------------------------------------
: Bootstrap right at the start of the Server
:--------------------------------------------------------------------------
*/

export async function StartPoint({
    prisma,
    redis,
    socket,
    fastify,
}: IBootstrap_Routes): Promise<void> {
    return;
}
