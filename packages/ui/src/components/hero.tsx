import {
  Container,
  Flex,
  Heading,
  Section,
  Text,
  Theme,
} from '@radix-ui/themes';
import Image from 'next/image';

import type { Hero as IHero } from '@recipes/api/src/components/ui/interfaces/Hero';
import { cn } from '../lib/utils/cn';

type HeroProps = React.ComponentPropsWithoutRef<typeof Section> & IHero;

export const Hero = ({
  className,
  backgroundImage,
  description,
  title,
  ...props
}: HeroProps) => {
  const hero = (
    <Flex asChild align={'center'}>
      <Section
        position={'relative'}
        className={cn('min-h-[50vh]', className)}
        {...props}
      >
        <Flex align={'center'} height={'100%'} width={'100%'}>
          <Container className={'container'}>
            {title ? (
              <Heading
                className={
                  'text-[#fff] [text-shadow:_4px_4px_#000,_2px_-2px_#000,_-2px_-2px_#000,_-2px_2px_#000,_2px_2px_#000]'
                }
                size={'9'}
              >
                {title}
              </Heading>
            ) : null}
            {description ? (
              <Text as={'p'} mt={'9'} size={'5'}>
                {description}
              </Text>
            ) : null}
          </Container>
        </Flex>
        {backgroundImage?.data ? (
          <>
            <Image
              className={
                'absolute left-0 top-0 -z-20 h-full w-full object-cover'
              }
              src={backgroundImage.data.attributes.url}
              alt={''}
              width={backgroundImage.data.attributes.width}
              height={backgroundImage.data.attributes.height}
              sizes={'100vw'}
              quality={100}
              placeholder={
                'placeholder' in backgroundImage.data.attributes
                  ? 'blur'
                  : 'empty'
              }
              blurDataURL={
                'placeholder' in backgroundImage.data.attributes
                  ? (backgroundImage.data.attributes.placeholder as string)
                  : undefined
              }
              priority
            />
            <div
              className={
                'absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-b from-transparent to-accent-1'
              }
            />
          </>
        ) : null}
      </Section>
    </Flex>
  );

  return backgroundImage?.data ? (
    <Theme appearance={'dark'} hasBackground={false}>
      {hero}
    </Theme>
  ) : (
    hero
  );
};
