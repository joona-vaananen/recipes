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

      const createdCourses = await Promise.all(
        COURSES.map(
          (name) =>
            strapi.entityService.create('api::course.course', {
              data: {
                name,
                publishedAt: Date.now(),
                slug: slugify(name),
              },
            }) as Promise<Course_Plain>
        )
      );

      return createdCourses;
    },
  })
);
