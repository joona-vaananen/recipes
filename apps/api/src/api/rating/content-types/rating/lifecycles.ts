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
  afterCreateMany(event: AfterRunEvent<Record<string, any>, { id: number }>) {
    // TODO: Implement lifecycle hook
    console.log('afterCreateMany');
    console.log(JSON.stringify(event, null, 2));
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
  afterDeleteMany(event: AfterRunEvent<Record<string, any>, { id: number }>) {
    // TODO: Implement lifecycle hook
    console.log('afterDeleteMany');
    console.log(JSON.stringify(event, null, 2));
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
  afterUpdateMany(event: AfterRunEvent<Record<string, any>, { id: number }>) {
    // TODO: Implement lifecycle hook
    console.log('afterUpdateMany');
    console.log(JSON.stringify(event, null, 2));
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
};

export default lifecycles;
