import { error } from '@sveltejs/kit'
import Post from '$lib/server/models/post'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const [post] = await Post.getAll()
  if (!post) error(404, 'Not found')
  return { post }
}
