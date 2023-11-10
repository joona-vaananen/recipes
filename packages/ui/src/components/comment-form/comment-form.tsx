import { Container, Flex, Heading, Section } from '@radix-ui/themes';

import type { APIClientInstance } from '@recipes/api-client';
import { useTranslations } from 'next-intl';
import { postComment } from './comment-form-action';
import { CommentFormCommentTextArea } from './comment-form-comment-text-area';
import { CommentFormProvider } from './comment-form-context';
import { CommentFormNameInput } from './comment-form-name-input';
import { CommentFormSubmitButton } from './comment-form-submit-button';

interface CommentFormProps {
  apiClient: APIClientInstance;
  locale: string;
  recipe: number;
}

export const CommentForm = ({
  apiClient,
  locale,
  recipe,
}: CommentFormProps) => {
  const t = useTranslations('CommentForm');

  return (
    <CommentFormProvider
      postComment={postComment.bind(null, apiClient, locale, recipe)}
    >
      <Section>
        <Container className={'container'}>
          <Heading as={'h2'} mb={'4'} size={'7'}>
            {t('title')}
          </Heading>
          <Flex asChild direction={'column'} gap={'4'}>
            <form>
              <CommentFormNameInput
                translations={{
                  name: t('name'),
                }}
              />
              <CommentFormCommentTextArea
                translations={{
                  comment: t('comment'),
                }}
              />
              <CommentFormSubmitButton
                translations={{
                  submit: t('submit'),
                }}
              />
            </form>
          </Flex>
        </Container>
      </Section>
    </CommentFormProvider>
  );
};
