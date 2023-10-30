import * as z from 'zod';

export const recipeSearchParamsSchema = z.object({
  category: z.union([z.string(), z.string().array()]).nullish(),
  course: z.union([z.string(), z.string().array()]).nullish(),
  cuisine: z.union([z.string(), z.string().array()]).nullish(),
  diet: z.union([z.string(), z.string().array()]).nullish(),
  ingredient: z.union([z.string(), z.string().array()]).nullish(),
  mealType: z.union([z.string(), z.string().array()]).nullish(),
  method: z.union([z.string(), z.string().array()]).nullish(),
  season: z.union([z.string(), z.string().array()]).nullish(),
  sort: z
    .union([
      z.string(),
      z
        .string()
        .array()
        .transform(([value]) => value),
    ])
    .nullish(),
});

export type RecipeSearchParamsSchema = z.infer<typeof recipeSearchParamsSchema>;

export const recipeSearchPageSchema = z
  .union([
    z.string(),
    z
      .string()
      .array()
      .transform(([value]) => value),
  ])
  .default('1')
  .transform((value) => Math.max(Number(value), 1));

export type RecipeSearchPageSchema = z.infer<typeof recipeSearchPageSchema>;
