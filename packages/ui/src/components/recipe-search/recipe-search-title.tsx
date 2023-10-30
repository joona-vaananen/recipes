import { Flex, Heading } from '@radix-ui/themes';

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
    <Flex align={'center'} gap={'4'}>
      <Heading size={'7'}>{title}</Heading>
      {totalHits > 0 ? (
        <Heading asChild color={'ruby'}>
          <span>{`${Math.min(
            hitsPerPage * page,
            totalHits
          )} / ${totalHits}`}</span>
        </Heading>
      ) : null}
    </Flex>
  );
};
