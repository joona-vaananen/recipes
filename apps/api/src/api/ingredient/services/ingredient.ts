/**
 * ingredient service
 */

import { factories, type Strapi } from '@strapi/strapi';

import { slugify } from '../../../utils/lib/slugify';
import { INGREDIENTS } from '../content-types/ingredient/data';
import type { Ingredient_Plain } from '../content-types/ingredient/ingredient';

export default factories.createCoreService(
  'api::ingredient.ingredient',
  ({ strapi }: { strapi: Strapi }) => ({
    bootstrap: async () => {
      const ingredientCount = await strapi.db
        .query('api::ingredient.ingredient')
        .count({});

      if (ingredientCount > 0) {
        return [];
      }

      const createdIngredients = await Promise.all(
        INGREDIENTS.map(
          (name) =>
            strapi.entityService.create('api::ingredient.ingredient', {
              data: {
                name,
                publishedAt: Date.now(),
                slug: slugify(name),
              },
            }) as Promise<Ingredient_Plain>
        )
      );

      return createdIngredients;
    },
  })
);
