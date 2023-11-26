'use client';

import { Box, Flex, Text, VisuallyHidden } from '@radix-ui/themes';
import { Star, StarHalf } from 'lucide-react';
import { useFormatter } from 'next-intl';
import { stringify } from 'qs';
import useSWR from 'swr';

import { fetcher } from '../../lib/utils/fetcher';

interface Rating {
  average?: number;
  count: number;
}

interface RecipeRatingClientProps
  extends React.ComponentPropsWithoutRef<typeof Flex> {
  rating: Rating;
  recipe: number;
  locale: string;
  translations: {
    ratingNone: string;
    ratingPlural: string;
    ratingSingular: string;
    scoreUnit: string;
  };
}

export const RecipeRatingClient = ({
  locale,
  rating: initialRating,
  recipe,
  translations,
  ...props
}: RecipeRatingClientProps) => {
  const format = useFormatter();

  const getKey = () => {
    return `/api/ratings/${recipe}${stringify(
      { locale },
      { addQueryPrefix: true, encodeValuesOnly: true }
    )}`;
  };

  const fetchRating = async (
    input: RequestInfo | URL,
    init?: RequestInit | undefined
  ) => {
    const { data } = (await fetcher(input, {
      ...init,
      cache: 'no-store',
    })) as { data: Rating | null };

    return data;
  };

  const { data: rating } = useSWR(getKey, {
    fallback: {
      [getKey()]: initialRating,
    },
    fallbackData: initialRating,
    fetcher: fetchRating,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
  }) as { data: Rating | null };

  const averageRating = rating?.average ?? initialRating?.average;
  const ratingCount = rating?.count ?? initialRating?.count ?? 0;

  const starCount =
    typeof averageRating === 'number' ? Math.round(averageRating * 2) / 2 : 0;

  return (
    <Flex align={'center'} gap={'2'} wrap={'wrap'} {...props}>
      {typeof averageRating === 'number' ? (
        <Text>
          {format.number(averageRating)}
          <VisuallyHidden>{`/5 ${translations.scoreUnit}`}</VisuallyHidden>
        </Text>
      ) : null}
      <Flex aria-hidden={true}>
        {Array.from({ length: Math.floor(starCount) }, (_, index) => (
          <Star
            className={'h-4 w-4 fill-accent-9 stroke-accent-9'}
            key={index}
          />
        ))}
        {starCount % 1 > 0 ? (
          <Box className={'relative h-4 w-4'}>
            <Star className={'absolute h-4 w-4'} />
            <StarHalf
              className={'absolute h-4 w-4 fill-accent-9 stroke-accent-9'}
            />
          </Box>
        ) : null}
        {Array.from({ length: 5 - Math.ceil(starCount) }, (_, index) => (
          <Star className={'h-4 w-4'} key={index} />
        ))}
      </Flex>
      <Text color={'gray'}>
        {ratingCount === 0
          ? translations.ratingNone
          : ratingCount === 1
          ? `${ratingCount} ${translations.ratingSingular}`
          : `${ratingCount} ${translations.ratingPlural}`}
      </Text>
    </Flex>
  );
};
