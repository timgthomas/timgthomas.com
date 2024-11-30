import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, parent }) => {
  const { posts } = await parent()
  const post = posts.find(({ slug }) => slug.endsWith(params.slug))
  // const postPath = `/${params.year}/${params.month}-${params.slug}.md`
  // const post = await Post.get(postPath)
  return post ?? error(404, 'Not found')
}
