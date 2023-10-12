import { Box, Heading, Link, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Raleway, Roboto_Slab } from 'next/font/google';
import NextLink from 'next/link';

import './theme-config.css';

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
});

export const metadata: Metadata = {
  title: 'Recipes',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html className={`${robotoSlab.variable} ${raleway.variable}`} lang={'en'}>
      <body>
        <Theme accentColor={'ruby'}>
          <Box>
            <Link asChild>
              <NextLink href={'/'}>
                <Heading>Recipes</Heading>
              </NextLink>
            </Link>
          </Box>
          {children}
        </Theme>
      </body>
    </html>
  );
};

export default Layout;
