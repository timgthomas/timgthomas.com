import { defineCollection, z } from 'astro:content'

const projects = defineCollection({
  type: 'data',
  schema: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      // featured: z.boolean(),
      links: z.array(
        z.object({
          type: z.string(),
          link: z.string(),
        }),
      ),
      // tags: z.array(z.string()),
    }),
  ),
})

const talks = defineCollection({
  type: 'data',
  schema: z.array(
    z.object({
      name: z.string(),
      thumbnail: z.string(),
      description: z.string(),
      conference: z.string(),
      links: z.array(
        z.object({
          type: z.string(),
          link: z.string(),
        }),
      ),
    }),
  ),
})

export const collections = { projects, talks }
