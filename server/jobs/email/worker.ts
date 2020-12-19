import { Worker, Job } from 'bullmq';
import {
    TasksEmail_User_ValidAccount,
    TasksEmail_Test,
} from '@/tasks/email/index';
import { QUEUE_NAME } from './queues';

function WhichTasks(job: Job): any {
    return {
        EmailUser_ValidAccount: TasksEmail_User_ValidAccount,
        EmailTest: TasksEmail_Test,
    }[job.name];
}

export const EmailWorker = new Worker(
    QUEUE_NAME,
    async (job: Job): Promise<void> => {
        const { data } = job;
        const tasks = WhichTasks(job);
        console.log(job.name, job.id);
        try {
            await tasks(job);
        } catch (error) {}
        return;
    },
    {}
);
