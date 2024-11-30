import Post from '$lib/server/models/post'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  return { post: (await Post.getAll())[0] }
}
