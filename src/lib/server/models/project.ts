import projectData from '$lib/server/data/projects.yml'
import type { Link } from '$lib/server/models/link'

export default class Project {
  title: string
  description: string
  featured: boolean
  links: Link[]
  tags: string[]

  static async getAll(): Promise<Project[]> {
    return projectData as Project[]
  }
}
