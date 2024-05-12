import { z } from "zod";

export const Markdown = z.object({
  component: z.literal("Markdown"),
  props: z.object({
    value: z.string(),
  }),
  children: z.undefined().optional(),
});

export const Page = z.object({
  component: z.literal("Page"),
  children: z.array(Markdown).optional(),
  props: z.object({}).optional(),
});

export const Node = Page.or(Markdown);

export type NodeType = z.infer<typeof Node>;
