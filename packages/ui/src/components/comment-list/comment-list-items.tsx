'use client';

import { Button, Card, Flex, Text } from '@radix-ui/themes';
import { Loader2, Star } from 'lucide-react';
import { useFormatter } from 'next-intl';
import { stringify } from 'qs';
import { useState } from 'react';

import type { APIContentTypes, APIResponse } from '@recipes/api-client';
import { cn } from '../../lib/utils/cn';
import { fetcher } from '../../lib/utils/fetcher';

type Comments = APIResponse<APIContentTypes['comments'][]>;

interface CommentListItemsProps {
  comments: Comments;
  locale: string;
  recipe: number;
  translations: {
    viewMore: string;
  };
}

export const CommentListItems = ({
  comments: initialComments,
  locale,
  recipe,
  translations,
}: CommentListItemsProps) => {
  const [comments, setComments] = useState(initialComments);
  const [isLoading, setIsLoading] = useState(false);
  const format = useFormatter();

  const { page, pageSize, total } = comments.meta.pagination;

  const onViewMoreButtonClick = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const newComments = (await fetcher(
      `/api/comments/${recipe}${stringify(
        { locale, page: page + 1, pageSize },
        { addQueryPrefix: true, encodeValuesOnly: true }
      )}`
    )) as Comments;

    setIsLoading(false);

    if (!Array.isArray(newComments.data) || newComments.data.length === 0) {
      return;
    }

    setComments((prevComments) => ({
      data: prevComments.data!.concat(newComments.data),
      meta: newComments.meta,
    }));
  };

  return (
    <Flex align={'center'} direction={'column'} gap={'4'}>
      <Flex asChild direction={'column'} gap={'4'} width={'100%'}>
        <ol>
          {comments.data!.map((comment) => (
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
                        {Array.from({ length: 5 }, (_, index) => (
                          <Star
                            className={cn({
                              'h-4 w-4': true,
                              'fill-accent-9 stroke-accent-9':
                                index <
                                comment.attributes.rating.data.attributes.score,
                            })}
                            key={index}
                          />
                        ))}
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
      {total > comments.data!.length ? (
        <Button onClick={() => void onViewMoreButtonClick()}>
          {translations.viewMore}
          {isLoading ? <Loader2 className={'h-4 w-4 animate-spin'} /> : null}
        </Button>
      ) : null}
    </Flex>
  );
};
