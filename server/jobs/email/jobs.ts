import { EmailQueue } from './queues';
import {
    TasksEmail_User_ValidAccount,
    TasksEmail_Test,
} from '@/tasks/email/index';

export const TASKS = {
    TasksEmail_User_ValidAccount,
    TasksEmail_Test,
};

export function UserValidAccount(data) {
    EmailQueue.add('TasksEmail_User_ValidAccount', data, {
        removeOnComplete: true,
        attempts: 2,
        priority: 2,
        lifo: true,
    });
}

export function Test(data) {
    EmailQueue.add('TasksEmail_Test', data, {
        removeOnComplete: true,
        attempts: 2,
        priority: 1,
    });
}
