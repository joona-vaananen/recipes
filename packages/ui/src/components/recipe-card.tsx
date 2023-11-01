import { AspectRatio, Card, Inset, Text } from '@radix-ui/themes';
import Image from 'next/image';

import type { Recipe_Plain } from '@recipes/api/src/api/recipe/content-types/recipe/recipe';
import type { Media } from '@recipes/api/src/common/interfaces/Media';
import { Link } from '../lib/utils/navigation';

type RecipeCardProps = React.ComponentPropsWithoutRef<typeof Card> &
  Pick<Recipe_Plain, 'slug' | 'title'> & {
    image: Media['attributes'];
    sizes?: string;
  };

export const RecipeCard = ({
  title,
  image,
  sizes,
  slug,
  ...props
}: RecipeCardProps) => {
  return (
    <Card {...props}>
      {image ? (
        <Inset clip={'padding-box'} side={'top'} pb={'current'}>
          <AspectRatio ratio={3 / 2}>
            <Image
              alt={''}
              blurDataURL={
                'placeholder' in image
                  ? (image.placeholder as string)
                  : undefined
              }
              className={'object-cover'}
              fill
              placeholder={'placeholder' in image ? 'blur' : 'empty'}
              sizes={sizes ?? '100vw'}
              src={image.url}
            />
          </AspectRatio>
        </Inset>
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
        <Text asChild size={'5'}>
          <h3>{title}</h3>
        </Text>
      </Link>
    </Card>
  );
};
