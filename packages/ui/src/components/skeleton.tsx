import { Box } from '@radix-ui/themes';
import { cn } from '..';

type SkeletonProps = React.ComponentPropsWithoutRef<typeof Box>;

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <Box
      className={cn('animate-pulse rounded-4 bg-grayA-3', className)}
      {...props}
    />
  );
};
