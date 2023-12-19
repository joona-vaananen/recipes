import { AspectRatio, Card, Flex, Inset } from '@radix-ui/themes';

import { Skeleton } from './skeleton';

type RecipeCardSkeletonProps = React.ComponentPropsWithoutRef<typeof Card>;

export const RecipeCardSkeleton = (props: RecipeCardSkeletonProps) => {
  return (
    <Card className={'h-full'} {...props}>
      <Flex direction={'column'} height={'100%'}>
        <Inset clip={'padding-box'} side={'top'} pb={'current'}>
          <AspectRatio ratio={3 / 2}>
            <Skeleton
              className={'absolute left-0 top-0 h-full w-full rounded-b-[0px]'}
            />
          </AspectRatio>
        </Inset>
        <Flex direction={'column'} gap={'2'} grow={'1'}>
          <Skeleton className={'h-5 w-1/2'} />
          <Skeleton className={'h-[30px] w-1/2'} />
          <Flex align={'center'} justify={'between'} mt={'auto'}>
            <Skeleton className={'h-6 w-20'} />
            <Skeleton className={'h-6 w-16'} />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
