import Post from '$lib/server/models/post'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
  return { post: (await Post.getAll())[0] }
}
