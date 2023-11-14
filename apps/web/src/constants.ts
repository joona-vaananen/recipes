import breakpoints from '@recipes/tailwind-config/breakpoints.json';

export const BASE_URL = process.env.WEB_BASE_URL || 'https://olisipa.com';

export const BREAKPOINTS = breakpoints;

export const DEFAULT_REVALIDATE = 60;

export const ERROR_NAMES = {
  SERVER_ERROR: 'ServerError',
  UNIQUE_CONSTRAINT_ERROR: 'UniqueConstraintError',
  VALIDATION_ERROR: 'ValidationError',
};

export const SITE_NAME = 'Olisipa';

export const TIME_ZONE = process.env.WEB_TIME_ZONE;
