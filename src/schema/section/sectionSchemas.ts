import z from "zod";

export const createSectionSchema = z.object({
  name: z
    .string()
    .min(3, "Section name must be at least 3 characters"),

  description: z
    .string()
    .min(5, "Description must be at least 5 characters"),

  order: z.number().min(0),
});

export type createSectionType = z.infer<
  typeof createSectionSchema
>;

export type createSectionInputType = z.input<
  typeof createSectionSchema
>;