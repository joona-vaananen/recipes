export const recipeSearchConfig = {
  filters: {
    category: { attribute: 'categories', field: 'categories.slug' },
    course: { attribute: 'courses', field: 'courses.slug' },
    cuisine: { attribute: 'cuisines', field: 'cuisines.slug' },
    diet: { attribute: 'diets', field: 'diets.slug' },
    mainIngredient: {
      attribute: 'mainIngredients',
      field: 'mainIngredients.slug',
    },
    mealType: { attribute: 'mealTypes', field: 'mealTypes.slug' },
    method: { attribute: 'methods', field: 'methods.slug' },
    season: { attribute: 'seasons', field: 'seasons.slug' },
  },
  sort: {
    'created-at': { field: 'createdAt' },
    title: { field: 'title' },
  },
};

export type RecipeSearchConfig = typeof recipeSearchConfig;
