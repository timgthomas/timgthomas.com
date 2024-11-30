import type { PageLoad } from './$types'

export const load: PageLoad = async ({ parent }) => {
  const { posts } = await parent()
  return { post: posts[0] }
}
