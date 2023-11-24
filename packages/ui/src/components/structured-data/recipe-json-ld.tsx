import Fraction from 'fraction.js';
import type { Recipe as RecipeSchema, WithContext } from 'schema-dts';

import type { Recipe } from '@recipes/api/src/api/recipe/content-types/recipe/recipe';
import { BASE_URL, SITE_NAME } from '../../constants';
import { resolveTextFromRichText } from '../rich-text/resolve-text-from-rich-text';
import type { RichTextBlock } from '../rich-text/rich-text-block-types';

interface RecipeJsonLdProps {
  recipe: Recipe;
}

export const RecipeJsonLd = ({ recipe }: RecipeJsonLdProps) => {
  const recipeJsonLd = createRecipeJsonLd(recipe);

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
      type={'application/ld+json'}
    />
  );
};

const createRecipeJsonLd = (recipe: Recipe): WithContext<RecipeSchema> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.attributes.title,
    image: recipe.attributes.image?.data
      ? [
          `${BASE_URL}${
            recipe.attributes.image.data.attributes.formats?.large.url ??
            recipe.attributes.image.data.attributes.url
          }`,
        ]
      : undefined,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    datePublished: (
      recipe.attributes.publishedAt as unknown as string | undefined
    )?.split('T')[0],
    description: recipe.attributes.description,
    prepTime:
      typeof recipe.attributes.prepTime === 'number'
        ? `PT${recipe.attributes.prepTime}M`
        : undefined,
    cookTime:
      typeof recipe.attributes.cookTime === 'number'
        ? `PT${recipe.attributes.cookTime}M`
        : undefined,
    totalTime:
      typeof recipe.attributes.prepTime === 'number' ||
      typeof recipe.attributes.restingTime === 'number' ||
      typeof recipe.attributes.cookTime === 'number'
        ? `PT${
            (recipe.attributes.prepTime ?? 0) +
            (recipe.attributes.restingTime ?? 0) +
            (recipe.attributes.cookTime ?? 0)
          }M`
        : undefined,
    keywords: [
      ...(recipe.attributes.mealTypes?.data?.map(
        (mealType) => mealType.attributes.name
      ) ?? []),
      ...(recipe.attributes.courses?.data?.map(
        (course) => course.attributes.name
      ) ?? []),
      ...(recipe.attributes.diets?.data?.map((diet) => diet.attributes.name) ??
        []),
      ...(recipe.attributes.seasons?.data?.map(
        (season) => season.attributes.name
      ) ?? []),
      ...(recipe.attributes.methods?.data?.map(
        (method) => method.attributes.name
      ) ?? []),
      ...(recipe.attributes.mainIngredients?.data?.map(
        (mainIngredient) => mainIngredient.attributes.name
      ) ?? []),
    ].join(', '),
    recipeYield: `${recipe.attributes.servings}`,
    recipeCategory: recipe.attributes.categories?.data
      ?.map((category) => category.attributes.name)
      .join(', '),
    recipeCuisine: recipe.attributes.cuisines?.data
      ?.map((cuisine) => cuisine.attributes.name)
      .join(', '),
    // nutrition: {
    //   '@type': 'NutritionInformation',
    //   calories: '270 calories',
    // },
    recipeIngredient: recipe.attributes.ingredients?.flatMap((ingredient) =>
      ingredient.items.map((item) =>
        [
          item.amount && new Fraction(item.amount).toFraction(true),
          item.unit,
          resolveTextFromRichText(item.content as RichTextBlock[]),
        ]
          .filter((attribute) => attribute)
          .join(' ')
      )
    ),
    recipeInstructions:
      Array.isArray(recipe.attributes.instructions) &&
      recipe.attributes.instructions.length > 1
        ? recipe.attributes.instructions.map((instruction) => ({
            '@type': 'HowToSection',
            name: instruction.title,
            itemListElement: instruction.items.map((item) => ({
              '@type': 'HowToStep',
              text: resolveTextFromRichText(item.content as RichTextBlock[]),
            })),
          }))
        : recipe.attributes.instructions.flatMap((instruction) =>
            instruction.items.map((item) => ({
              '@type': 'HowToStep',
              text: resolveTextFromRichText(item.content as RichTextBlock[]),
            }))
          ),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: `${recipe.attributes.averageRating}`,
      ratingCount: `${recipe.attributes.ratingCount}`,
    },
  };
};
