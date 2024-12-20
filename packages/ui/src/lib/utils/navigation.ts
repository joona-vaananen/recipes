import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from 'next-intl/navigation';

export const defaultLocale = 'en';

export const locales = ['en', 'fi'] as const;

export type Locale = (typeof locales)[number];

export const pathnames = {
  '/': {
    en: '/',
    fi: '/',
  },
  '/privacy-policy': {
    en: '/privacy-policy',
    fi: '/tietosuoja',
  },
  '/recipes': {
    en: '/recipes',
    fi: '/reseptit',
  },
  '/recipes/[slug]': {
    en: '/recipes/[slug]',
    fi: '/reseptit/[slug]',
  },
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames: pathnames as typeof pathnames & Record<string & {}, string>, // eslint-disable-line
  });
