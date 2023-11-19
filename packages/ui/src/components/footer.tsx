import {
  AccessibleIcon,
  Container,
  Flex,
  IconButton,
  Link,
  Separator,
  Text,
} from '@radix-ui/themes';
import Image from 'next/image';

import type { Media } from '@recipes/api/src/common/interfaces/Media';
import { Facebook, Instagram, Pinterest, TikTok, X, YouTube } from '.';
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
        <Flex
          direction={'column'}
          align={{
            initial: 'center',
            sm: 'stretch',
          }}
          gap={'4'}
        >
          <Flex
            align={'center'}
            direction={{
              initial: 'column',
              sm: 'row',
            }}
            gap={'4'}
            justify={'between'}
          >
            <Link asChild>
              <NextLink className={'shrink-0'} href={'/'}>
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
            <Flex gap={'4'}>
              <IconButton asChild radius={'full'}>
                <a
                  href={'https://facebook.com/olisipacom'}
                  rel={'noopener noreferrer'}
                  target={'_blank'}
                >
                  <AccessibleIcon label={'Facebook'}>
                    <Facebook className={'h-4 w-4 fill-[#fff]'} />
                  </AccessibleIcon>
                </a>
              </IconButton>
              <IconButton asChild radius={'full'}>
                <a
                  href={'https://instagram.com/olisipacom'}
                  rel={'noopener noreferrer'}
                  target={'_blank'}
                >
                  <AccessibleIcon label={'Instagram'}>
                    <Instagram className={'h-4 w-4 fill-[#fff]'} />
                  </AccessibleIcon>
                </a>
              </IconButton>
              <IconButton asChild radius={'full'}>
                <a
                  href={'https://pinterest.com/olisipacom'}
                  rel={'noopener noreferrer'}
                  target={'_blank'}
                >
                  <AccessibleIcon label={'Pinterest'}>
                    <Pinterest className={'h-4 w-4 fill-[#fff]'} />
                  </AccessibleIcon>
                </a>
              </IconButton>
              <IconButton asChild radius={'full'}>
                <a
                  href={'https://tiktok.com/@olisipacom'}
                  rel={'noopener noreferrer'}
                  target={'_blank'}
                >
                  <AccessibleIcon label={'TikTok'}>
                    <TikTok className={'h-4 w-4 fill-[#fff]'} />
                  </AccessibleIcon>
                </a>
              </IconButton>
              <IconButton asChild radius={'full'}>
                <a
                  href={'https://x.com/olisipacom'}
                  rel={'noopener noreferrer'}
                  target={'_blank'}
                >
                  <AccessibleIcon label={'X'}>
                    <X className={'h-4 w-4 fill-[#fff]'} />
                  </AccessibleIcon>
                </a>
              </IconButton>
              <IconButton asChild radius={'full'}>
                <a
                  href={'https://youtube.com/@olisipacom'}
                  rel={'noopener noreferrer'}
                  target={'_blank'}
                >
                  <AccessibleIcon label={'YouTube'}>
                    <YouTube className={'h-4 w-4 fill-[#fff]'} />
                  </AccessibleIcon>
                </a>
              </IconButton>
            </Flex>
          </Flex>
          <Text>{copyright}</Text>
        </Flex>
      </Container>
    </footer>
  );
};
