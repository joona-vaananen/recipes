import breakpoints from '@recipes/tailwind-config/breakpoints.json';

export const BREAKPOINTS = breakpoints;

export const BASE_URL =
  process.env.WEB_BASE_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://olisipa.com'
    : 'http://localhost:3000');

export const ERROR_NAMES = {
  NOT_FOUND: 'NotFound',
  SERVER_ERROR: 'ServerError',
  UNIQUE_CONSTRAINT_ERROR: 'UniqueConstraintError',
  VALIDATION_ERROR: 'ValidationError',
};

export const GOOGLE_RECAPTCHA_SITE_KEY =
  process.env.WEB_GOOGLE_RECAPTCHA_SITE_KEY ?? '';

export const SITE_NAME = 'Olisipa';
