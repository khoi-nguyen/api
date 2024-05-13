import { z } from "zod";

export const Markdown = z.object({
  component: z.literal("Markdown"),
  props: z.object({
    value: z.string(),
  }),
});

export const FormulaSchema = z.object({
  component: z.literal("Formula"),
  props: z.object({
    value: z.string(),
  }),
});

export const PageSchema = z.object({
  component: z.literal("Page"),
  children: z.array(Markdown).optional(),
  props: z.object({
    title: z.string(),
  }),
});

export const Node = PageSchema.or(Markdown).or(FormulaSchema);

export type NodeType = z.infer<typeof Node>;
