import { FastifyInstance } from 'fastify';
import { IQueueSetupRunner } from '@/types/queue/TypesQueueSetup';
import { QueueEvents, Queue, QueueScheduler } from 'bullmq';
import * as Jobs from '@/jobs/index';
import { BullMQAdapter, setQueues, router } from 'bull-board';

/*
:--------------------------------------------------------------------------
: UI
:--------------------------------------------------------------------------
*/

async function BullUI(fastify: FastifyInstance, queues: any[]) {
    setQueues(queues);
    fastify.use('/admin/queues', router);
}

/*
:--------------------------------------------------------------------------
: Reset Delayed
:--------------------------------------------------------------------------
*/

async function QueueResetDelayed(queue: Queue<any, any, string>) {
    console.log('[Reseting Delayed Jobs]', queue.name);
    const jobs = await queue.getDelayed();
    await Promise.allSettled(
        jobs.map(async (job) => {
            console.log('\t', job.name);
            await job.remove();
        })
    );
}

/*
:--------------------------------------------------------------------------
: Events
:--------------------------------------------------------------------------
*/

async function QueueSetupEvents(job: IQueueSetupRunner) {
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
}

/*
:--------------------------------------------------------------------------
: Schedules
:--------------------------------------------------------------------------
*/

async function QueueSetupSchedules(job: IQueueSetupRunner) {
    const queueScheduler = new QueueScheduler(job.QUEUE_NAME);
}

/*
:--------------------------------------------------------------------------
: Runner
:--------------------------------------------------------------------------
*/

export async function QueueRunner(fastify: FastifyInstance) {
    const _collectorQueues: any[] = [];

    const keyJobs = Object.keys(Jobs);
    await Promise.allSettled(
        keyJobs.map(async (key) => {
            const job: IQueueSetupRunner = Jobs[key];

            job.Queue;
            job.Worker;

            _collectorQueues.push(new BullMQAdapter(job.Queue));

            await QueueResetDelayed(job.Queue);
            await QueueSetupEvents(job);
            await QueueSetupSchedules(job);

            if (!!job.InitQueues && typeof job.InitQueues === 'function') {
                job.InitQueues();
            }
        })
    );

    await BullUI(fastify, _collectorQueues);
}
