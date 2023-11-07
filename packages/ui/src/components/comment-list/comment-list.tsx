import {
  Card,
  Container,
  Flex,
  Heading,
  Section,
  Text,
} from '@radix-ui/themes';
import { Star } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { use } from 'react';

import type { APIClientInstance } from '@recipes/api-client';
import { cn } from '../../lib/utils/cn';

interface CommentListProps {
  apiClient: APIClientInstance;
  locale: string;
  recipe: number;
}

// TODO: Implement pagination and perhaps split into smaller components
export const CommentList = ({
  apiClient,
  locale,
  recipe,
}: CommentListProps) => {
  const t = useTranslations('CommentList');
  const format = useFormatter();

  const { data: comments } = use(
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
        <Flex asChild direction={'column'} gap={'4'}>
          <ol>
            {comments.map((comment) => (
              <li key={comment.id}>
                <Card>
                  <Flex direction={'column'} gap={'4'}>
                    <Flex gap={'4'} justify={'between'}>
                      <Flex direction={'column'} gap={'2'}>
                        <Text size={'5'} weight={'bold'}>
                          {comment.attributes.name}
                        </Text>
                        <Text color={'gray'} size={'2'}>
                          {format.dateTime(
                            new Date(comment.attributes.createdAt as string),
                            { dateStyle: 'long', timeStyle: 'short' }
                          )}
                        </Text>
                      </Flex>
                      {comment.attributes.rating.data ? (
                        <Flex>
                          {Array.from(
                            {
                              length: 5,
                            },
                            (_, index) => (
                              <Star
                                className={cn({
                                  'h-4 w-4': true,
                                  'fill-accent-9 stroke-accent-9':
                                    index <
                                    comment.attributes.rating.data.attributes
                                      .score,
                                })}
                                key={index}
                              />
                            )
                          )}
                        </Flex>
                      ) : null}
                    </Flex>
                    <Text as={'p'} className={'whitespace-pre-line'}>
                      {comment.attributes.comment}
                    </Text>
                  </Flex>
                </Card>
              </li>
            ))}
          </ol>
        </Flex>
        <pre className={'mt-4 whitespace-pre-wrap break-all'}>
          {JSON.stringify(comments, null, 2)}
        </pre>
      </Container>
    </Section>
  );
};
