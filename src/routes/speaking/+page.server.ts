import Talk from '$lib/server/models/talk'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const talks = await Talk.getAll()
  return { talks }
}
