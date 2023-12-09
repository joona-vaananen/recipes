'use client';

import { Button, Card, Flex, Heading, Section, Text } from '@radix-ui/themes';
import { Loader2, Star } from 'lucide-react';
import { useFormatter } from 'next-intl';
import { stringify } from 'qs';
import { useState } from 'react';
import useSWRInfinite from 'swr/infinite';

import type { APIContentTypes, APIResponse } from '@recipes/api-client';
import Image from 'next/image';
import { cn } from '../../lib/utils/cn';
import { fetcher } from '../../lib/utils/fetcher';
import { COMMENTS_PAGE_SIZE } from './comment-list';

type Comments = APIResponse<APIContentTypes['comments'][]>;

interface CommentListClientProps {
  comments: Comments['data'];
  locale: string;
  pagination: Comments['meta']['pagination'];
  recipe: number;
  translations: {
    title: string;
    viewMore: string;
  };
}

export const CommentListClient = ({
  comments: initialComments,
  locale,
  pagination: initialPagination,
  recipe,
  translations,
}: CommentListClientProps) => {
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
    const { data, meta } = (await fetcher(input, {
      ...init,
      cache: 'no-store',
    })) as Comments;

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
    revalidateOnMount: true,
    revalidateOnReconnect: false,
  });

  if (!Array.isArray(pages) || pages.length === 0) {
    return null;
  }

  const comments = pages.flatMap((page) => (Array.isArray(page) ? page : []));

  if (comments.length === 0) {
    return null;
  }

  return (
    <Section size={'2'}>
      <Heading as={'h2'} mb={'4'} size={'7'}>
        {translations.title}
      </Heading>
      <Flex align={'center'} direction={'column'} gap={'4'}>
        <Flex asChild direction={'column'} gap={'4'} width={'100%'}>
          <ol>
            {comments.map((comment) => (
              <li key={comment.id}>
                <Card>
                  <Flex direction={'column'} gap={'4'}>
                    <Flex gap={'4'} justify={'between'}>
                      <Flex direction={'column'} gap={'2'}>
                        {comment.attributes.user?.data ? (
                          <Flex align={'center'} gap={'2'}>
                            {(
                              comment.attributes.user.data.attributes
                                .avatar as any
                            )?.data ? (
                              <Image
                                alt={
                                  (
                                    comment.attributes.user.data.attributes
                                      .avatar as any
                                  ).data.attributes.alternativeText ?? ''
                                }
                                blurDataURL={
                                  'placeholder' in
                                    comment.attributes.user.data.attributes
                                      .avatar! &&
                                  comment.attributes.user.data.attributes.avatar
                                    .placeholder
                                    ? (comment.attributes.user.data.attributes
                                        .avatar.placeholder as string)
                                    : undefined
                                }
                                className={'h-7 w-auto'}
                                height={
                                  (
                                    comment.attributes.user.data.attributes
                                      .avatar as any
                                  ).data.attributes.height
                                }
                                placeholder={
                                  'placeholder' in
                                    comment.attributes.user.data.attributes
                                      .avatar! &&
                                  comment.attributes.user.data.attributes.avatar
                                    .placeholder
                                    ? 'blur'
                                    : 'empty'
                                }
                                priority
                                quality={100}
                                src={
                                  (
                                    comment.attributes.user.data.attributes
                                      .avatar as any
                                  ).data.attributes.url
                                }
                                width={
                                  (
                                    comment.attributes.user.data.attributes
                                      .avatar as any
                                  ).data.attributes.width
                                }
                              />
                            ) : null}
                            <Text color={'ruby'} size={'5'} weight={'bold'}>
                              {comment.attributes.user.data.attributes.username}
                            </Text>
                          </Flex>
                        ) : comment.attributes.name ? (
                          <Text size={'5'} weight={'bold'}>
                            {comment.attributes.name}
                          </Text>
                        ) : null}
                        <Text color={'gray'} size={'2'}>
                          {format.dateTime(
                            new Date(
                              comment.attributes.createdAt as unknown as string
                            ),
                            { dateStyle: 'long', timeStyle: 'short' }
                          )}
                        </Text>
                      </Flex>
                      {comment.attributes.rating?.data ? (
                        <Flex>
                          {Array.from({ length: 5 }, (_, index) => (
                            <Star
                              className={cn({
                                'h-4 w-4': true,
                                'fill-accent-9 stroke-accent-9':
                                  index <
                                  comment.attributes.rating!.data.attributes
                                    .score,
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
            {isValidating ? (
              <Loader2 className={'h-4 w-4 animate-spin'} />
            ) : null}
          </Button>
        ) : null}
      </Flex>
    </Section>
  );
};
