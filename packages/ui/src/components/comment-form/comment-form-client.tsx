'use client';

import { stringify } from 'qs';
import { useFormContext } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { INFINITE_PREFIX } from 'swr/_internal';

import { Button, Callout } from '@radix-ui/themes';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { fetcher } from '../../lib/utils/fetcher';
import { useCommentForm } from './comment-form-context';
import type { CommentFormSchema } from './comment-form-schema';

interface CommentFormClientProps extends React.HTMLAttributes<HTMLFormElement> {
  translations: {
    serverError: string;
    submit: string;
  };
}

export const CommentFormClient = ({
  children,
  translations,
  ...props
}: CommentFormClientProps) => {
  const { locale, recipe } = useCommentForm();

  const { formState, handleSubmit, reset, setError, getValues } =
    useFormContext<CommentFormSchema>();

  const { errors, isSubmitting } = formState;
  const { cache, mutate } = useSWRConfig();

  const onSubmit = async (
    values: CommentFormSchema,
    event?: React.BaseSyntheticEvent<object, any, any>
  ) => {
    event?.preventDefault();

    if (isSubmitting) {
      return;
    }

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
      setError('root.serverError', {
        message: translations.serverError,
        type: 'server',
      });
    }

    reset({ userId: getValues('userId') });

    Array.from(cache.keys()).forEach((key) => {
      if (
        typeof key === 'string' &&
        (key.startsWith(
          `${INFINITE_PREFIX}/api/comments/${recipe}${stringify(
            { locale },
            { addQueryPrefix: true, encodeValuesOnly: true }
          )}`
        ) ||
          key.startsWith(
            `/api/ratings/${recipe}${stringify(
              { locale },
              { addQueryPrefix: true, encodeValuesOnly: true }
            )}`
          ))
      ) {
        void mutate(key);
      }
    });
  };

  return (
    <form onSubmit={(event) => void handleSubmit(onSubmit)(event)} {...props}>
      {children}
      {errors.root?.serverError ? (
        <Callout.Root>
          <Callout.Icon>
            <AlertTriangle
              className={'h-4 w-4 stroke-[var(--accent-a11)]'}
              color={'red'}
              role={'alert'}
            />
          </Callout.Icon>
          <Callout.Text>{errors.root.serverError.message}</Callout.Text>
        </Callout.Root>
      ) : null}
      <Button className={'w-fit'} type={'submit'}>
        {translations.submit}
        {isSubmitting ? <Loader2 className={'h-4 w-4 animate-spin'} /> : null}
      </Button>
    </form>
  );
};
