import talkData from '$lib/server/data/talks.yml'
import type { Link } from '$lib/server/models/link'

export default class Talk {
  title: string
  description: string
  thumbnail: string
  conference: string
  links: Link[]
  tags: string[]

  static async getAll(): Promise<Talk[]> {
    return talkData as Talk[]
  }
}
