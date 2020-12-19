import redis, { RedisClient } from 'redis';
import { ConfigRedis } from './config';

/*
:--------------------------------------------------------------------------
: Export
:--------------------------------------------------------------------------
*/

export async function RedisConnection(): Promise<RedisClient> {
    const client = redis.createClient({
        port: ConfigRedis.port,
        host: ConfigRedis.host,
    });
    return client;
}
