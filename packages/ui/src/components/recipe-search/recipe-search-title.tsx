import { Heading, Text } from '@radix-ui/themes';

interface RecipeSearchTitleProps {
  hitsPerPage: number;
  page: number;
  title: string;
  totalHits: number;
}

export const RecipeSearchTitle = ({
  hitsPerPage,
  page,
  title,
  totalHits,
}: RecipeSearchTitleProps) => {
  return (
    <Heading size={'7'}>
      {`${title} `}
      <Text as={'span'} color={'ruby'}>{`${Math.min(
        hitsPerPage * page,
        totalHits
      )} / ${totalHits}`}</Text>
    </Heading>
  );
};
