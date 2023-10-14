import { Card, Inset, Text } from '@radix-ui/themes';
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
          <Image
            src={image.url}
            alt={''}
            width={image.width}
            height={image.height}
            sizes={sizes ?? '100vw'}
            placeholder={'placeholder' in image ? 'blur' : 'empty'}
            blurDataURL={
              'placeholder' in image ? (image.placeholder as string) : undefined
            }
          />
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
