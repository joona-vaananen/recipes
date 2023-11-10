import breakpoints from '@recipes/tailwind-config/breakpoints.json';

export const BREAKPOINTS = breakpoints;

export const ERROR_NAMES = {
  SERVER_ERROR: 'ServerError',
  UNIQUE_CONSTRAINT_ERROR: 'UniqueConstraintError',
  VALIDATION_ERROR: 'ValidationError',
};

export const TIME_ZONE = process.env.WEB_TIME_ZONE;
