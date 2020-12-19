/*
:--------------------------------------------------------------------------
: Requirements
:--------------------------------------------------------------------------
*/

import dotenv from 'dotenv';
dotenv.config();

const IS_PRODUCTION = !!process.env.PRODUCTION
    ? eval(process.env.PRODUCTION)
    : false;

/*
:--------------------------------------------------------------------------
: Overall use toward server
:--------------------------------------------------------------------------
*/

export function isDeploying(): boolean {
    return IS_PRODUCTION;
}
