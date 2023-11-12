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

      const averageRating =
        ratings.length > 0
          ? ratings.reduce((total, rating) => total + rating.score, 0) /
            ratings.length
          : null;

      const ratingCount = ratings.length;

      const recipe = (await strapi.entityService!.update(
        'api::recipe.recipe',
        id,
        {
          fields: ['averageRating', 'id', 'ratingCount'],
          data: { averageRating, ratingCount } as any,
        }
      )) as unknown as {
        averageRating: number;
        id: number;
        ratingCount: number;
      };

      return recipe;
    },
  })
);
