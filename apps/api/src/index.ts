import type { Strapi } from '@strapi/strapi';

const app = {
  register: ({ strapi }: { strapi: Strapi }) => {
    strapi.plugin('upload').contentTypes.file.attributes.placeholder = {
      type: 'text',
    };
  },
  bootstrap: (/* { strapi }: { strapi: Strapi } */) => {
    return;
  },
};

export default app;
