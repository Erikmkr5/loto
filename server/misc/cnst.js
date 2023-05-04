import { config } from 'dotenv'

export const ENV_VARIABLES = config().parsed;

export const GLOBALS = {
    APP: 'APP',
    DB: 'DB',
    SERVER: 'SERVER',
    AUTH: 'AUTH'
};

export const SERVER_ERRORS = {
    UNKNOWN_ERROR: {status: 500, statusText: 'Unknown Error'},
    NOT_AUTHORIZED: {status: 401, statusText: 'Not Authorized'},
    BAD_REQUEST: {status: 403, statusText: 'Bad Request'},
    ALREADY_EXISTS: {status: 409, statusText: 'User with same EMAIL is already registered'}
};

export const DEFAULT_LIMIT = 90;
export const DEFAULT_SELECTION_LIMIT = 10;
