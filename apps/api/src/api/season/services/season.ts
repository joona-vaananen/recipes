/**
 * season service
 */

import { factories, type Strapi } from '@strapi/strapi';

import { slugify } from '../../../utils/lib/slugify';
import { SEASONS } from '../content-types/season/data';
import type { Season_Plain } from '../content-types/season/season';

export default factories.createCoreService(
  'api::season.season',
  ({ strapi }: { strapi: Strapi }) => ({
    bootstrap: async () => {
      const seasonCount = await strapi.db.query('api::season.season').count({});

      if (seasonCount > 0) {
        return [];
      }

      const randomIcons = await strapi
        .service('api::icon.icon')!
        .findRandom({ fields: ['id'], limit: SEASONS.length });

      const createdSeasons = await Promise.all(
        SEASONS.map(
          (name, index) =>
            strapi.entityService.create('api::season.season', {
              data: {
                name,
                publishedAt: Date.now(),
                slug: slugify(name),
                icon: randomIcons[index].id,
              },
            }) as Promise<Season_Plain>
        )
      );

      return createdSeasons;
    },
  })
);
