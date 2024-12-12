import { error, redirect } from '@sveltejs/kit'
import Post from '$lib/server/models/post'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
  const post = await Post.get(params.slug)
  if (!post) error(404, 'Not found')
  redirect(301, `/blog/${post.slug}`)
}
