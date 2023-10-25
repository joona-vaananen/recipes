import * as z from 'zod';

export const recipeSearchFormSchema = z.object({
  category: z
    .union([z.string().transform((value) => [value]), z.string().array()])
    .default([]),
  course: z
    .union([z.string().transform((value) => [value]), z.string().array()])
    .default([]),
  cuisine: z
    .union([z.string().transform((value) => [value]), z.string().array()])
    .default([]),
  diet: z
    .union([z.string().transform((value) => [value]), z.string().array()])
    .default([]),
  ingredient: z
    .union([z.string().transform((value) => [value]), z.string().array()])
    .default([]),
  mealType: z
    .union([z.string().transform((value) => [value]), z.string().array()])
    .default([]),
  method: z
    .union([z.string().transform((value) => [value]), z.string().array()])
    .default([]),
  season: z
    .union([z.string().transform((value) => [value]), z.string().array()])
    .default([]),
});

export type RecipeSearchFormSchema = z.infer<typeof recipeSearchFormSchema>;
