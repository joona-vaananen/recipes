/**
 * course service
 */

import { factories, type Strapi } from '@strapi/strapi';

import { slugify } from '../../../utils/lib/slugify';
import type { Course_Plain } from '../content-types/course/course';
import { COURSES } from '../content-types/course/data';

export default factories.createCoreService(
  'api::course.course',
  ({ strapi }: { strapi: Strapi }) => ({
    bootstrap: async () => {
      const courseCount = await strapi.db.query('api::course.course').count({});

      if (courseCount > 0) {
        return [];
      }

      const randomIcons = await strapi
        .service('api::icon.icon')!
        .findRandom({ fields: ['id'], limit: COURSES.length });

      const createdCourses = await Promise.all(
        COURSES.map(
          (name, index) =>
            strapi.entityService.create('api::course.course', {
              data: {
                name,
                publishedAt: Date.now(),
                slug: slugify(name),
                icon: randomIcons[index].id,
              },
            }) as Promise<Course_Plain>
        )
      );

      return createdCourses;
    },
  })
);
