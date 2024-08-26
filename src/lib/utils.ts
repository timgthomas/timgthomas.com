import { type CollectionEntry } from 'astro:content'

/**
 * Extracts a params object from a blog post that is used for generating static
 * URLs matching Hexo's old format (so as not to break SEO).
 */
const extractParamsFromPost = (post: CollectionEntry<'blog'>) => {
  const [, year, month, slug] = post.slug.match(/(\d{4})\/(\d{2})-\d{2}-(.+)/)!
  const path = `/${year}/${month}/${slug}`
  return { year, month, slug, path }
}

export { extractParamsFromPost }
