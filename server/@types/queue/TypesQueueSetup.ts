import { Queue, Worker } from 'bullmq';

export interface IQueueSetupRunner {
    EmailQueue: Queue<any, any, string>;
    EmailWorker: Worker<any, void, string>;
    QUEUE_NAME: string;
}
