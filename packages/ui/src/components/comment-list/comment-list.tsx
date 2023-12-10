import { getTranslations } from 'next-intl/server';

import type { APIClientInstance } from '@recipes/api-client';
import { CommentListClient } from './comment-list-client';

export const COMMENTS_PAGE_SIZE = 15;

interface CommentListProps {
  apiClient: APIClientInstance;
  locale: string;
  localizations?: { data: { id: number }[] };
  recipe: number;
}

export const CommentList = async ({
  apiClient,
  locale,
  localizations,
  recipe,
}: CommentListProps) => {
  const t = await getTranslations({ locale, namespace: 'CommentList' });

  const recipes = [{ id: recipe }, ...(localizations?.data ?? [])];

  const { data: comments, meta } = await apiClient.getMany(
    {
      contentType: 'comments',
      parameters: {
        fields: ['comment', 'createdAt', 'id', 'name', 'userId'],
        filters: {
          recipe: {
            id: {
              $in: recipes.map((recipe) => recipe.id),
            },
          },
        },
        locale: 'all',
        pagination: {
          page: 1,
          pageSize: COMMENTS_PAGE_SIZE,
        },
        populate: {
          rating: {
            fields: ['id', 'score'],
          },
          user: {
            fields: ['id', 'username'],
            populate: {
              avatar: {
                fields: ['alternativeText', 'height', 'id', 'url', 'width'],
              },
            },
          },
        },
        sort: 'createdAt:desc',
      },
    },
    { next: { revalidate: 300 } } as any
  );

  const { pagination } = meta;

  return (
    <CommentListClient
      comments={comments}
      locale={locale}
      pagination={pagination}
      recipe={recipe}
      translations={{
        title: t('title'),
        viewMore: t('viewMore'),
      }}
    />
  );
};
