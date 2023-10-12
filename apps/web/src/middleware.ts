import createMiddleware from 'next-intl/middleware';

import { defaultLocale, locales } from '@/i18n';

export default createMiddleware({ defaultLocale, locales });

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
