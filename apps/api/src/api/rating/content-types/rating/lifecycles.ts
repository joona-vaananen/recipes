import { BeforeRunEvent } from '@/common/interfaces/BeforeRunEvent';
import { AfterRunEvent } from '../../../../common/interfaces/AfterRunEvent';

const lifecycles = {
  afterCreate: async (
    event: AfterRunEvent<Record<string, any>, { id: number }>
  ) => {
    const id = event.result.id;

    const { recipe } = (await strapi.entityService.findOne(
      'api::rating.rating',
      id,
      {
        fields: ['id'],
        populate: {
          recipe: {
            fields: ['id'],
          },
        },
      }
    )) as unknown as { id: number; recipe?: { id: number } };

    if (typeof recipe?.id !== 'number') {
      return;
    }

    await strapi.service('api::recipe.recipe').updateRating(recipe.id);
  },
  afterCreateMany: async () =>
    // event: AfterRunEvent<Record<string, any>, { id: number }>
    {
      // const ids = event.params.where?.$and?.[0]?.id?.$in as number[] | undefined;
      // if (!Array.isArray(ids) || ids.length === 0) {
      //   return;
      // }
      // await Promise.all(
      //   ids.map(async (id) => {
      //     const { recipe } = (await strapi.entityService.findOne(
      //       'api::rating.rating',
      //       id,
      //       {
      //         fields: ['id'],
      //         populate: {
      //           recipe: {
      //             fields: ['id'],
      //           },
      //         },
      //       }
      //     )) as unknown as { id: number; recipe?: { id: number } };
      //     if (typeof recipe?.id !== 'number') {
      //       return;
      //     }
      //     return await strapi
      //       .service('api::recipe.recipe')
      //       .updateRating(recipe.id);
      //   })
      // );
    },
  afterDelete: async (
    event: AfterRunEvent<{ recipe?: { id: number } }, { id: number }>
  ) => {
    const recipe = event.state.recipe;

    if (typeof recipe?.id !== 'number') {
      return;
    }

    await strapi.service('api::recipe.recipe').updateRating(recipe.id);
  },
  afterDeleteMany: async (
    event: AfterRunEvent<{ recipes: { id: number }[] }, { id: number }>
  ) => {
    const recipes = event.state.recipes;

    if (recipes.length === 0) {
      return;
    }

    await Promise.all(
      recipes.map((recipe) =>
        strapi.service('api::recipe.recipe').updateRating(recipe.id)
      )
    );
  },
  afterUpdate: async (
    event: AfterRunEvent<Record<string, any>, { id: number }>
  ) => {
    const id = event.result.id;

    const { recipe } = (await strapi.entityService.findOne(
      'api::rating.rating',
      id,
      {
        fields: ['id'],
        populate: {
          recipe: {
            fields: ['id'],
          },
        },
      }
    )) as unknown as { id: number; recipe?: { id: number } };

    if (typeof recipe?.id !== 'number') {
      return;
    }

    await strapi.service('api::recipe.recipe').updateRating(recipe.id);
  },
  afterUpdateMany: async () =>
    // event: AfterRunEvent<Record<string, any>, { id: number }>
    {
      // const ids = event.params.where?.$and?.[0]?.id?.$in as number[] | undefined;
      // if (!Array.isArray(ids) || ids.length === 0) {
      //   return;
      // }
      // await Promise.all(
      //   ids.map(async (id) => {
      //     const { recipe } = (await strapi.entityService.findOne(
      //       'api::rating.rating',
      //       id,
      //       {
      //         fields: ['id'],
      //         populate: {
      //           recipe: {
      //             fields: ['id'],
      //           },
      //         },
      //       }
      //     )) as unknown as { id: number; recipe?: { id: number } };
      //     if (typeof recipe?.id !== 'number') {
      //       return;
      //     }
      //     return await strapi
      //       .service('api::recipe.recipe')
      //       .updateRating(recipe.id);
      //   })
      // );
    },
  beforeDelete: async (event: BeforeRunEvent<Record<string, any>>) => {
    const id = event.params.where.id as number;

    const { recipe } = (await strapi.entityService.findOne(
      'api::rating.rating',
      id,
      {
        fields: ['id'],
        populate: {
          recipe: {
            fields: ['id'],
          },
        },
      }
    )) as unknown as { id: number; recipe?: { id: number } };

    event.state = { recipe };
  },
  beforeDeleteMany: async (event: BeforeRunEvent<Record<string, any>>) => {
    const ids = event.params.where?.$and?.[0]?.id?.$in as number[] | undefined;

    if (!Array.isArray(ids) || ids.length === 0) {
      return;
    }

    const ratings = (await strapi.entityService.findMany('api::rating.rating', {
      fields: ['id'],
      filters: {
        id: {
          $in: ids,
        },
      },
      populate: {
        recipe: {
          fields: ['id'],
        },
      },
    })) as unknown as { id: number; recipe?: { id: number } }[];

    const recipes = Object.values(
      ratings.reduce(
        (accumulatedRecipes, rating) => {
          const { recipe } = rating;

          if (
            typeof recipe?.id === 'number' &&
            !(recipe.id in accumulatedRecipes)
          ) {
            accumulatedRecipes[recipe.id] = recipe;
          }

          return accumulatedRecipes;
        },
        {} as Record<number, { id: number }>
      )
    );

    event.state = { recipes };
  },
};

export default lifecycles;
