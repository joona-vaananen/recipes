import createMiddleware from 'next-intl/middleware';

import { defaultLocale, locales } from '@/i18n';
import { pathnames } from '@/navigation';

export default createMiddleware({ defaultLocale, locales, pathnames });

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
