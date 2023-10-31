/**
 * method service
 */

import { factories, type Strapi } from '@strapi/strapi';

import { slugify } from '../../../utils/lib/slugify';
import { METHODS } from '../content-types/method/data';
import type { Method_Plain } from '../content-types/method/method';

export default factories.createCoreService(
  'api::method.method',
  ({ strapi }: { strapi: Strapi }) => ({
    bootstrap: async () => {
      const methodCount = await strapi
        .db!.query('api::method.method')
        .count({});

      if (methodCount > 0) {
        return [];
      }

      const randomIcons = await strapi
        .service('api::icon.icon')!
        .findRandom({ fields: ['id'], limit: METHODS.length });

      const createdMethods = await Promise.all(
        METHODS.map(
          (name, index) =>
            strapi.entityService!.create('api::method.method', {
              data: {
                name,
                publishedAt: Date.now(),
                slug: slugify(name),
                icon: randomIcons[index].id,
              },
            }) as unknown as Promise<Method_Plain>
        )
      );

      return createdMethods;
    },
  })
);
