'use client';

import { stringify } from 'qs';
import { useFormContext } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { INFINITE_PREFIX } from 'swr/_internal';

import { ERROR_NAMES } from '../../constants';
import { fetcher } from '../../lib/utils/fetcher';
import { useCommentForm } from './comment-form-context';
import type { CommentFormSchema } from './comment-form-schema';

type CommentFormClientProps = React.HTMLAttributes<HTMLFormElement>;

export const CommentFormClient = ({
  children,
  ...props
}: CommentFormClientProps) => {
  const { locale, recipe } = useCommentForm();
  const { handleSubmit, reset } = useFormContext<CommentFormSchema>();
  const { cache, mutate } = useSWRConfig();

  const onSubmit = async (
    values: CommentFormSchema,
    event?: React.BaseSyntheticEvent<object, any, any>
  ) => {
    event?.preventDefault();

    const { error } = (await fetcher(
      `/api/comments/${recipe}${stringify(
        { locale },
        { addQueryPrefix: true, encodeValuesOnly: true }
      )}`,
      {
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      }
    )) as { error?: { name: string } };

    if (error) {
      if (error.name === ERROR_NAMES.UNIQUE_CONSTRAINT_ERROR) {
      } else {
      }

      return;
    }

    reset();

    Array.from(cache.keys()).forEach((key) => {
      if (
        typeof key === 'string' &&
        key.startsWith(
          `${INFINITE_PREFIX}/api/comments/1${stringify(
            { locale },
            { addQueryPrefix: true, encodeValuesOnly: true }
          )}`
        )
      ) {
        void mutate(key);
      }
    });
  };

  return (
    <form onSubmit={(event) => void handleSubmit(onSubmit)(event)} {...props}>
      {children}
    </form>
  );
};
