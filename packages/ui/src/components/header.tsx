import { Flex, Link } from '@radix-ui/themes';
import Image from 'next/image';

import type { Media } from '@recipes/api/src/common/interfaces/Media';
import { cn } from '../lib/utils/cn';
import { Link as NextLink } from '../lib/utils/navigation';
import { DynamicZone } from './dynamic-zone';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  items: any;
  logo: {
    data: Media;
  };
}

export const Header = ({ className, items, logo, ...props }: HeaderProps) => {
  return (
    <Flex
      align={'center'}
      asChild
      className={cn('p-4', className)}
      gap={'4'}
      justify={'between'}
      {...props}
    >
      <header>
        <Link href={'/'}>
          <Image
            alt={logo.data.attributes.alternativeText ?? ''}
            blurDataURL={
              'placeholder' in logo ? (logo.placeholder as string) : undefined
            }
            className={'h-10 w-auto'}
            height={logo.data.attributes.height}
            placeholder={'placeholder' in logo ? 'blur' : 'empty'}
            priority
            src={logo.data.attributes.url}
            width={logo.data.attributes.width}
          />
        </Link>
        <nav>
          <Flex asChild gap={'4'}>
            <ul>
              <DynamicZone
                components={{
                  'header.home-page-item': ({ label }: { label: string }) => (
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
      </header>
    </Flex>
  );
};
