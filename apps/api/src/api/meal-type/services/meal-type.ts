/**
 * meal-type service
 */

import { factories, type Strapi } from '@strapi/strapi';

import { slugify } from '../../../utils/lib/slugify';
import { MEAL_TYPES } from '../content-types/meal-type/data';
import type { MealType_Plain } from '../content-types/meal-type/meal-type';

export default factories.createCoreService(
  'api::meal-type.meal-type',
  ({ strapi }: { strapi: Strapi }) => ({
    bootstrap: async () => {
      const mealTypeCount = await strapi
        .db!.query('api::meal-type.meal-type')
        .count({});

      if (mealTypeCount > 0) {
        return [];
      }

      // const randomIcons = await strapi
      //   .service('api::icon.icon')!
      //   .findRandom({ fields: ['id'], limit: MEAL_TYPES.length });

      const createdMealTypes = await Promise.all(
        MEAL_TYPES.map(
          (name) =>
            strapi.entityService!.create('api::meal-type.meal-type', {
              data: {
                name,
                publishedAt: Date.now(),
                slug: slugify(name),
                // icon: randomIcons[index].id,
              },
            }) as unknown as Promise<MealType_Plain>
        )
      );

      return createdMealTypes;
    },
  })
);
