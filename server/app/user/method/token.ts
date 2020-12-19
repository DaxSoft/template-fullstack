import { Encrypt_GenerateJTI } from '@/libraries/utils/encrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

/**
 * @description create the user access token
 */

export function User_Method_CreateAccessToken(): string {
    const secret = !!process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
    const sign: string = jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            sub: 'lalaland|gonto',
            jti: Encrypt_GenerateJTI(),
            alg: 'HS256',
        },
        secret
    );
    return sign;
}

/**
 * @description create user token
 * @param {String} email from user
 */

export function User_Method_CreateToken(email: string): string {
    const secret = !!process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
    const sign = jwt.sign({ email }, secret, { expiresIn: 604800 });
    return sign;
}

/**
 * @description verify the token
 */

export async function User_Method_VerifyToken(
    token: string
): Promise<Record<any, any>> {
    const secret = !!process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
    const decodedToken = jwt.verify(token, secret) as Record<any, any>;
    return decodedToken && decodedToken.email ? decodedToken : {};
}
