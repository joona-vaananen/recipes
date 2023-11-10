'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createContext, useContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useUser } from '../user-context';
import type { PostComment } from './comment-form-action';
import {
  commentFormSchema,
  type CommentFormSchema,
} from './comment-form-schema';

const CommentFormContext = createContext<undefined>(undefined);

interface CommentFormProviderProps {
  children: React.ReactNode;
  postComment: PostComment;
}

export const CommentFormProvider = ({
  children,
  postComment,
}: CommentFormProviderProps) => {
  const { userId } = useUser();

  const defaultValues: Partial<CommentFormSchema> = {};

  if (typeof userId === 'string') {
    defaultValues.userId = userId;
  }

  const commentForm = useForm<CommentFormSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(commentFormSchema),
  });

  const { handleSubmit, watch } = commentForm;

  useEffect(() => {
    const onSubmit = async (values: CommentFormSchema) => {
      const { data: comment, error } = await postComment(values);

      console.log({ data: comment, error });
    };

    const subscription = watch(() => {
      void handleSubmit(onSubmit)();
    });

    return () => subscription.unsubscribe();
  }, [handleSubmit, postComment, watch]);

  return (
    <CommentFormContext.Provider value={undefined}>
      <FormProvider {...commentForm}>{children}</FormProvider>
    </CommentFormContext.Provider>
  );
};

export const useCommentForm = () => {
  const commentForm = useContext(CommentFormContext);

  if (typeof commentForm === 'undefined') {
    throw new Error('useCommentForm must be used within a CommentFormProvider');
  }

  return commentForm;
};
