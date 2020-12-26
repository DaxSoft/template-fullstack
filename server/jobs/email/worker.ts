import { Worker, Job } from 'bullmq';
import { QUEUE_NAME } from './queues';
import { TASKS } from './jobs';

export const EmailWorker = new Worker(
    QUEUE_NAME,
    async (job: Job): Promise<void> => {
        const tasks = TASKS[job.name];
        try {
            await tasks(job);
        } catch (error) {}
        return;
    },
    {}
);
