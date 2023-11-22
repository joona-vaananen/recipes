/**
 * recipe service
 */

import { factories, type Strapi } from '@strapi/strapi';

export default factories.createCoreService(
  'api::recipe.recipe',
  ({ strapi }: { strapi: Strapi }) => ({
    updateRating: async (recipe: {
      id: number;
      localizations: { id: number }[];
    }) => {
      const recipes = [recipe, ...(recipe.localizations ?? [])];

      const ratings = (await strapi.entityService!.findMany(
        'api::rating.rating',
        {
          fields: ['id', 'score'],
          filters: {
            recipe: {
              id: {
                $in: recipes.map((recipe) => recipe.id),
              },
            },
          },
        }
      )) as unknown as { id: number; score: number }[];

      const averageRating =
        ratings.length > 0
          ? ratings.reduce((total, rating) => total + rating.score, 0) /
            ratings.length
          : null;

      const ratingCount = ratings.length;

      return await Promise.all(
        recipes.map((recipe) => {
          return strapi.entityService!.update('api::recipe.recipe', recipe.id, {
            fields: ['averageRating', 'id', 'ratingCount'],
            data: { averageRating, ratingCount } as any,
          }) as unknown as Promise<{
            averageRating: number;
            id: number;
            ratingCount: number;
          }>;
        })
      );
    },
  })
);
