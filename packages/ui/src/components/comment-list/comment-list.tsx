import { useTranslations } from 'next-intl';
import { use } from 'react';

import type { APIClientInstance } from '@recipes/api-client';
import { CommentListClient } from './comment-list-client';

export const COMMENTS_PAGE_SIZE = 15;

interface CommentListProps {
  apiClient: APIClientInstance;
  locale: string;
  localizations?: { data: { id: number }[] };
  recipe: number;
}

export const CommentList = ({
  apiClient,
  locale,
  localizations,
  recipe,
}: CommentListProps) => {
  const t = useTranslations('CommentList');

  const { data: comments, meta } = use(
    apiClient.getMany({
      contentType: 'comments',
      parameters: {
        fields: ['comment', 'createdAt', 'id', 'name', 'userId'],
        filters: {
          /*
          TODO:
          Comment and rating system is kind of flawed right out, because they are per recipe localization.
          To fix this, a custom generated UUID should be used to link comments and ratings to recipes.
          Relations between comments, ratings, and recipes should be dropped altogether.
          */
          recipe: {
            id: {
              $in: [
                recipe,
                ...(localizations?.data?.map(
                  (localization) => localization.id
                ) ?? []),
              ],
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
        },
        sort: 'createdAt:desc',
      },
    })
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
