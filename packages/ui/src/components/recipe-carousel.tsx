'use client';

import { Container, Section } from '@radix-ui/themes';
import useEmblaCarousel from 'embla-carousel-react';

export const RecipeCarousel = () => {
  const [ref] = useEmblaCarousel();

  return (
    <Section>
      <Container className={'container'}>
        <div className={'embla overflow-hidden'} ref={ref}>
          <div className={'embla__container flex gap-3'}>
            <div className={'embla__slide h-[300px] min-w-[300px] bg-gray-4'}>
              {'Slide 1'}
            </div>
            <div className={'embla__slide h-[300px] min-w-[300px] bg-gray-4'}>
              {'Slide 2'}
            </div>
            <div className={'embla__slide h-[300px] min-w-[300px] bg-gray-4'}>
              {'Slide 3'}
            </div>
            <div className={'embla__slide h-[300px] min-w-[300px] bg-gray-4'}>
              {'Slide 4'}
            </div>
            <div className={'embla__slide h-[300px] min-w-[300px] bg-gray-4'}>
              {'Slide 5'}
            </div>
            <div className={'embla__slide h-[300px] min-w-[300px] bg-gray-4'}>
              {'Slide 6'}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
