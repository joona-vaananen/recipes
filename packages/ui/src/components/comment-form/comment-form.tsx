import { Container, Section } from '@radix-ui/themes';

import type { APIClientInstance } from '@recipes/api-client';

interface CommentFormProps {
  apiClient: APIClientInstance;
  locale: string;
  recipe: number;
}

// TODO: Implement comment form
export const CommentForm = ({
  apiClient,
  locale,
  recipe,
}: CommentFormProps) => {
  return (
    <Section>
      <Container className={'container'}></Container>
    </Section>
  );
};
