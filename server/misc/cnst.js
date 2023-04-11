import { config } from 'dotenv'

export const ENV_VARIABLES = config().parsed;

export const GLOBALS = {
    APP: 'APP',
    DB: 'DB',
    SERVER: 'SERVER'
};

export const DEFAULT_LIMIT = 90;
export const DEFAULT_SELECTION_LIMIT = 10;
