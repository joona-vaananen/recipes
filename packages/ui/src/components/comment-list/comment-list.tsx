import { Container, Heading, Section } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';
import { use } from 'react';

import type { APIClientInstance } from '@recipes/api-client';
import { CommentListItems } from './comment-list-items';

export const COMMENTS_PAGE_SIZE = 1;

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
          page: 1,
          pageSize: COMMENTS_PAGE_SIZE,
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

  const { pagination } = meta;

  return (
    <Section>
      <Container className={'container'}>
        <Heading as={'h2'} mb={'4'} size={'7'}>
          {t('title')}
        </Heading>
        <CommentListItems
          comments={comments}
          locale={locale}
          pagination={pagination}
          recipe={recipe}
          translations={{
            viewMore: t('viewMore'),
          }}
        />
      </Container>
    </Section>
  );
};
