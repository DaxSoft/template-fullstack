import bcryptjs from 'bcryptjs';

/**
 * @description encrypt a text with salt
 * @param {String} text
 * @param {Number} [length=10]
 */

export async function Encrypt_CryptSalt(
    text: string,
    length = 10
): Promise<string> {
    const salt = await bcryptjs.genSalt(length);
    const hashPassword = await bcryptjs.hash(text, salt);
    return hashPassword;
}

/**
 * @desc Compare the cipher
 * Likely the hash can be the encrypted password and text the password from client
 */

export async function Encrypt_CompareSalt(
    text: string,
    hash: string
): Promise<boolean> {
    const compare = await bcryptjs.compare(text, hash);
    return compare;
}

/**
 * @description unique identifier for the token
 */

export function Encrypt_GenerateJTI() {
    let jti = '';
    let possibleCharset =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 16; i++) {
        jti += possibleCharset.charAt(
            Math.floor(Math.random() * possibleCharset.length)
        );
    }

    return jti;
}

/**
 * @description generates unique code
 */

export function gen_date_code(radix = 32): string {
    return Date.now().toString(radix);
}
