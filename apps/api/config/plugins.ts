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
            'ingredients',
            'mealTypes',
            'methods',
            'seasons',
          ],
          sortableAttributes: ['createdAt', 'title'],
        },
      },
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
