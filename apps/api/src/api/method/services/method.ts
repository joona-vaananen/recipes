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
      const methodCount = await strapi.db.query('api::method.method').count({});

      if (methodCount > 0) {
        return [];
      }

      const createdMethods = await Promise.all(
        METHODS.map(
          (name) =>
            strapi.entityService.create('api::method.method', {
              data: {
                name,
                publishedAt: Date.now(),
                slug: slugify(name),
              },
            }) as Promise<Method_Plain>
        )
      );

      return createdMethods;
    },
  })
);
