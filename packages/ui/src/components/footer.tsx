import { Container, Flex, Link, Separator, Text } from '@radix-ui/themes';
import Image from 'next/image';

import type { Media } from '@recipes/api/src/common/interfaces/Media';
import { Link as NextLink } from '../lib/utils/navigation';

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  copyright: string;
  logo: {
    data: Media;
  };
}

export const Footer = ({ copyright, logo, ...props }: FooterProps) => {
  return (
    <footer {...props}>
      <Separator decorative size={'4'} />
      <Container className={'container'} p={'4'}>
        <Flex align={'center'} gap={'4'} justify={'between'}>
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
                src={logo.data.attributes.url}
                width={logo.data.attributes.width}
              />
            </NextLink>
          </Link>
          <Text>{copyright}</Text>
        </Flex>
      </Container>
    </footer>
  );
};
