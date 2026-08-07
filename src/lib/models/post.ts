import { type CollectionEntry, getCollection } from 'astro:content'

type DatedPost = CollectionEntry<'blog'> & {
  date: Date
  slug: string
  year: string
  month: string
  url: string
}

type Post = DatedPost & {
  prevPost: DatedPost | null
  nextPost: DatedPost | null
}

const newestToOldest = (a: DatedPost, b: DatedPost) => b.date.valueOf() - a.date.valueOf()

export async function getPosts(): Promise<Post[]> {
  const posts = (await getCollection('blog')).map(updateWithDateFromFilename)

  return posts.sort(newestToOldest).map((post, index, allPosts) => {
    return {
      ...post,
      prevPost: allPosts[index + 1] ?? null,
      nextPost: allPosts[index - 1] ?? null,
    }
  })
}

function updateWithDateFromFilename(post: CollectionEntry<'blog'>): DatedPost {
  // TODO: For some reason, the pattern `{post}/index.md` resolves to
  // `{post.md}` on some pages, and with `/index.md` on others. Kind of a game
  // of Whack-a-Mole with URLs at the moment.
  const match = post.id.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md(x?)$/)

  if (!match) throw new Error(`Bad filename: ${post.id}`)

  const [, year, month, day, slug] = match

  return {
    ...post,
    date: new Date(`${year}-${month}-${day}`),
    slug,
    year,
    month,
    url: `/${year}/${month}/${slug}`.replace(/\/index$/, ''),
  }
}
