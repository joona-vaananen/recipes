import * as z from 'zod';

export const ingredientListSchema = z.object({
  servings: z.number().optional(),
});

export type IngredientListSchema = z.infer<typeof ingredientListSchema>;
