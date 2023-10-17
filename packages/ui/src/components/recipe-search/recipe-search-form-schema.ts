import * as z from 'zod';

export const recipeSearchFormSchema = z.object({
  category: z.union([z.string(), z.string().array()]).nullish(),
  course: z.union([z.string(), z.string().array()]).nullish(),
  cuisine: z.union([z.string(), z.string().array()]).nullish(),
  diet: z.union([z.string(), z.string().array()]).nullish(),
  ingredient: z.union([z.string(), z.string().array()]).nullish(),
  mealType: z.union([z.string(), z.string().array()]).nullish(),
  method: z.union([z.string(), z.string().array()]).nullish(),
  season: z.union([z.string(), z.string().array()]).nullish(),
});

export type RecipeSearchFormSchema = z.infer<typeof recipeSearchFormSchema>;
