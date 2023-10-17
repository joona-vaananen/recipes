/**
 * diet service
 */

import { factories, type Strapi } from '@strapi/strapi';

import { slugify } from '../../../utils/lib/slugify';
import { DIETS } from '../content-types/diet/data';
import type { Diet_Plain } from '../content-types/diet/diet';

export default factories.createCoreService(
  'api::diet.diet',
  ({ strapi }: { strapi: Strapi }) => ({
    bootstrap: async () => {
      const dietCount = await strapi.db.query('api::diet.diet').count({});

      if (dietCount > 0) {
        return [];
      }

      const randomIcons = await strapi
        .service('api::icon.icon')!
        .findRandom({ fields: ['id'], limit: DIETS.length });

      const createdDiets = await Promise.all(
        DIETS.map(
          (name, index) =>
            strapi.entityService.create('api::diet.diet', {
              data: {
                name,
                publishedAt: Date.now(),
                slug: slugify(name),
                icon: randomIcons[index].id,
              },
            }) as Promise<Diet_Plain>
        )
      );

      return createdDiets;
    },
  })
);
