import * as z from 'zod';

export const ingredientListSchema = z.object({
  servings: z
    .number()
    .min(0)
    .max(100)
    .optional()
    .transform((value) => (value ? Math.max(value, 1) : 1)),
});

export type IngredientListSchema = z.infer<typeof ingredientListSchema>;
