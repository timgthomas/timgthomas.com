import Post from '$lib/server/models/post'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const posts = await Post.getAll()
  return { post: posts[0] }
}
