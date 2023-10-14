import { getRequestConfig } from 'next-intl/server';

const requestConfig = getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
}));

export default requestConfig;
