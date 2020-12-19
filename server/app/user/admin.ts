import { PrismaClient } from '@prisma/client';
import { User_Method_Checkout } from './method/checkout';
import { Encrypt_CryptSalt } from '@/libraries/utils/encrypt';

/*
:--------------------------------------------------------------------------
: @admin
: | Create the default admin user
:--------------------------------------------------------------------------
*/

export const MAIN_ACCOUNT_EMAIL = 'dax-soft@live.com';

export async function User_CreateDefaultAdmin(
    prisma: PrismaClient
): Promise<Boolean> {
    // await prisma.user.delete({ where: { email: MAIN_ACCOUNT_EMAIL } });

    const userAlreadyExists = await User_Method_Checkout(
        prisma,
        MAIN_ACCOUNT_EMAIL
    );
    if (!!userAlreadyExists === true) return false;

    const password = await Encrypt_CryptSalt('senha', 5);

    await prisma.user.create({
        data: {
            email: MAIN_ACCOUNT_EMAIL,
            password,
            name: 'Michael',
            surname: 'Willian',
            imageCover: 'public/uploads/users/cover/michael.png',

            username: 'vorlefan',

            role: 'ADMIN',
        },
    });

    console.log('creating main account', MAIN_ACCOUNT_EMAIL);

    return true;
}
