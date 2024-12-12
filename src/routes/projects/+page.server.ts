import Project from '$lib/server/models/project'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const projects = await Project.getAll()
  return { projects }
}
