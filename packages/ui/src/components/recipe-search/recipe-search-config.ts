export const recipeSearchConfig = {
  filters: {
    category: { attribute: 'categories' },
    course: { attribute: 'courses' },
    cuisine: { attribute: 'cuisines' },
    diet: { attribute: 'diets' },
    ingredient: { attribute: 'ingredients' },
    mealType: { attribute: 'mealTypes' },
    method: { attribute: 'methods' },
    season: { attribute: 'seasons' },
  },
};

export type RecipeSearchConfig = typeof recipeSearchConfig;
