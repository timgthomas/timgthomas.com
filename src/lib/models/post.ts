import { getCollection } from 'astro:content'

const newestToOldest = (a, b) => b.date.valueOf() - a.date.valueOf()

export async function getPosts() {
  return (await getCollection('blog'))
    .flatMap(updateWithDateFromFilename)
    .sort(newestToOldest)
    .map((post, index, allPosts) => {
      return {
        ...post,
        prevPost: allPosts[index + 1] ?? null,
        nextPost: allPosts[index - 1] ?? null,
      }
    })
}

function updateWithDateFromFilename(post) {
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
