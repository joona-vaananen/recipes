import { Box, Flex, Grid, Link, Text } from '@radix-ui/themes';
import { Hash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { stringify } from 'qs';
import { Fragment } from 'react';

import { Link as NextLink } from '../lib/utils/navigation';
import { resolveSearchParams } from '../lib/utils/resolve-search-params';
import { recipeSearchConfig as searchConfig } from './recipe-search/recipe-search-config';

interface RecipeTagsProps extends React.HTMLAttributes<HTMLDivElement> {
  categories?: {
    data: {
      attributes: {
        name: string;
        slug: string;
      };
      id: number;
    }[];
  };
  courses?: {
    data: {
      attributes: {
        name: string;
        slug: string;
      };
      id: number;
    }[];
  };
  cuisines?: {
    data: {
      attributes: {
        name: string;
        slug: string;
      };
      id: number;
    }[];
  };
  diets?: {
    data: {
      attributes: {
        name: string;
        slug: string;
      };
      id: number;
    }[];
  };
  mainIngredients?: {
    data: {
      attributes: {
        name: string;
        slug: string;
      };
      id: number;
    }[];
  };
  mealTypes?: {
    data: {
      attributes: {
        name: string;
        slug: string;
      };
      id: number;
    }[];
  };
  methods?: {
    data: {
      attributes: {
        name: string;
        slug: string;
      };
      id: number;
    }[];
  };
  seasons?: {
    data: {
      attributes: {
        name: string;
        slug: string;
      };
      id: number;
    }[];
  };
}

export const RecipeTags = ({
  className,
  categories,
  courses,
  cuisines,
  diets,
  mainIngredients,
  mealTypes,
  methods,
  seasons,
  ...props
}: RecipeTagsProps) => {
  const t = useTranslations('RecipeTags');

  if (
    (!Array.isArray(categories?.data) || categories!.data.length === 0) &&
    (!Array.isArray(courses?.data) || courses!.data.length === 0) &&
    (!Array.isArray(cuisines?.data) || cuisines!.data.length === 0) &&
    (!Array.isArray(diets?.data) || diets!.data.length === 0) &&
    (!Array.isArray(mainIngredients?.data) ||
      mainIngredients!.data.length === 0) &&
    (!Array.isArray(mealTypes?.data) || mealTypes!.data.length === 0) &&
    (!Array.isArray(methods?.data) || methods!.data.length === 0) &&
    (!Array.isArray(seasons?.data) || seasons!.data.length === 0)
  ) {
    return null;
  }

  return (
    <Flex
      className={className}
      direction={'column'}
      gap={'4'}
      justify={'between'}
      {...props}
    >
      <Flex align={'center'} gap={'2'}>
        <Hash className={'h-5 w-5'} />
        <Text weight={'bold'}>{t('tags')}</Text>
      </Flex>
      <Grid
        asChild
        columns={{
          initial: '2',
          sm: '4',
        }}
        gap={'4'}
        width={'100%'}
      >
        <dl>
          {Array.isArray(categories?.data) && categories!.data.length > 0 ? (
            <Box>
              <Text asChild color={'gray'}>
                <dt>{t('categories')}</dt>
              </Text>
              <Text asChild>
                <dd>
                  {categories!.data.map((category, index) => (
                    <Fragment key={category.id}>
                      <Link asChild>
                        <NextLink
                          href={{
                            pathname: '/recipes',
                            query: stringify(
                              resolveSearchParams(
                                { categories: { data: [category] } },
                                searchConfig.filters
                              ),
                              {
                                arrayFormat: 'repeat',
                                encodeValuesOnly: true,
                              }
                            ),
                          }}
                        >
                          {category.attributes.name}
                        </NextLink>
                      </Link>
                      {index < categories!.data.length - 1 ? ', ' : null}
                    </Fragment>
                  ))}
                </dd>
              </Text>
            </Box>
          ) : null}
          {Array.isArray(courses?.data) && courses!.data.length > 0 ? (
            <Box>
              <Text asChild color={'gray'}>
                <dt>{t('courses')}</dt>
              </Text>
              <Text asChild>
                <dd>
                  {courses!.data.map((course, index) => (
                    <Fragment key={course.id}>
                      <Link asChild>
                        <NextLink
                          href={{
                            pathname: '/recipes',
                            query: stringify(
                              resolveSearchParams(
                                { courses: { data: [course] } },
                                searchConfig.filters
                              ),
                              {
                                arrayFormat: 'repeat',
                                encodeValuesOnly: true,
                              }
                            ),
                          }}
                        >
                          {course.attributes.name}
                        </NextLink>
                      </Link>
                      {index < courses!.data.length - 1 ? ', ' : null}
                    </Fragment>
                  ))}
                </dd>
              </Text>
            </Box>
          ) : null}
          {Array.isArray(cuisines?.data) && cuisines!.data.length > 0 ? (
            <Box>
              <Text asChild color={'gray'}>
                <dt>{t('cuisines')}</dt>
              </Text>
              <Text asChild>
                <dd>
                  {cuisines!.data.map((cuisine, index) => (
                    <Fragment key={cuisine.id}>
                      <Link asChild>
                        <NextLink
                          href={{
                            pathname: '/recipes',
                            query: stringify(
                              resolveSearchParams(
                                { cuisines: { data: [cuisine] } },
                                searchConfig.filters
                              ),
                              {
                                arrayFormat: 'repeat',
                                encodeValuesOnly: true,
                              }
                            ),
                          }}
                        >
                          {cuisine.attributes.name}
                        </NextLink>
                      </Link>
                      {index < cuisines!.data.length - 1 ? ', ' : null}
                    </Fragment>
                  ))}
                </dd>
              </Text>
            </Box>
          ) : null}
          {Array.isArray(diets?.data) && diets!.data.length > 0 ? (
            <Box>
              <Text asChild color={'gray'}>
                <dt>{t('diets')}</dt>
              </Text>
              <Text asChild>
                <dd>
                  {diets!.data.map((diet, index) => (
                    <Fragment key={diet.id}>
                      <Link asChild>
                        <NextLink
                          href={{
                            pathname: '/recipes',
                            query: stringify(
                              resolveSearchParams(
                                { diets: { data: [diet] } },
                                searchConfig.filters
                              ),
                              {
                                arrayFormat: 'repeat',
                                encodeValuesOnly: true,
                              }
                            ),
                          }}
                        >
                          {diet.attributes.name}
                        </NextLink>
                      </Link>
                      {index < diets!.data.length - 1 ? ', ' : null}
                    </Fragment>
                  ))}
                </dd>
              </Text>
            </Box>
          ) : null}
          {Array.isArray(mainIngredients?.data) &&
          mainIngredients!.data.length > 0 ? (
            <Box>
              <Text asChild color={'gray'}>
                <dt>{t('mainIngredients')}</dt>
              </Text>
              <Text asChild>
                <dd>
                  {mainIngredients!.data.map((mainIngredient, index) => (
                    <Fragment key={mainIngredient.id}>
                      <Link asChild key={mainIngredient.id}>
                        <NextLink
                          href={{
                            pathname: '/recipes',
                            query: stringify(
                              resolveSearchParams(
                                {
                                  mainIngredients: {
                                    data: [mainIngredient],
                                  },
                                },
                                searchConfig.filters
                              ),
                              {
                                arrayFormat: 'repeat',
                                encodeValuesOnly: true,
                              }
                            ),
                          }}
                        >
                          {mainIngredient.attributes.name}
                        </NextLink>
                      </Link>
                      {index < mainIngredients!.data.length - 1 ? ', ' : null}
                    </Fragment>
                  ))}
                </dd>
              </Text>
            </Box>
          ) : null}
          {Array.isArray(mealTypes?.data) && mealTypes!.data.length > 0 ? (
            <Box>
              <Text asChild color={'gray'}>
                <dt>{t('mealTypes')}</dt>
              </Text>
              <Text asChild>
                <dd>
                  {mealTypes!.data.map((mealType, index) => (
                    <Fragment key={mealType.id}>
                      <Link asChild>
                        <NextLink
                          href={{
                            pathname: '/recipes',
                            query: stringify(
                              resolveSearchParams(
                                { mealTypes: { data: [mealType] } },
                                searchConfig.filters
                              ),
                              {
                                arrayFormat: 'repeat',
                                encodeValuesOnly: true,
                              }
                            ),
                          }}
                        >
                          {mealType.attributes.name}
                        </NextLink>
                      </Link>
                      {index < mealTypes!.data.length - 1 ? ', ' : null}
                    </Fragment>
                  ))}
                </dd>
              </Text>
            </Box>
          ) : null}
          {Array.isArray(methods?.data) && methods!.data.length > 0 ? (
            <Box>
              <Text asChild color={'gray'}>
                <dt>{t('methods')}</dt>
              </Text>
              <Text asChild>
                <dd>
                  {methods!.data.map((method, index) => (
                    <Fragment key={method.id}>
                      <Link asChild>
                        <NextLink
                          href={{
                            pathname: '/recipes',
                            query: stringify(
                              resolveSearchParams(
                                { methods: { data: [method] } },
                                searchConfig.filters
                              ),
                              {
                                arrayFormat: 'repeat',
                                encodeValuesOnly: true,
                              }
                            ),
                          }}
                        >
                          {method.attributes.name}
                        </NextLink>
                      </Link>
                      {index < methods!.data.length - 1 ? ', ' : null}
                    </Fragment>
                  ))}
                </dd>
              </Text>
            </Box>
          ) : null}
          {Array.isArray(seasons?.data) && seasons!.data.length > 0 ? (
            <Box>
              <Text asChild color={'gray'}>
                <dt>{t('seasons')}</dt>
              </Text>
              <Text asChild>
                <dd>
                  {seasons!.data.map((season, index) => (
                    <Fragment key={season.id}>
                      <Link asChild>
                        <NextLink
                          href={{
                            pathname: '/recipes',
                            query: stringify(
                              resolveSearchParams(
                                { seasons: { data: [season] } },
                                searchConfig.filters
                              ),
                              {
                                arrayFormat: 'repeat',
                                encodeValuesOnly: true,
                              }
                            ),
                          }}
                        >
                          {season.attributes.name}
                        </NextLink>
                      </Link>
                      {index < seasons!.data.length - 1 ? ', ' : null}
                    </Fragment>
                  ))}
                </dd>
              </Text>
            </Box>
          ) : null}
        </dl>
      </Grid>
    </Flex>
  );
};
