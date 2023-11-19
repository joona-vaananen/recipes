import { Box, Flex, Text, VisuallyHidden } from '@radix-ui/themes';
import { Star, StarHalf } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';

interface RatingProps extends React.ComponentPropsWithoutRef<typeof Flex> {
  averageRating?: number;
  ratingCount: number;
}

export const Rating = ({
  averageRating,
  ratingCount,
  ...props
}: RatingProps) => {
  const t = useTranslations('Rating');
  const format = useFormatter();

  const starCount =
    typeof averageRating === 'number' ? Math.round(averageRating * 2) / 2 : 0;

  return (
    <Flex align={'center'} gap={'2'} {...props}>
      {typeof averageRating === 'number' ? (
        <Text>
          {format.number(averageRating)}
          <VisuallyHidden>{`/5 ${t('scoreUnit')}`}</VisuallyHidden>
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
      <Text color={'gray'}>{t('ratings', { ratingCount })}</Text>
    </Flex>
  );
};
