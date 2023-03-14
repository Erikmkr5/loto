import { config } from 'dotenv'

export const ENV_VARIABLES = config().parsed;

export const GLOBALS = {
    APP: 'APP',
    DB: 'DB',
    SERVER: 'SERVER'
};
