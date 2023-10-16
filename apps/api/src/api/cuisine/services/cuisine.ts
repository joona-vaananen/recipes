/**
 * cuisine service
 */

import { factories, type Strapi } from '@strapi/strapi';

import { slugify } from '../../../utils/lib/slugify';
import type { Cuisine_Plain } from '../content-types/cuisine/cuisine';
import { CUISINES } from '../content-types/cuisine/data';

export default factories.createCoreService(
  'api::cuisine.cuisine',
  ({ strapi }: { strapi: Strapi }) => ({
    bootstrap: async () => {
      const cuisineCount = await strapi.db
        .query('api::cuisine.cuisine')
        .count({});

      if (cuisineCount > 0) {
        return [];
      }

      const createdCuisines = await Promise.all(
        CUISINES.map(
          (name) =>
            strapi.entityService.create('api::cuisine.cuisine', {
              data: {
                name,
                publishedAt: Date.now(),
                slug: slugify(name),
              },
            }) as Promise<Cuisine_Plain>
        )
      );

      return createdCuisines;
    },
  })
);
