import { Card, Inset } from '@radix-ui/themes';
import { Skeleton } from './skeleton';

type RecipeCardSkeletonProps = React.ComponentPropsWithoutRef<typeof Card>;

export const RecipeCardSkeleton = (props: RecipeCardSkeletonProps) => {
  return (
    <Card {...props}>
      <Inset clip={'padding-box'} side={'top'} pb={'current'}>
        <div className={'relative pb-[calc(100%/(3/2))]'}>
          <Skeleton
            className={'absolute left-0 top-0 h-full w-full rounded-b-[0px]'}
          />
        </div>
      </Inset>
      <Skeleton className={'h-7 w-1/2'} />
    </Card>
  );
};
