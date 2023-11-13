import { BASE_URL } from '@/constants';
import { getPathname, locales, type Locale } from '@recipes/ui';

const pathnames = ['/', '/recipes'];

export const GET = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">
    ${generateUrls()}
  </urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
};

const generateUrls = () => {
  return locales
    .flatMap((locale) => {
      return pathnames.map((pathname) => {
        return `<url>
  <loc>${generateUrl(locale, pathname)}</loc>
  ${generateAlternates(pathname)}
</url>`;
      });
    })
    .join('\n');
};

const generateUrl = (locale: Locale, pathname: string) => {
  return `${BASE_URL}/${locale}${getPathname({
    locale,
    href: pathname,
  }).replace(/\/$/, '')}`;
};

const generateAlternates = (pathname: string) => {
  return locales.length > 1
    ? locales
        .map((locale) => {
          return `<xhtml:link
  rel="alternate"
  hreflang="${locale}"
  href="${generateUrl(locale, pathname)}"/>`;
        })
        .join('\n')
    : '';
};
