'use client';

import { Button, Card, Flex, Text } from '@radix-ui/themes';
import { Loader2, Star } from 'lucide-react';
import { useFormatter } from 'next-intl';
import { stringify } from 'qs';
import { useState } from 'react';
import useSWRInfinite from 'swr/infinite';

import type { APIContentTypes, APIResponse } from '@recipes/api-client';
import { cn } from '../../lib/utils/cn';
import { fetcher } from '../../lib/utils/fetcher';
import { COMMENTS_PAGE_SIZE } from './comment-list';

type Comments = APIResponse<APIContentTypes['comments'][]>;

interface CommentListItemsProps {
  comments: Comments['data'];
  locale: string;
  pagination: Comments['meta']['pagination'];
  recipe: number;
  translations: {
    viewMore: string;
  };
}

export const CommentListItems = ({
  comments: initialComments,
  locale,
  pagination: initialPagination,
  recipe,
  translations,
}: CommentListItemsProps) => {
  const [pagination, setPagination] = useState(initialPagination);
  const format = useFormatter();

  const pageSize = pagination?.pageSize ?? COMMENTS_PAGE_SIZE;
  const total = pagination?.total ?? 0;

  const getKey = (index: number) => {
    return `/api/comments/${recipe}${stringify(
      { locale, page: index + 1, pageSize },
      { addQueryPrefix: true, encodeValuesOnly: true }
    )}`;
  };

  const fetchComments = async (
    input: RequestInfo | URL,
    init?: RequestInit | undefined
  ) => {
    const { data, meta } = (await fetcher(input, init)) as Comments;

    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    const { pagination } = meta;
    setPagination(pagination);

    return data;
  };

  const {
    data: pages,
    isValidating,
    setSize,
  } = useSWRInfinite(getKey, fetchComments, {
    fallback: {
      [getKey(0)]: [initialComments],
    },
    fallbackData: [initialComments],
    revalidateAll: true,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
  });

  if (!Array.isArray(pages) || pages.length === 0) {
    return null;
  }

  const comments = pages.flat();

  return (
    <Flex align={'center'} direction={'column'} gap={'4'}>
      <Flex asChild direction={'column'} gap={'4'} width={'100%'}>
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
      {total > comments.length ? (
        <Button onClick={() => void setSize((prevSize) => prevSize + 1)}>
          {translations.viewMore}
          {isValidating ? <Loader2 className={'h-4 w-4 animate-spin'} /> : null}
        </Button>
      ) : null}
    </Flex>
  );
};
