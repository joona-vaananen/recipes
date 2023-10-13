import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from 'next-intl/navigation';

import { locales } from '@/i18n';

export const pathnames = {
  '/recipes': {
    en: '/recipes',
  },
  '/recipes/[slug]': {
    en: '/recipes/[slug]',
  },
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, pathnames });
