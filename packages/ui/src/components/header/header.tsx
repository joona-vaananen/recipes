import { Container, Flex, Link, Separator } from '@radix-ui/themes';
import Image from 'next/image';

import type { Media } from '@recipes/api/src/common/interfaces/Media';
import { useTranslations } from 'next-intl';
import { HeaderDesktopNavigation } from '.';
import { Link as NextLink } from '../../lib/utils/navigation';
import { HeaderMobileNavigation } from './header-mobile-navigation';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  items: any;
  logo: {
    data: Media;
  };
}

export const Header = ({ items, logo, ...props }: HeaderProps) => {
  const t = useTranslations('Header');

  return (
    <header {...props}>
      <Container className={'container'} p={'4'}>
        <Flex align={'center'} gap={'4'} justify={'between'} {...props}>
          <Link asChild>
            <NextLink href={'/'}>
              <Image
                alt={logo.data.attributes.alternativeText ?? ''}
                blurDataURL={
                  'placeholder' in logo
                    ? (logo.placeholder as string)
                    : undefined
                }
                className={'h-10 w-auto'}
                height={logo.data.attributes.height}
                placeholder={'placeholder' in logo ? 'blur' : 'empty'}
                priority
                src={logo.data.attributes.url}
                width={logo.data.attributes.width}
              />
            </NextLink>
          </Link>
          <HeaderMobileNavigation
            items={items}
            logo={logo}
            translations={{
              closeMenu: t('closeMenu'),
              menuTitle: t('menuTitle'),
              openMenu: t('openMenu'),
            }}
          />
          <HeaderDesktopNavigation items={items} />
        </Flex>
      </Container>
      <Separator decorative size={'4'} />
    </header>
  );
};
