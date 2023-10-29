'use client';

import { AccessibleIcon, Flex, IconButton, Text } from '@radix-ui/themes';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { stringify } from 'qs';

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
  const pathname = usePathname();

  if (totalHits === 0) {
    return null;
  }

  return (
    <Flex align={'center'} asChild gap={'4'}>
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
              <ChevronLeft />
            </AccessibleIcon>
          </Link>
        </IconButton>
        <Text>{translations.page}</Text>
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
              <ChevronRight />
            </AccessibleIcon>
          </Link>
        </IconButton>
      </nav>
    </Flex>
  );
};
