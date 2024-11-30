import { globby } from 'globby'
import matter from 'gray-matter'
import { readFile } from 'node:fs/promises'
import { join } from 'path'

const postsDirectory = join(process.cwd(), 'src', 'lib', 'data', 'posts')

export default class Post {
  title: string
  slug: string
  year: number
  content: string

  static async getAll(): Promise<Post[]> {
    const paths = await globby(`${postsDirectory}/**/*.md`)
    return (await Promise.all(paths.map(Post.get))).sort(Post.byDate)
  }

  static async get(path: string): Promise<Post> {
    const fileContents = await readFile(path, 'utf8')

    // Contents
    const { content, data } = matter(fileContents)

    // Metadata: Posts' dates and slugs are filename-based.
    const barePath = path.replace(postsDirectory, '')
    const [, year, slug] = barePath.match(/^\/([\w-]+)\/([\w-]+)\.md/i)

    return { title: data.title, slug, year: Number(year), content } as Post
  }

  static byDate(lhs: Post, rhs: Post): number {
    return rhs.year - lhs.year
  }
}
