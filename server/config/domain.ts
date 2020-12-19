/*
:--------------------------------------------------------------------------
: Requirements
:--------------------------------------------------------------------------
*/

import dotenv from 'dotenv';
dotenv.config();
import { isDeploying } from './is_deploying';

/*
:--------------------------------------------------------------------------
: Overall use toward server
:--------------------------------------------------------------------------
*/

const variablesDomain = () => {
    const checkoutProduction = isDeploying();

    const PORT = checkoutProduction
        ? process.env.DOMAIN_PORT
        : process.env.DOMAIN_LOCAL_PORT;

    return {
        HOST: checkoutProduction
            ? process.env.DOMAIN_HOST
            : process.env.DOMAIN_LOCAL_HOST,
        PORT: parseInt(String(PORT)),
    };
};

export default variablesDomain();
