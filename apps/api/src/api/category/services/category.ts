/**
 * category service
 */

import { factories, type Strapi } from '@strapi/strapi';

import { slugify } from '../../../utils/lib/slugify';
import type { Category_Plain } from '../content-types/category/category';
import { CATEGORIES } from '../content-types/category/data';

export default factories.createCoreService(
  'api::category.category',
  ({ strapi }: { strapi: Strapi }) => ({
    bootstrap: async () => {
      const categoryCount = await strapi
        .db!.query('api::category.category')
        .count({});

      if (categoryCount > 0) {
        return [];
      }

      // const randomIcons = await strapi
      //   .service('api::icon.icon')!
      //   .findRandom({ fields: ['id'], limit: CATEGORIES.length });

      const createdCategories = await Promise.all(
        CATEGORIES.map(
          (name) =>
            strapi.entityService!.create('api::category.category', {
              data: {
                name,
                publishedAt: Date.now(),
                slug: slugify(name),
                // icon: randomIcons[index].id,
              },
            }) as unknown as Promise<Category_Plain>
        )
      );

      return createdCategories;
    },
  })
);
