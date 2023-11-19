import breakpoints from '@recipes/tailwind-config/breakpoints.json';

export const BREAKPOINTS = breakpoints;

export const BASE_URL =
  process.env.WEB_BASE_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://olisipa.com'
    : 'http://localhost:3000');

export const ERROR_NAMES = {
  SERVER_ERROR: 'ServerError',
  UNIQUE_CONSTRAINT_ERROR: 'UniqueConstraintError',
  VALIDATION_ERROR: 'ValidationError',
};

export const SITE_NAME = 'Olisipa';
