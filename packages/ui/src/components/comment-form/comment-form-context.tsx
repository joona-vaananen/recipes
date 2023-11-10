'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createContext, useContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useUser } from '../user-context';
import {
  commentFormSchema,
  type CommentFormSchema,
} from './comment-form-schema';

const CommentFormContext = createContext<
  { locale: string; recipe: number } | undefined
>(undefined);

interface CommentFormProviderProps {
  children: React.ReactNode;
  locale: string;
  recipe: number;
}

export const CommentFormProvider = ({
  children,
  locale,
  recipe,
}: CommentFormProviderProps) => {
  const { userId } = useUser();

  const defaultValues: Partial<CommentFormSchema> = {
    name: '',
    comment: '',
  };

  const commentForm = useForm<CommentFormSchema>({
    defaultValues,
    resolver: zodResolver(commentFormSchema),
  });

  const { setValue } = commentForm;

  useEffect(() => {
    if (!userId) {
      return;
    }

    setValue('userId', userId);
  }, [setValue, userId]);

  return (
    <CommentFormContext.Provider value={{ locale, recipe }}>
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
