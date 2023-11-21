const plugins = ({ env }: { env: any }) => ({
  meilisearch: {
    config: {
      apiKey: env('SEARCH_MASTER_KEY'),
      host: `${env('SEARCH_PROTOCOL')}://${env('SEARCH_HOST')}:${env(
        'SEARCH_PORT'
      )}`,
      recipe: {
        settings: {
          filterableAttributes: [
            'categories',
            'courses',
            'cuisines',
            'diets',
            'id',
            'locale',
            'mainIngredients',
            'mealTypes',
            'methods',
            'seasons',
          ],
          sortableAttributes: ['createdAt', 'title'],
        },
      },
    },
  },
  'preview-button': {
    config: {
      contentTypes: [
        {
          draft: {
            openTarget: '_blank',
            url: `${env('WEB_BASE_URL')}/api/preview/home-page`,
            query: {
              locale: '{locale}',
              publicationState: 'preview',
              secret: env('WEB_TOKEN'),
            },
          },
          published: {
            openTarget: '_blank',
            url: `${env('WEB_BASE_URL')}/api/preview/home-page`,
            query: {
              locale: '{locale}',
              publicationState: 'live',
              secret: env('WEB_TOKEN'),
            },
          },
          uid: 'api::home-page.home-page',
        },
        {
          draft: {
            openTarget: '_blank',
            url: `${env('WEB_BASE_URL')}/api/preview/pages/{slug}`,
            query: {
              locale: '{locale}',
              publicationState: 'preview',
              secret: env('WEB_TOKEN'),
            },
          },
          published: {
            openTarget: '_blank',
            url: `${env('WEB_BASE_URL')}/api/preview/pages/{slug}`,
            query: {
              locale: '{locale}',
              publicationState: 'live',
              secret: env('WEB_TOKEN'),
            },
          },
          uid: 'api::page.page',
        },
        {
          draft: {
            openTarget: '_blank',
            url: `${env('WEB_BASE_URL')}/api/preview/recipes/{slug}`,
            query: {
              locale: '{locale}',
              publicationState: 'preview',
              secret: env('WEB_TOKEN'),
            },
          },
          published: {
            openTarget: '_blank',
            url: `${env('WEB_BASE_URL')}/api/preview/recipes/{slug}`,
            query: {
              locale: '{locale}',
              publicationState: 'live',
              secret: env('WEB_TOKEN'),
            },
          },
          uid: 'api::recipe.recipe',
        },
        {
          draft: {
            openTarget: '_blank',
            url: `${env('WEB_BASE_URL')}/api/preview/recipe-search-page`,
            query: {
              locale: '{locale}',
              publicationState: 'preview',
              secret: env('WEB_TOKEN'),
            },
          },
          published: {
            openTarget: '_blank',
            url: `${env('WEB_BASE_URL')}/api/preview/recipe-search-page`,
            query: {
              locale: '{locale}',
              publicationState: 'live',
              secret: env('WEB_TOKEN'),
            },
          },
          uid: 'api::recipe-search-page.recipe-search-page',
        },
      ],
    },
  },
  'schemas-to-ts': {
    config: {
      acceptedNodeEnvs: ['development'],
      alwaysAddEnumSuffix: false,
      commonInterfacesFolderName: 'interfaces',
      verboseLogs: false,
    },
    enabled: false,
  },
  upload: {
    config: {
      provider: '@recipes/api-upload-provider',
      providerOptions: {
        placeholder: {
          size: 10,
        },
      },
    },
  },
  'users-permissions': {
    config: {
      jwtSecret: env('API_JWT_SECRET'),
    },
    enabled: true,
  },
});

export default plugins;
