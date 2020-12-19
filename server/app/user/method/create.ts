import { EmailQueue } from '@/jobs/email/queues';
import { PrismaClient, User } from '@prisma/client';
import { Encrypt_CryptSalt } from '@/libraries/utils/encrypt';
import { nanoid } from 'nanoid';

/*
:--------------------------------------------------------------------------
: @create
: | Create a new user to the database
:--------------------------------------------------------------------------
*/

interface IUser_Method_Create_Data {
    password: string;
    email: string;
    name: string;
    username: string;
}

export async function User_Method_Create(
    prisma: PrismaClient,
    data: IUser_Method_Create_Data
): Promise<Omit<User, 'id'>> {
    data.password = await Encrypt_CryptSalt(data.password, 5);

    const user = await prisma.user.create({
        data: {
            password: data.password,
            email: data.email,
            name: data.name,
            username: data.username,
            role: 'CLIENT',

            tokenActiveAccount: `${nanoid(8)}__${Date.now().toString(32)}`,
        },
    });

    // ! PASS ALERT TO SEND EMAIL

    EmailQueue.add('EmailUser_ValidAccount', user, {
        removeOnComplete: true,
        priority: 2,
        attempts: 2,
        delay: 100,
    });

    return user;
}
