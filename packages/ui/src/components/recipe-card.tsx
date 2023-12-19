import {
  AspectRatio,
  Card,
  Flex,
  Heading,
  Inset,
  Text,
  VisuallyHidden,
} from '@radix-ui/themes';
import { Star, Timer } from 'lucide-react';
import { useFormatter } from 'next-intl';
import Image from 'next/image';

import type { Recipe_Plain } from '@recipes/api/src/api/recipe/content-types/recipe/recipe';
import type { Media } from '@recipes/api/src/common/interfaces/Media';
import { cn } from '../lib/utils/cn';
import { Link } from '../lib/utils/navigation';

type RecipeCardProps = React.ComponentPropsWithoutRef<typeof Card> &
  Pick<
    Recipe_Plain,
    | 'averageRating'
    | 'categories'
    | 'cookTime'
    | 'prepTime'
    | 'restingTime'
    | 'slug'
    | 'title'
  > & {
    image: Media['attributes'];
    sizes?: string;
    translations: {
      scoreUnit: string;
    };
  };

export const RecipeCard = ({
  averageRating,
  categories,
  className,
  cookTime,
  image,
  prepTime,
  restingTime,
  sizes,
  slug,
  title,
  translations,
  ...props
}: RecipeCardProps) => {
  const format = useFormatter();

  return (
    <Card className={cn('h-full', className)} {...props}>
      <Flex direction={'column'} height={'100%'}>
        {image ? (
          <Inset clip={'padding-box'} side={'top'} pb={'current'}>
            <AspectRatio ratio={3 / 2}>
              <Image
                alt={''}
                blurDataURL={
                  'placeholder' in image && image.placeholder
                    ? (image.placeholder as string)
                    : undefined
                }
                className={'object-cover'}
                fill
                placeholder={
                  'placeholder' in image && image.placeholder ? 'blur' : 'empty'
                }
                sizes={sizes ?? '100vw'}
                src={image.url}
              />
            </AspectRatio>
          </Inset>
        ) : null}
        <Flex direction={'column'} gap={'2'} grow={'1'}>
          {Array.isArray(categories) ? (
            <Text size={'2'} weight={'bold'}>
              {categories.map((category) => category.name).join(', ')}
            </Text>
          ) : null}
          <Link
            className={
              'before:absolute before:left-0 before:top-0 before:h-full before:w-full'
            }
            href={{
              pathname: '/recipes/[slug]',
              params: { slug },
            }}
          >
            <Heading as={'h3'} size={'6'} weight={'medium'}>
              {title}
            </Heading>
          </Link>
          <Flex align={'center'} justify={'between'} mt={'auto'}>
            <Flex align={'center'} gap={'2'}>
              {typeof prepTime === 'number' ||
              typeof cookTime === 'number' ||
              typeof restingTime === 'number' ? (
                <>
                  <Timer aria-hidden className={'h-4 w-4 stroke-accent-9'} />
                  <Text>
                    {format.number(
                      (prepTime ?? 0) + (cookTime ?? 0) + (restingTime ?? 0),
                      {
                        style: 'unit',
                        unit: 'minute',
                        unitDisplay: 'short',
                      }
                    )}
                  </Text>
                </>
              ) : null}
            </Flex>
            <Flex align={'center'} gap={'2'}>
              {typeof averageRating === 'number' ? (
                <>
                  <Star aria-hidden className={'h-4 w-4 stroke-accent-9'} />
                  <Text>
                    {format.number(averageRating)}
                    <VisuallyHidden>{` ${translations.scoreUnit}`}</VisuallyHidden>
                  </Text>
                </>
              ) : null}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
