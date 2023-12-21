'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

import { BREAKPOINTS } from '../../constants';
import { useWindowSize } from '../../hooks/use-window-size';
import { cn } from '../../lib/utils/cn';

type RecipeCarouselClientProps = React.HTMLAttributes<HTMLDivElement>;

export const RecipeCarouselClient = ({
  children,
  className,
  ...props
}: RecipeCarouselClientProps) => {
  const windowSize = useWindowSize();

  const [ref] = useEmblaCarousel(
    { dragFree: windowSize.width >= BREAKPOINTS.md },
    [WheelGesturesPlugin()]
  );

  return (
    <div className={cn('embla', className)} {...props} ref={ref}>
      {children}
    </div>
  );
};
