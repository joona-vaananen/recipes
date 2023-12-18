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
import { CtaButton } from './cta-button';

type HeroProps = React.ComponentPropsWithoutRef<typeof Section> &
  Partial<IHero>;

export const Hero = ({
  children,
  className,
  ctaButtons,
  backgroundImage,
  description,
  title,
  ...props
}: HeroProps) => {
  const hero = (
    <Flex asChild align={'center'}>
      <Section
        className={cn({
          'print:pb-0 print:pt-10': true,
          'h-hero print:min-h-[auto]': !!backgroundImage?.data,
          ...(className ? { [className]: true } : undefined),
        })}
        position={'relative'}
        size={'2'}
        {...props}
      >
        <Flex align={'center'} height={'100%'} width={'100%'}>
          <Container className={'max-w-full'} px={'4'}>
            {title ? (
              <Heading
                className={
                  'text-[#fff] [text-shadow:_4px_4px_#000,_2px_-2px_#000,_-2px_-2px_#000,_-2px_2px_#000,_2px_2px_#000] last:mb-0 print:mb-10 print:text-[#000] print:[text-shadow:none]'
                }
                mb={'9'}
                size={'9'}
              >
                {title}
              </Heading>
            ) : null}
            {description ? (
              <Text
                as={'p'}
                className={'last:mb-0 print:text-[#000]'}
                mb={'5'}
                size={'5'}
              >
                {description}
              </Text>
            ) : null}
            {Array.isArray(ctaButtons) && ctaButtons.length > 0 ? (
              <Flex
                align={'center'}
                className={'print:hidden'}
                gap={'4'}
                wrap={'wrap'}
              >
                {ctaButtons.map(({ id, text, url, variant }) => {
                  return (
                    <CtaButton
                      id={id}
                      key={id}
                      text={text}
                      url={url}
                      variant={variant}
                    />
                  );
                })}
              </Flex>
            ) : null}
            {children}
          </Container>
        </Flex>
        {backgroundImage?.data ? (
          <>
            <Image
              className={
                'absolute left-0 right-0 top-0 -z-20 mx-auto h-full w-full max-w-[1640px] object-cover print:hidden'
              }
              src={backgroundImage.data.attributes.url}
              alt={''}
              width={backgroundImage.data.attributes.width}
              height={backgroundImage.data.attributes.height}
              sizes={'100vw'}
              quality={100}
              placeholder={
                'placeholder' in backgroundImage.data.attributes &&
                backgroundImage.data.attributes.placeholder
                  ? 'blur'
                  : 'empty'
              }
              blurDataURL={
                'placeholder' in backgroundImage.data.attributes &&
                backgroundImage.data.attributes.placeholder
                  ? (backgroundImage.data.attributes.placeholder as string)
                  : undefined
              }
              priority
            />
            <div
              className={
                'absolute left-0 right-0 top-0 -z-10 mx-auto h-full w-full max-w-[1640px] bg-gradient-to-b from-transparent to-[var(--color-page-background)] print:hidden'
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
