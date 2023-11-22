import { BeforeRunEvent } from '@/common/interfaces/BeforeRunEvent';
import { AfterRunEvent } from '../../../../common/interfaces/AfterRunEvent';

const lifecycles = {
  afterCreate: async (
    event: AfterRunEvent<Record<string, any>, { id: number }>
  ) => {
    const id = event.result.id;

    if (typeof id !== 'number') {
      return;
    }

    const { recipe } = (await strapi.entityService.findOne(
      'api::rating.rating',
      id,
      {
        fields: ['id'],
        populate: {
          recipe: {
            fields: ['id'],
            populate: {
              localizations: {
                fields: ['id'],
              },
            },
          },
        },
      }
    )) as unknown as {
      id: number;
      recipe?: { id: number; localizations: { id: number }[] };
    };

    if (typeof recipe?.id !== 'number') {
      return;
    }

    await strapi.service('api::recipe.recipe').updateRating(recipe);
  },
  afterCreateMany: async (
    event: AfterRunEvent<Record<string, any>, { id: number }>
  ) => {
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
        recipe: {
          id: {
            $notNull: true,
          },
        },
      },
      populate: {
        recipe: {
          fields: ['id'],
          populate: {
            localizations: {
              fields: ['id'],
            },
          },
        },
      },
    })) as unknown as {
      id: number;
      recipe: { id: number; localizations: { id: number }[] };
    }[];

    const recipes = resolveRecipes(ratings);

    if (recipes.length === 0) {
      return;
    }

    await Promise.all(
      recipes.map((recipe) => {
        return strapi.service('api::recipe.recipe').updateRating(recipe);
      })
    );
  },
  afterDelete: async (
    event: AfterRunEvent<
      { recipe?: { id: number; localizations: { id: number }[] } },
      { id: number }
    >
  ) => {
    const recipe = event.state.recipe;

    if (typeof recipe?.id !== 'number') {
      return;
    }

    await strapi.service('api::recipe.recipe').updateRating(recipe);
  },
  afterDeleteMany: async (
    event: AfterRunEvent<
      { recipes: { id: number; localizations: { id: number }[] }[] },
      { id: number }
    >
  ) => {
    const recipes = event.state.recipes;

    if (!Array.isArray(recipes) || recipes.length === 0) {
      return;
    }

    await Promise.all(
      recipes.map((recipe) => {
        return strapi.service('api::recipe.recipe').updateRating(recipe);
      })
    );
  },
  afterUpdate: async (
    event: AfterRunEvent<Record<string, any>, { id: number }>
  ) => {
    const id = event.result.id;

    if (typeof id !== 'number') {
      return;
    }

    const { recipe } = (await strapi.entityService.findOne(
      'api::rating.rating',
      id,
      {
        fields: ['id'],
        populate: {
          recipe: {
            fields: ['id'],
            populate: {
              localizations: {
                fields: ['id'],
              },
            },
          },
        },
      }
    )) as unknown as {
      id: number;
      recipe?: { id: number; localizations: { id: number }[] };
    };

    if (typeof recipe?.id !== 'number') {
      return;
    }

    await strapi.service('api::recipe.recipe').updateRating(recipe);
  },
  afterUpdateMany: async (
    event: AfterRunEvent<Record<string, any>, { id: number }>
  ) => {
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
        recipe: {
          id: {
            $notNull: true,
          },
        },
      },
      populate: {
        recipe: {
          fields: ['id'],
          populate: {
            localizations: {
              fields: ['id'],
            },
          },
        },
      },
    })) as unknown as {
      id: number;
      recipe: { id: number; localizations: { id: number }[] };
    }[];

    const recipes = resolveRecipes(ratings);

    if (recipes.length === 0) {
      return;
    }

    await Promise.all(
      recipes.map((recipe) => {
        return strapi.service('api::recipe.recipe').updateRating(recipe);
      })
    );
  },
  beforeDelete: async (event: BeforeRunEvent<Record<string, any>>) => {
    const id = event.params.where.id as number;

    if (typeof id !== 'number') {
      return;
    }

    const { recipe } = (await strapi.entityService.findOne(
      'api::rating.rating',
      id,
      {
        fields: ['id'],
        populate: {
          recipe: {
            fields: ['id'],
            populate: {
              localizations: {
                fields: ['id'],
              },
            },
          },
        },
      }
    )) as unknown as {
      id: number;
      recipe?: { id: number; localizations: { id: number }[] };
    };

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
        recipe: {
          id: {
            $notNull: true,
          },
        },
      },
      populate: {
        recipe: {
          fields: ['id'],
          populate: {
            localizations: {
              fields: ['id'],
            },
          },
        },
      },
    })) as unknown as {
      id: number;
      recipe: { id: number; localizations: { id: number }[] };
    }[];

    const recipes = resolveRecipes(ratings);

    event.state = { recipes };
  },
};

export default lifecycles;

const resolveRecipes = (
  ratings: {
    id: number;
    recipe: { id: number; localizations: { id: number }[] };
  }[]
) => {
  return Object.values(
    ratings.reduce(
      (accumulatedRecipes, rating) => {
        const { recipe } = rating;

        return {
          ...accumulatedRecipes,
          [recipe.id]: recipe,
        };
      },
      {} as Record<number, { id: number; localizations: { id: number }[] }>
    )
  );
};
