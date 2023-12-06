import { Container, Flex, Link, Separator } from '@radix-ui/themes';
import Image from 'next/image';

import type { Media } from '@recipes/api/src/common/interfaces/Media';
import { useTranslations } from 'next-intl';
import { Link as NextLink } from '../../lib/utils/navigation';
import { LocaleSwitcher } from '../locale-switcher';
import { ThemeSwitcher } from '../theme-switcher';
import { HeaderDesktopNavigation } from './header-desktop-navigation';
import { HeaderMobileNavigation } from './header-mobile-navigation';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  items: any;
  locale: string;
  logo: {
    data: Media;
  };
}

export const Header = ({ items, locale, logo, ...props }: HeaderProps) => {
  const t = useTranslations('Header');

  return (
    <header {...props}>
      <Container className={'max-w-full'} px={'4'} py={'2'}>
        <Flex align={'center'} gap={'4'} justify={'between'} {...props}>
          <Link asChild>
            <NextLink href={'/'}>
              <Image
                alt={logo.data.attributes.alternativeText ?? ''}
                blurDataURL={
                  'placeholder' in logo && logo.placeholder
                    ? (logo.placeholder as string)
                    : undefined
                }
                className={'h-14 w-auto'}
                height={logo.data.attributes.height}
                placeholder={
                  'placeholder' in logo && logo.placeholder ? 'blur' : 'empty'
                }
                priority
                quality={100}
                src={logo.data.attributes.url}
                width={logo.data.attributes.width}
              />
            </NextLink>
          </Link>
          <Flex align={'center'} className={'print:hidden'} gap={'4'}>
            <HeaderDesktopNavigation items={items} />
            <LocaleSwitcher locale={locale} />
            <ThemeSwitcher />
            <HeaderMobileNavigation
              items={items}
              logo={logo}
              translations={{
                closeMenu: t('closeMenu'),
                menuTitle: t('menuTitle'),
                openMenu: t('openMenu'),
              }}
            />
          </Flex>
        </Flex>
      </Container>
      <Separator decorative size={'4'} />
    </header>
  );
};
