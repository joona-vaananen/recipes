/**
 * icon service
 */

import { factories, type Strapi } from '@strapi/strapi';
import shuffle from 'lodash.shuffle';

import { ICONS } from '../content-types/icon/data';
import type { Icon_Plain } from '../content-types/icon/icon';

export default factories.createCoreService(
  'api::icon.icon',
  ({ strapi }: { strapi: Strapi }) => ({
    bootstrap: async () => {
      const iconCount = await strapi.db!.query('api::icon.icon').count({});

      if (iconCount > 0) {
        return [];
      }

      const createdIcons = await Promise.all(
        ICONS.map(
          (name) =>
            strapi.entityService!.create('api::icon.icon', {
              data: {
                name,
              },
            }) as unknown as Promise<Icon_Plain>
        )
      );

      return createdIcons;
    },
    findRandom: async ({
      limit,
      ...params
    }: {
      limit?: number;
      [key: string]: any;
    }) => {
      const icons = (await strapi.entityService!.findMany(
        'api::icon.icon',
        params
      )) as unknown as Icon_Plain[];

      const randomIcons = shuffle(icons).slice(0, limit ?? icons.length);

      return randomIcons;
    },
  })
);
