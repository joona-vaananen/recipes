import { Box, Flex, Grid, Text } from '@radix-ui/themes';
import { Timer } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';

interface RecipeTimeProps extends React.HTMLAttributes<HTMLDivElement> {
  cookTime?: number;
  prepTime?: number;
  restingTime?: number;
}

export const RecipeTime = ({
  className,
  cookTime,
  prepTime,
  restingTime,
  ...props
}: RecipeTimeProps) => {
  const t = useTranslations('RecipeTime');
  const format = useFormatter();

  if (
    typeof cookTime !== 'number' &&
    typeof prepTime !== 'number' &&
    typeof restingTime !== 'number'
  ) {
    return null;
  }

  return (
    <Flex
      className={className}
      direction={'column'}
      gap={'4'}
      justify={'between'}
      {...props}
    >
      <Flex align={'center'} gap={'2'}>
        <Timer className={'h-5 w-5'} />
        <Text weight={'bold'}>{t('time')}</Text>
      </Flex>
      <Grid
        asChild
        columns={{
          initial: '2',
          sm: '4',
        }}
        gap={'4'}
        width={'100%'}
      >
        <dl>
          {typeof prepTime === 'number' ? (
            <Box>
              <Text asChild color={'gray'}>
                <dt>{t('prepTime')}</dt>
              </Text>
              <Text asChild>
                <dd>
                  {format.number(prepTime, {
                    style: 'unit',
                    unit: 'minute',
                    unitDisplay: 'short',
                  })}
                </dd>
              </Text>
            </Box>
          ) : null}
          {typeof cookTime === 'number' ? (
            <Box>
              <Text asChild color={'gray'}>
                <dt>{t('cookTime')}</dt>
              </Text>
              <Text asChild>
                <dd>
                  {format.number(cookTime, {
                    style: 'unit',
                    unit: 'minute',
                    unitDisplay: 'short',
                  })}
                </dd>
              </Text>
            </Box>
          ) : null}
          {typeof restingTime === 'number' ? (
            <Box>
              <Text asChild color={'gray'}>
                <dt>{t('restingTime')}</dt>
              </Text>
              <Text asChild>
                <dd>
                  {format.number(restingTime, {
                    style: 'unit',
                    unit: 'minute',
                    unitDisplay: 'short',
                  })}
                </dd>
              </Text>
            </Box>
          ) : null}
          {typeof prepTime === 'number' ||
          typeof cookTime === 'number' ||
          typeof restingTime === 'number' ? (
            <Box>
              <Text asChild color={'gray'}>
                <dt>{t('totalTime')}</dt>
              </Text>
              <Text asChild>
                <dd>
                  {format.number(
                    (prepTime ?? 0) + (cookTime ?? 0) + (restingTime ?? 0),
                    {
                      style: 'unit',
                      unit: 'minute',
                      unitDisplay: 'short',
                    }
                  )}
                </dd>
              </Text>
            </Box>
          ) : null}
        </dl>
      </Grid>
    </Flex>
  );
};
