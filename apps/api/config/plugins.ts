const plugins = ({ env }: { env: any }) => ({
  meilisearch: {
    config: {
      apiKey: env('SEARCH_ADMIN_API_KEY'),
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
          sortableAttributes: ['averageRating', 'publishedAt', 'title'],
        },
        transformEntry: ({ entry }: { entry: any }) => {
          return {
            averageRating: entry.averageRating,
            categories:
              entry.categories?.map((category: any) => ({
                name: category.name,
                slug: category.slug,
              })) ?? null,
            courses:
              entry.courses?.map((course: any) => ({
                name: course.name,
                slug: course.slug,
              })) ?? null,
            cuisines:
              entry.cuisines?.map((cuisine: any) => ({
                name: cuisine.name,
                slug: cuisine.slug,
              })) ?? null,
            diets:
              entry.diets?.map((diet: any) => ({
                name: diet.name,
                slug: diet.slug,
              })) ?? null,
            cookTime: entry.cookTime,
            id: entry.id,
            image: entry.image && {
              placeholder: entry.image.placeholder,
              url: entry.image.url,
            },
            locale: entry.locale,
            mainIngredients:
              entry.mainIngredients?.map((mainIngredient: any) => ({
                name: mainIngredient.name,
                slug: mainIngredient.slug,
              })) ?? null,
            mealTypes:
              entry.mealTypes?.map((mealType: any) => ({
                name: mealType.name,
                slug: mealType.slug,
              })) ?? null,
            methods:
              entry.methods?.map((method: any) => ({
                name: method.name,
                slug: method.slug,
              })) ?? null,
            prepTime: entry.prepTime,
            publishedAt: entry.publishedAt,
            restingTime: entry.restingTime,
            seasons:
              entry.seasons?.map((season: any) => ({
                name: season.name,
                slug: season.slug,
              })) ?? null,
            slug: entry.slug,
            title: entry.title,
          };
        },
      },
    },
    enabled: true,
  },
  'preview-button': {
    config: {
      contentTypes: [
        {
          draft: {
            alwaysVisible: true,
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
            alwaysVisible: true,
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
            alwaysVisible: true,
            openTarget: '_blank',
            url: `${env('WEB_BASE_URL')}/api/preview/privacy-policy-page`,
            query: {
              locale: '{locale}',
              publicationState: 'preview',
              secret: env('WEB_TOKEN'),
            },
          },
          published: {
            openTarget: '_blank',
            url: `${env('WEB_BASE_URL')}/api/preview/privacy-policy-page`,
            query: {
              locale: '{locale}',
              publicationState: 'live',
              secret: env('WEB_TOKEN'),
            },
          },
          uid: 'api::privacy-policy-page.privacy-policy-page',
        },
        {
          draft: {
            alwaysVisible: true,
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
        {
          draft: {
            alwaysVisible: true,
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
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env('API_AWS_ACCESS_KEY'),
            secretAccessKey: env('API_AWS_SECRET_ACCESS_KEY'),
          },
          params: {
            ACL: 'public-read',
            Bucket: env('API_AWS_BUCKET'),
            signedUrlExpires: 900,
          },
          region: env('API_AWS_REGION'),
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
