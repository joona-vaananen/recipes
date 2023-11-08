import { Flex, Theme } from '@radix-ui/themes';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Raleway, Roboto_Slab } from 'next/font/google';
import { notFound } from 'next/navigation';

import { TIME_ZONE } from '@/constants';
import { apiClient } from '@/lib/api/client';
import { locales } from '@recipes/ui';
import { Footer, Header, UserProvider } from '@recipes/ui/src/components';

import './globals.css';

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
  title: {
    default: 'Olisipa',
    template: '%s | Olisipa',
  },
};

interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

const Layout = async ({ children, params }: LayoutProps) => {
  const { locale } = params;

  if (!locales.includes(locale)) {
    notFound();
  }

  unstable_setRequestLocale(locale);

  const [header, footer] = await Promise.all([
    getHeaderData({ params }),
    getFooterData({ params }),
  ]);

  return (
    <html
      className={`${robotoSlab.variable} ${raleway.variable}`}
      lang={locale}
    >
      <body>
        <UserProvider>
          <NextIntlClientProvider timeZone={TIME_ZONE}>
            <Theme accentColor={'ruby'}>
              <Flex className={'min-h-screen'} direction={'column'}>
                <Header
                  items={header.attributes.items}
                  logo={header.attributes.logo}
                />
                <main className={'flex-grow'}>{children}</main>
                <Footer
                  copyright={footer.attributes.copyright}
                  logo={footer.attributes.logo}
                />
              </Flex>
            </Theme>
          </NextIntlClientProvider>
        </UserProvider>
      </body>
    </html>
  );
};

export default Layout;

const getHeaderData = async ({ params }: Pick<LayoutProps, 'params'>) => {
  const { locale } = params;

  const {
    data: [header],
  } = await apiClient.getMany({
    contentType: 'header',
    parameters: {
      fields: ['id'],
      locale,
      populate: {
        items: {
          on: {
            'header.home-page-item': {
              fields: ['id', 'label'],
            },
            'header.page-item': {
              fields: ['label'],
              populate: {
                page: {
                  fields: ['id', 'slug'],
                },
              },
            },
            'header.recipe-search-page-item': {
              fields: ['id', 'label'],
            },
          },
        },
        logo: true,
      },
    },
  });

  return header;
};

const getFooterData = async ({ params }: Pick<LayoutProps, 'params'>) => {
  const { locale } = params;

  const {
    data: [footer],
  } = await apiClient.getMany({
    contentType: 'footer',
    parameters: {
      fields: ['copyright', 'id'],
      locale,
      populate: {
        logo: true,
      },
    },
  });

  return footer;
};
