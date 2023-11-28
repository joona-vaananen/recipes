import * as z from 'zod';

export const commentFormSchema = z.object({
  name: z.string().min(1).max(50),
  comment: z.string().min(1).max(500),
  userId: z.string().uuid(),
  rating: z.number().min(1).max(5).nullish(),
});

export type CommentFormSchema = z.infer<typeof commentFormSchema>;

export const commentFormWithTokenSchema = commentFormSchema.extend({
  token: z.string().min(1),
});

export type CommentFormWithTokenSchema = z.infer<typeof commentFormWithTokenSchema>;

