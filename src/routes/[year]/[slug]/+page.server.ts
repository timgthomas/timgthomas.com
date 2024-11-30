import { error } from '@sveltejs/kit'
import Post from '$lib/server/models/post'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
  const postPath = `/${params.year}/${params.slug}.md`
  const post = await Post.get(postPath)
  return post ?? error(404, 'Not found')
}
