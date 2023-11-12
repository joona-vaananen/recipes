import { Container, Section } from '@radix-ui/themes';

import { Rating } from '../rating';

interface RecipeInfoProps
  extends React.ComponentPropsWithoutRef<typeof Section> {
  averageRating?: number;
  ratingCount: number;
}

export const RecipeInfo = ({
  averageRating,
  ratingCount,
  ...props
}: RecipeInfoProps) => {
  return (
    <Section
      size={{
        initial: '2',
        sm: '3',
      }}
      {...props}
    >
      <Container className={'container'} size={'3'}>
        <Rating averageRating={averageRating} ratingCount={ratingCount} />
      </Container>
    </Section>
  );
};
