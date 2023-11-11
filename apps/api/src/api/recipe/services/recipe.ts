/**
 * recipe service
 */

import { factories, type Strapi } from '@strapi/strapi';

export default factories.createCoreService(
  'api::recipe.recipe',
  ({ strapi }: { strapi: Strapi }) => ({
    updateRating: async (id: number) => {
      const ratings = (await strapi.entityService!.findMany(
        'api::rating.rating',
        {
          fields: ['id', 'score'],
          filters: { recipe: { id } },
        }
      )) as unknown as { id: number; score: number }[];

      const rating =
        ratings.length > 0
          ? ratings.reduce((total, rating) => total + rating.score, 0) /
            ratings.length
          : null;

      const recipe = (await strapi.entityService!.update(
        'api::recipe.recipe',
        id,
        {
          fields: ['id', 'rating'],
          data: { rating } as any,
        }
      )) as unknown as { id: number; rating: number };

      return recipe;
    },
  })
);
