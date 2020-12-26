import { Queue, Worker } from 'bullmq';

export interface IQueueSetupRunner {
    Queue: Queue<any, any, string>;
    Worker: Worker<any, void, string>;
    QUEUE_NAME: string;
    InitQueues?: () => void;
    RegisterQueues?: () => void;
}
