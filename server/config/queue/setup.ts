/*
:--------------------------------------------------------------------------
: Requirements
:--------------------------------------------------------------------------
*/
import { IQueueSetupRunner } from '@/types/queue/TypesQueueSetup';
import { QueueEvents } from 'bullmq';
import * as Jobs from '@/jobs/index';

/*
:--------------------------------------------------------------------------
: Runner
:--------------------------------------------------------------------------
*/

export async function QueueRunner() {
    const keyJobs = Object.keys(Jobs);
    keyJobs.map((key) => {
        const job: IQueueSetupRunner = Jobs[key];

        job.EmailQueue;
        job.EmailWorker;
        const queueEvents = new QueueEvents(job.QUEUE_NAME);
        queueEvents.on('waiting', ({ jobId }) => {
            console.log(`waiting:${jobId}`);
        });

        queueEvents.on('completed', ({ jobId, returnvalue }) => {
            console.log(`completed:${jobId}:${returnvalue}`);
        });

        queueEvents.on('failed', ({ jobId }) => {
            console.log(`failed:${jobId}`);
        });
    });
}
