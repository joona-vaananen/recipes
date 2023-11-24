import breakpoints from '@recipes/tailwind-config/breakpoints.json';

export const BASE_URL =
  process.env.WEB_BASE_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://olisipa.com'
    : 'http://localhost:3000');

export const BREAKPOINTS = breakpoints;

export const DEFAULT_REVALIDATE = 60;

export const ERROR_NAMES = {
  NOT_FOUND: 'NotFound',
  SERVER_ERROR: 'ServerError',
  UNIQUE_CONSTRAINT_ERROR: 'UniqueConstraintError',
  VALIDATION_ERROR: 'ValidationError',
};

export const GENERATE_STATIC_PARAMS =
  process.env.WEB_GENERATE_STATIC_PARAMS === 'true';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const SITE_NAME = 'Olisipa';

export const TIME_ZONE = process.env.WEB_TIME_ZONE;

export const TOKEN = process.env.WEB_TOKEN;
