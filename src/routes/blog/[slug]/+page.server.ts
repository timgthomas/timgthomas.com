import { error } from '@sveltejs/kit'
import Post from '$lib/server/models/post'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
  const post = await Post.get(params.slug)
  return post ?? error(404, 'Not found')
}
