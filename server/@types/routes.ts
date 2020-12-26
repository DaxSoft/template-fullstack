
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { RedisClient } from 'redis';

export interface IBootstrap_Routes {
  fastify: FastifyInstance;
  prisma: PrismaClient;
  redis: RedisClient;
  socket: Server;
}
