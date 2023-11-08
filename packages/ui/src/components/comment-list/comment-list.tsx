import { Container, Heading, Section } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';
import { use } from 'react';

import type { APIClientInstance } from '@recipes/api-client';
import { CommentListItems } from './comment-list-items';

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

  const { data, meta } = use(
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
          pageSize: 1,
        },
        populate: {
          rating: {
            fields: ['id', 'score'],
          },
        },
      },
    })
  );

  if (data.length === 0) {
    return null;
  }

  return (
    <Section>
      <Container className={'container'}>
        <Heading as={'h2'} mb={'4'} size={'7'}>
          {t('title')}
        </Heading>
        <CommentListItems
          comments={{ data, meta }}
          locale={locale}
          recipe={recipe}
          translations={{
            viewMore: t('viewMore'),
          }}
        />
      </Container>
    </Section>
  );
};
