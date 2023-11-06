/**
 * main-ingredient service
 */

import { factories, type Strapi } from '@strapi/strapi';

import { slugify } from '../../../utils/lib/slugify';
import { MAIN_INGREDIENTS } from '../content-types/main-ingredient/data';
import type { MainIngredient_Plain } from '../content-types/main-ingredient/main-ingredient';

export default factories.createCoreService(
  'api::main-ingredient.main-ingredient',
  ({ strapi }: { strapi: Strapi }) => ({
    bootstrap: async () => {
      const mainIngredientCount = await strapi
        .db!.query('api::main-ingredient.main-ingredient')
        .count({});

      if (mainIngredientCount > 0) {
        return [];
      }

      const randomIcons = await strapi
        .service('api::icon.icon')!
        .findRandom({ fields: ['id'], limit: MAIN_INGREDIENTS.length });

      const createdMainIngredients = await Promise.all(
        MAIN_INGREDIENTS.map(
          (name, index) =>
            strapi.entityService!.create(
              'api::main-ingredient.main-ingredient',
              {
                data: {
                  name,
                  publishedAt: Date.now(),
                  slug: slugify(name),
                  icon: randomIcons[index].id,
                },
              }
            ) as unknown as Promise<MainIngredient_Plain>
        )
      );

      return createdMainIngredients;
    },
  })
);
