import { IUser_Transformer_User } from '@/types/user/TypeUserProfile';
import { User } from '@prisma/client';

export function User_Transformer_User(user: User): IUser_Transformer_User {
    return {
        email: user.email,
        username: user.username,
        name: user.name,
        surname: user.surname,
        role: user.role,
        imageCover: user.imageCover,
        requireActiveAccount: user.requireActiveAccount,
    };
}
