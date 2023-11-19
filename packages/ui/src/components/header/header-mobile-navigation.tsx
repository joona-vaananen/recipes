'use client';

import {
  AccessibleIcon,
  Container,
  Dialog,
  Flex,
  IconButton,
  Inset,
  Link,
  Separator,
  VisuallyHidden,
} from '@radix-ui/themes';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

import type { Media } from '@recipes/api/src/common/interfaces/Media';
import { useEffect, useState } from 'react';
import { BREAKPOINTS } from '../../constants';
import { Link as NextLink } from '../../lib/utils/navigation';
import { DynamicZone } from '../dynamic-zone';

interface HeaderMobileNavigationProps
  extends React.HTMLAttributes<HTMLElement> {
  items: any;
  logo: {
    data: Media;
  };
  translations: {
    closeMenu: string;
    menuTitle: string;
    openMenu: string;
  };
}

export const HeaderMobileNavigation = ({
  className,
  items,
  logo,
  translations,
  ...props
}: HeaderMobileNavigationProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onWindowResize = () => {
      if (window.innerWidth >= BREAKPOINTS.md) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', onWindowResize);

    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={'md:hidden'}>
        <IconButton variant={'ghost'}>
          <AccessibleIcon label={translations.openMenu}>
            <Menu className={'h-6 w-6'} />
          </AccessibleIcon>
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content
        className={
          'absolute bottom-0 left-0 right-0 top-0 !max-h-none !max-w-none !rounded-[0] sm:left-1/2 sm:w-1/2 md:hidden'
        }
      >
        <Inset clip={'padding-box'}>
          <Container className={'container'} p={'4'}>
            <VisuallyHidden>
              <Dialog.Title>{translations.menuTitle}</Dialog.Title>
            </VisuallyHidden>
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
              <Dialog.Close>
                <IconButton variant={'ghost'}>
                  <AccessibleIcon label={translations.closeMenu}>
                    <X className={'h-6 w-6'} />
                  </AccessibleIcon>
                </IconButton>
              </Dialog.Close>
            </Flex>
          </Container>
          <Separator size={'4'} />
          <Container className={'container'} p={'4'}>
            <nav className={className} {...props}>
              <Flex asChild direction={'column'} gap={'4'}>
                <ul>
                  <DynamicZone
                    components={{
                      'header.home-page-item': ({
                        label,
                      }: {
                        label: string;
                      }) => (
                        <li>
                          <Link asChild>
                            <NextLink href={'/'}>{label}</NextLink>
                          </Link>
                        </li>
                      ),
                      'header.page-item': ({
                        label,
                        page,
                      }: {
                        label: string;
                        page: { data: { attributes: { slug: string } } };
                      }) => (
                        <li>
                          <Link asChild>
                            <NextLink href={`/${page.data.attributes.slug}`}>
                              {label}
                            </NextLink>
                          </Link>
                        </li>
                      ),
                      'header.recipe-search-page-item': ({
                        label,
                      }: {
                        label: string;
                      }) => (
                        <li>
                          <Link asChild>
                            <NextLink href={'/recipes'}>{label}</NextLink>
                          </Link>
                        </li>
                      ),
                    }}
                  >
                    {items}
                  </DynamicZone>
                </ul>
              </Flex>
            </nav>
          </Container>
        </Inset>
      </Dialog.Content>
    </Dialog.Root>
  );
};