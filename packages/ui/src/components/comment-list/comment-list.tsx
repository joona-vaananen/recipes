import { Container, Heading, Section } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';
import { use } from 'react';

import type { APIClientInstance } from '@recipes/api-client';
import { CommentListItems } from './comment-list-items';

const COMMENTS_PAGINATION_LIMIT = 1;

interface CommentListProps {
  apiClient: APIClientInstance;
  locale: string;
  recipe: number;
}

export const CommentList = ({
  apiClient,
  locale,
  recipe,
}: CommentListProps) => {
  const t = useTranslations('CommentList');

  const { data: comments, meta } = use(
    apiClient.getMany({
      contentType: 'comments',
      parameters: {
        fields: ['comment', 'createdAt', 'id', 'name', 'userId'],
        filters: {
          recipe: {
            id: recipe,
          },
        },
        locale,
        pagination: {
          limit: COMMENTS_PAGINATION_LIMIT,
        },
        populate: {
          rating: {
            fields: ['id', 'score'],
          },
        },
      },
    })
  );

  if (comments.length === 0) {
    return null;
  }

  return (
    <Section>
      <Container className={'container'}>
        <Heading as={'h2'} mb={'4'} size={'7'}>
          {t('title')}
        </Heading>
        <CommentListItems
          items={comments}
          limit={COMMENTS_PAGINATION_LIMIT}
          locale={locale}
          recipe={recipe}
          total={meta.pagination.total}
          translations={{
            viewMore: t('viewMore'),
          }}
        />
        <pre className={'mt-4 whitespace-pre-wrap break-all'}>
          {JSON.stringify(comments, null, 2)}
        </pre>
      </Container>
    </Section>
  );
};
