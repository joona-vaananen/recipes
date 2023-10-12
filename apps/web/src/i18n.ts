import { getRequestConfig } from 'next-intl/server';

export const defaultLocale = 'en';

export const locales = ['en', 'fi'];

const requestConfig = getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
}));

export default requestConfig;
