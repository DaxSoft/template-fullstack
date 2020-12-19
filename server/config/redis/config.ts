/*
:--------------------------------------------------------------------------
: Requirements
:--------------------------------------------------------------------------
*/

import dotenv from 'dotenv';
dotenv.config();

/*
:--------------------------------------------------------------------------
: Const
:--------------------------------------------------------------------------
*/

interface IConfigRedis {
    host: string;
    port: number | undefined;
}

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

/*
:--------------------------------------------------------------------------
: Bootstrap
:--------------------------------------------------------------------------
*/

const ConfigRedis: IConfigRedis = {
    host: REDIS_HOST,
    port: +REDIS_PORT,
};

export { ConfigRedis };
