'use client';

import { Button, Card, Flex, Text } from '@radix-ui/themes';
import { Star } from 'lucide-react';
import { useFormatter } from 'next-intl';
import { stringify } from 'qs';
import { useState } from 'react';

import { ContentTypes } from '@recipes/api-client/src/api-client';
import { cn } from '../../lib/utils/cn';

interface CommentListItemsProps {
  items: any[];
  limit: number;
  locale: string;
  recipe: number;
  total: number;
  translations: {
    viewMore: string;
  };
}

export const CommentListItems = ({
  items: initialItems,
  limit,
  locale,
  recipe,
  total: initialTotal,
  translations,
}: CommentListItemsProps) => {
  const [items, setItems] = useState(initialItems);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(initialTotal);
  const format = useFormatter();

  const onButtonClick = async () => {
    const newOffset = offset + limit;

    const response = await fetch(
      `/api/comments/${recipe}${stringify(
        { limit, locale, start: newOffset },
        { addQueryPrefix: true, encodeValuesOnly: true }
      )}`
    );

    if (!response.ok) {
      return;
    }

    const { data: newItems, meta } = (await response.json()) as {
      data: ContentTypes['comments'][];
      meta: Record<string, any>;
    };

    if (!Array.isArray(newItems) || newItems.length === 0) {
      return;
    }

    setItems((prevItems) => prevItems.concat(newItems));
    setOffset(newOffset);

    if (typeof meta.pagination.total === 'number') {
      setTotal(meta.pagination.total as number);
    }
  };

  return (
    <Flex align={'center'} direction={'column'} gap={'4'}>
      <Flex asChild direction={'column'} gap={'4'} width={'100%'}>
        <ol>
          {items.map((item) => (
            <li key={item.id}>
              <Card>
                <Flex direction={'column'} gap={'4'}>
                  <Flex gap={'4'} justify={'between'}>
                    <Flex direction={'column'} gap={'2'}>
                      <Text size={'5'} weight={'bold'}>
                        {item.attributes.name}
                      </Text>
                      <Text color={'gray'} size={'2'}>
                        {format.dateTime(
                          new Date(item.attributes.createdAt as string),
                          { dateStyle: 'long', timeStyle: 'short' }
                        )}
                      </Text>
                    </Flex>
                    {item.attributes.rating.data ? (
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
                                  item.attributes.rating.data.attributes.score,
                              })}
                              key={index}
                            />
                          )
                        )}
                      </Flex>
                    ) : null}
                  </Flex>
                </Flex>
              </Card>
            </li>
          ))}
        </ol>
      </Flex>
      {items.length < total ? (
        <Button onClick={() => void onButtonClick()}>
          {translations.viewMore}
        </Button>
      ) : null}
    </Flex>
  );
};
