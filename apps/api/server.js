const strapi = require('@strapi/strapi');

/** @type {import('@strapi/strapi').Strapi} */
const app = strapi({ appDir: './apps/api', distDir: './apps/api/dist' });

void app.start();
