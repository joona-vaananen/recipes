import createMiddleware from 'next-intl/middleware';

import {
  defaultLocale,
  locales,
  pathnames,
} from '@recipes/ui/src/lib/utils/navigation';

export default createMiddleware({
  alternateLinks: false,
  defaultLocale,
  locales,
  pathnames,
});

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
