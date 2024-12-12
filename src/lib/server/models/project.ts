import projectData from '$lib/server/data/projects.yml'

interface Link {
  type: 'app store' | 'facebook' | 'github' | 'web'
  link: string
}

export default class Project {
  title: string
  description?: string
  featured: boolean
  links: Link[]
  tags: string[]

  static async getAll(): Promise<Project[]> {
    return projectData as Project[]
  }
}
