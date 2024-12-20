'use client';

import { AccessibleIcon, Flex, IconButton, Text } from '@radix-ui/themes';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { stringify } from 'qs';

import { Skeleton } from '../skeleton';
import { useRecipeSearch } from './recipe-search-context';

interface RecipeSearchPaginationProps {
  page: number;
  searchParams: Record<string, string | string[] | null>;
  totalHits: number;
  totalPages: number;
  translations: {
    nextPage: string;
    page: string;
    previousPage: string;
  };
}

export const RecipeSearchPagination = ({
  page,
  searchParams,
  totalHits,
  totalPages,
  translations,
}: RecipeSearchPaginationProps) => {
  const { isSearching } = useRecipeSearch();
  const pathname = usePathname();
  const isEmpty = totalHits === 0;

  if (isSearching) {
    return (
      <Flex
        align={'center'}
        asChild
        className={'w-64'}
        gap={'4'}
        justify={'between'}
      >
        <nav>
          <IconButton disabled={page <= 1}>
            <AccessibleIcon label={translations.previousPage}>
              <ChevronLeft size={16} />
            </AccessibleIcon>
          </IconButton>
          <Flex align={'center'} gap={'2'}>
            <Text>{translations.page}</Text>
            <Skeleton className={'h-6 w-9'} />
          </Flex>
          <IconButton disabled={page >= totalPages}>
            <AccessibleIcon label={translations.nextPage}>
              <ChevronRight size={16} />
            </AccessibleIcon>
          </IconButton>
        </nav>
      </Flex>
    );
  }

  if (isEmpty) {
    return null;
  }

  return (
    <Flex
      align={'center'}
      asChild
      className={'w-64'}
      gap={'4'}
      justify={'between'}
    >
      <nav>
        <IconButton asChild disabled={page <= 1}>
          <Link
            href={`${pathname}${stringify(
              {
                ...searchParams,
                page: page > 2 ? page - 1 : undefined,
              },
              {
                addQueryPrefix: true,
                arrayFormat: 'repeat',
                encodeValuesOnly: true,
                skipNulls: true,
              }
            )}`}
          >
            <AccessibleIcon label={translations.previousPage}>
              <ChevronLeft size={16} />
            </AccessibleIcon>
          </Link>
        </IconButton>
        <Text>{`${translations.page} ${page} / ${totalPages}`}</Text>
        <IconButton asChild disabled={page >= totalPages}>
          <Link
            href={`${pathname}${stringify(
              {
                ...searchParams,
                page: page < totalPages ? page + 1 : undefined,
              },
              {
                addQueryPrefix: true,
                arrayFormat: 'repeat',
                encodeValuesOnly: true,
              }
            )}`}
          >
            <AccessibleIcon label={translations.nextPage}>
              <ChevronRight size={16} />
            </AccessibleIcon>
          </Link>
        </IconButton>
      </nav>
    </Flex>
  );
};
