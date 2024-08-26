interface ListItemLink {
  type: string
  link: string
}

interface ListItem {
  title: string
  summary: string
  type: 'project' | 'talk'
  description?: string
  heroImageUrl: string
  featured?: boolean
  links: ListItemLink[]
}

export { type ListItem }
