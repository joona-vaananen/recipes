import { Flex, Link } from '@radix-ui/themes';

import { cn } from '../../lib/utils/cn';
import { Link as NextLink } from '../../lib/utils/navigation';
import { DynamicZone } from '../dynamic-zone';

interface HeaderDesktopNavigationProps
  extends React.HTMLAttributes<HTMLElement> {
  items?: any;
}

export const HeaderDesktopNavigation = ({
  className,
  items,
  ...props
}: HeaderDesktopNavigationProps) => {
  return (
    <nav className={cn('hidden md:block', className)} {...props}>
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
  );
};
