'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

import { cn } from '../../lib/utils/cn';

type RecipeCarouselClientProps = React.HTMLAttributes<HTMLDivElement>;

export const RecipeCarouselClient = ({
  children,
  className,
  ...props
}: RecipeCarouselClientProps) => {
  const [ref] = useEmblaCarousel({ dragFree: true }, [WheelGesturesPlugin()]);

  return (
    <div className={cn('embla', className)} {...props} ref={ref}>
      {children}
    </div>
  );
};
