import { Container, Flex, Heading, Section, Text } from '@radix-ui/themes';
import Image from 'next/image';

import type { MediaWithPlaceholder } from '@recipes/api/src/common/interfaces/MediaWithPlaceholder';
import type { Hero as IHero } from '@recipes/api/src/components/ui/interfaces/Hero';
import { cn } from '../lib/utils/cn';

type HeroProps = React.ComponentPropsWithoutRef<typeof Section> &
  IHero & { backgroundImage: MediaWithPlaceholder };

export const Hero = ({
  className,
  backgroundImage,
  description,
  title,
  ...props
}: HeroProps) => {
  const hasBackgroundImage = !!backgroundImage?.data;

  return (
    <Section className={cn('relative', className)} {...props}>
      <Container px={'4'}>
        <Flex direction={'column'} gap={'9'}>
          <Heading
            className={cn({ 'text-accent-1': hasBackgroundImage })}
            size={{
              initial: '8',
              md: '9',
            }}
          >
            {title}
          </Heading>
          {description ? (
            <Text
              as={'p'}
              className={cn({ 'text-accent-1': hasBackgroundImage })}
              size={'5'}
            >
              {description}
            </Text>
          ) : null}
        </Flex>
      </Container>
      {hasBackgroundImage ? (
        <>
          <Image
            className={'absolute left-0 top-0 -z-20 h-full w-full object-cover'}
            src={backgroundImage.data.attributes.url}
            alt={''}
            width={backgroundImage.data.attributes.width}
            height={backgroundImage.data.attributes.height}
            sizes={'100vw'}
            quality={100}
            placeholder={'blur'}
            blurDataURL={backgroundImage.data.attributes.placeholder}
          />
          <div
            className={
              'absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-b from-transparent from-50% to-gray-12'
            }
          />
        </>
      ) : null}
    </Section>
  );
};
