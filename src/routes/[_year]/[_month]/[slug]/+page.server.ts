import { error, redirect } from '@sveltejs/kit'
import Post from '$lib/server/models/post'

export const load = async ({ params }) => {
  const post = await Post.get(params.slug)
  if (!post) error(404, 'Not found')
  redirect(301, `/blog/${post.slug}`)
}
