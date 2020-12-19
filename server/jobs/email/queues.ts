import { Queue } from 'bullmq';
import { ConfigRedis } from '@/config/redis/config';

export const QUEUE_NAME = 'EmailJob';

const EmailQueue = new Queue(QUEUE_NAME, {
    connection: {
        host: ConfigRedis.host,
        port: ConfigRedis.port,
    },
});

export { EmailQueue };
