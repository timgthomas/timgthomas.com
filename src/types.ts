type ListItemLink = {
  type: string
  link: string
}

type ListItem = {
  title: string
  summary: string
  description?: string
  heroImageUrl: string
  featured?: boolean
  links: ListItemLink[]
}

export type { ListItem }
