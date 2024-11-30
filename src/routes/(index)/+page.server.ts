import Post from '$lib/server/models/post'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
  const posts = await Post.getAll()
  return { posts }
}
