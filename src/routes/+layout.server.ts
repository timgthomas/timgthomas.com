import Post from '$lib/server/models/post'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async () => {
  return {
    posts: await Post.getAll(),
  }
}
