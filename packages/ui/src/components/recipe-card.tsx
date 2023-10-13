import { Card, Heading, Inset } from '@radix-ui/themes';

import type { Recipe_Plain } from '@recipes/api/src/api/recipe/content-types/recipe/recipe';
import type { Media } from '@recipes/api/src/common/interfaces/Media';
import Image from 'next/image';
import Link from 'next/link';

type RecipeCardProps = React.ComponentPropsWithoutRef<typeof Card> &
  Pick<Recipe_Plain, 'slug' | 'title'> & {
    image: Media['attributes'];
    sizes?: string;
    url?: string;
  };

export const RecipeCard = ({ title, image, sizes, url }: RecipeCardProps) => {
  return (
    <Card>
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
      {url ? (
        <Link
          className={
            'before:absolute before:left-0 before:top-0 before:h-full before:w-full'
          }
          href={url}
        >
          <Heading as={'h2'} size={'5'}>
            {title}
          </Heading>
        </Link>
      ) : (
        <Heading as={'h2'} size={'5'}>
          {title}
        </Heading>
      )}
    </Card>
  );
};
