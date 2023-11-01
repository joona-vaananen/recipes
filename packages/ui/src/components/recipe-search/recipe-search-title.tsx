'use client';

import { Flex, Heading } from '@radix-ui/themes';

import { Skeleton } from '../skeleton';
import { useRecipeSearch } from './recipe-search-context';

interface RecipeSearchTitleProps {
  hitsPerPage: number;
  page: number;
  title: string;
  totalHits: number;
}

export const RecipeSearchTitle = ({
  hitsPerPage,
  page,
  title,
  totalHits,
}: RecipeSearchTitleProps) => {
  const { isSearching } = useRecipeSearch();
  const isEmpty = totalHits === 0;

  if (isSearching) {
    return (
      <Flex align={'center'} gap={'4'}>
        <Heading size={'7'}>{title}</Heading>
        <Skeleton className={'h-[30px] w-14'} />
      </Flex>
    );
  }

  if (isEmpty) {
    <Flex align={'center'} gap={'4'}>
      <Heading size={'7'}>{title}</Heading>
    </Flex>;
  }

  return (
    <Flex align={'center'} gap={'4'}>
      <Heading size={'7'}>{title}</Heading>
      <Heading asChild color={'ruby'}>
        <span>{`${Math.min(
          hitsPerPage * page,
          totalHits
        )} / ${totalHits}`}</span>
      </Heading>
    </Flex>
  );
};
