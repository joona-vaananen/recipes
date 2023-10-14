import createMiddleware from 'next-intl/middleware';

import { defaultLocale, locales, pathnames } from '@recipes/ui';

export default createMiddleware({ defaultLocale, locales, pathnames });

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
