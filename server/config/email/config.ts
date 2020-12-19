import dotenv from 'dotenv';
dotenv.config();

/*
:--------------------------------------------------------------------------
: Config
:--------------------------------------------------------------------------
*/

const EMAIL_HOST: string =
    process.env.EMAIL_SMTP_SERVER || 'smtp.hostinger.com.br';
const EMAIL_PORT: number = parseInt(String(process.env.EMAIL_SMTP_PORT)) || 587;
const EMAIL_USER: string = process.env.EMAIL_USER || '';
const EMAIL_PASSWORD: string = process.env.EMAIL_PASSWORD || '';
const EMAIL_URL_ROUTE: string = process.env.EMAIL_URI_CHECKOUT || '';

export { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_USER, EMAIL_PORT, EMAIL_URL_ROUTE };
