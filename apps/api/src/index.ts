import type { Strapi } from '@strapi/strapi';

import { generatePlaceholder } from './utils/lib/generate-placeholder';

const app = {
  register: ({ strapi }: { strapi: Strapi }) => {
    (strapi.plugin('upload').contentTypes.file as any).attributes.placeholder =
      { type: 'text' };
  },
  bootstrap: ({ strapi }: { strapi: Strapi }) => {
    // await strapi.service('api::icon.icon')!.bootstrap();
    // await strapi.service('api::category.category')!.bootstrap();
    // await strapi.service('api::course.course')!.bootstrap();
    // await strapi.service('api::cuisine.cuisine')!.bootstrap();
    // await strapi.service('api::diet.diet')!.bootstrap();
    // await strapi.service('api::main-ingredient.main-ingredient')!.bootstrap();
    // await strapi.service('api::meal-type.meal-type')!.bootstrap();
    // await strapi.service('api::method.method')!.bootstrap();
    // await strapi.service('api::season.season')!.bootstrap();

    strapi.db!.lifecycles.subscribe({
      models: ['plugin::upload.file'],
      beforeCreate: generatePlaceholder,
      beforeUpdate: generatePlaceholder,
    });
  },
};

export default app;
