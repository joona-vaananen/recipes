import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Raleway, Roboto_Slab } from 'next/font/google';
import { notFound } from 'next/navigation';

import { locales } from '@/i18n';
import './globals.css';
import './theme-config.css';

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
});

// export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const metadata: Metadata = {
  title: 'Recipes',
};

interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

const Layout = ({ children, params }: LayoutProps) => {
  const { locale } = params;

  if (!locales.includes(locale)) {
    notFound();
  }

  unstable_setRequestLocale(locale);

  return (
    <html
      className={`${robotoSlab.variable} ${raleway.variable}`}
      lang={locale}
    >
      <body>
        <Theme accentColor={'ruby'}>{children}</Theme>
      </body>
    </html>
  );
};

export default Layout;
