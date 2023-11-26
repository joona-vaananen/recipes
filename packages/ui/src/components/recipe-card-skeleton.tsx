import { AspectRatio, Card, Grid, Inset } from '@radix-ui/themes';

import { Skeleton } from './skeleton';

type RecipeCardSkeletonProps = React.ComponentPropsWithoutRef<typeof Card>;

export const RecipeCardSkeleton = (props: RecipeCardSkeletonProps) => {
  return (
    <Card className={'h-full'} {...props}>
      <Inset clip={'padding-box'} side={'top'} pb={'current'}>
        <AspectRatio ratio={3 / 2}>
          <Skeleton
            className={'absolute left-0 top-0 h-full w-full rounded-b-[0px]'}
          />
        </AspectRatio>
      </Inset>
      <Grid columns={'2'} gap={'2'}>
        <Skeleton className={'h-5 w-1/2'} />
        <Skeleton className={'col-span-full h-[30px] w-1/2'} />
        <Skeleton className={'mr-auto h-6 w-20'} />
        <Skeleton className={'ml-auto h-6 w-16'} />
      </Grid>
    </Card>
  );
};
