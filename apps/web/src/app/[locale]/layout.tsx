import { Flex, Theme } from '@radix-ui/themes';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { Raleway, Roboto_Slab } from 'next/font/google';
import { notFound } from 'next/navigation';

import {
  BASE_URL,
  GENERATE_STATIC_PARAMS,
  SITE_NAME,
  TIME_ZONE,
} from '@/constants';
import { apiClient } from '@/lib/api/client';
import { cn, locales } from '@recipes/ui';
import {
  Footer,
  Header,
  LocaleSwitcherProvider,
  UserProvider,
} from '@recipes/ui/src/components';

import './globals.css';

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
});

interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

// TODO: Create privacy policy page and link to it from footer
const Layout = async ({ children, params }: LayoutProps) => {
  if (!locales.some((locale) => locale === params.locale)) {
    notFound();
  }

  const { locale } = params;
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  const [header, footer] = await Promise.all([
    getHeaderData({ params }),
    getFooterData({ params }),
  ]);

  return (
    <html className={cn(robotoSlab.variable, raleway.variable)} lang={locale}>
      <body>
        <UserProvider>
          <NextIntlClientProvider
            locale={locale}
            messages={(({ Error }) => ({ Error }))(messages)}
            timeZone={TIME_ZONE}
          >
            <LocaleSwitcherProvider>
              <Theme accentColor={'ruby'}>
                <Flex className={'min-h-screen'} direction={'column'}>
                  <Header
                    items={header.attributes.items}
                    locale={locale}
                    logo={header.attributes.logo}
                  />
                  <main className={'flex-grow'}>{children}</main>
                  <Footer
                    copyright={footer.attributes.copyright}
                    logo={footer.attributes.logo}
                  />
                </Flex>
              </Theme>
            </LocaleSwitcherProvider>
          </NextIntlClientProvider>
        </UserProvider>
      </body>
    </html>
  );
};

export default Layout;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
};

// TODO: Disable for production
export const dynamic = 'force-dynamic';

export const generateStaticParams = GENERATE_STATIC_PARAMS
  ? () => {
      return locales.map((locale) => ({ locale }));
    }
  : undefined;

const getHeaderData = async ({ params }: Pick<LayoutProps, 'params'>) => {
  const { locale } = params;

  const {
    data: [header],
  } = await apiClient.getMany(
    {
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
    },
    { next: { revalidate: 600 } }
  );

  return header;
};

const getFooterData = async ({ params }: Pick<LayoutProps, 'params'>) => {
  const { locale } = params;

  const {
    data: [footer],
  } = await apiClient.getMany(
    {
      contentType: 'footer',
      parameters: {
        fields: ['copyright', 'id'],
        locale,
        populate: {
          logo: true,
        },
      },
    },
    { next: { revalidate: 600 } }
  );

  return footer;
};
