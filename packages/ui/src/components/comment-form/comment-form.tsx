import { Flex, Heading, Section } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';

import { CommentFormClient } from './comment-form-client';
import { CommentFormCommentTextArea } from './comment-form-comment-text-area';
import { CommentFormProvider } from './comment-form-context';
import { CommentFormNameInput } from './comment-form-name-input';
import { CommentFormRatingField } from './comment-form-rating-field';

interface CommentFormProps {
  anchor: string;
  locale: string;
  recipe: number;
}

export const CommentForm = ({ anchor, locale, recipe }: CommentFormProps) => {
  const t = useTranslations('CommentForm');

  return (
    <CommentFormProvider locale={locale} recipe={recipe}>
      <Section id={anchor} size={'2'}>
        <Heading as={'h2'} mb={'4'} size={'7'}>
          {t('title')}
        </Heading>
        <Flex asChild direction={'column'} gap={'4'}>
          <CommentFormClient
            translations={{
              serverError: t('serverError'),
              submit: t('submit'),
            }}
          >
            <CommentFormRatingField
              translations={{
                rating: t('rating'),
                scoreUnit: t('scoreUnit'),
              }}
            />
            <CommentFormNameInput
              translations={{
                name: t('name'),
                required: t('required'),
              }}
            />
            <CommentFormCommentTextArea
              translations={{
                comment: t('comment'),
                required: t('required'),
              }}
            />
          </CommentFormClient>
        </Flex>
      </Section>
    </CommentFormProvider>
  );
};
