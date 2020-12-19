import { PrismaClient } from '@prisma/client';

/*
:--------------------------------------------------------------------------
: @checkout
: | Check if exists an user on database
:--------------------------------------------------------------------------
*/

export async function User_Method_Checkout(
    prisma: PrismaClient,
    email: string
): Promise<Boolean> {
    try {
        const isUserDefined = await prisma.user.findUnique({
            where: { email },
        });

        return Boolean(isUserDefined);
    } catch (error) {
        return false;
    }
}
