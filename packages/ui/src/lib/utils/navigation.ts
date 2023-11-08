import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from 'next-intl/navigation';

export const defaultLocale = 'en';

export const locales = ['en'] as const;

export type Locale = (typeof locales)[number];

export const pathnames = {
  '/recipes': {
    en: '/recipes',
  },
  '/recipes/[slug]': {
    en: '/recipes/[slug]',
  },
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames: pathnames as typeof pathnames & Record<string & {}, string>, // eslint-disable-line
  });
