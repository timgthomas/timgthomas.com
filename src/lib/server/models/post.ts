import { globby } from 'globby'
import matter from 'gray-matter'
import { readFile } from 'node:fs/promises'
import { join } from 'path'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = join(process.cwd(), 'src', 'lib', 'server', 'data', 'posts')

async function render(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export default class Post {
  title: string
  slug: string
  date: string
  content: string

  static #postsCache: Post[] = []

  static async getPostDescriptors(): Promise<[string, string, string][]> {
    const fileNames = await globby(`${postsDirectory}/*.md`)
    return fileNames.map((fileName) => {
      const [, date, slug] = fileName.match(/(\d{4}-\d{2}-\d{2})-(.*).md$/i)
      return [fileName, date, slug]
    })
  }

  static async getAll(): Promise<Post[]> {
    if (this.#postsCache.length) return this.#postsCache

    const descriptors = await this.getPostDescriptors()
    this.#postsCache = await Promise.all(descriptors.map(this.#createPostFromDescriptor))

    return this.#postsCache.sort(this.byDate)
  }

  static async get(slug: string): Promise<Opt<Post>> {
    const posts = await this.getAll()
    return posts.find((post) => post.slug === slug)
  }

  static byDate(lhs: Post, rhs: Post): number {
    return rhs.date.localeCompare(lhs.date)
  }

  static replaceAssetUrls(content: string, date: string, slug: string): string {
    const shortcut = '$/'
    const fullUrl = `/post-assets/${date}-${slug}/`
    return content.replaceAll(shortcut, fullUrl)
  }

  static async #createPostFromDescriptor(descriptor: [string, string, string]): Promise<Post> {
    const [, date, slug] = descriptor

    const fileContents = await import(`$lib/server/data/posts/${date}-${slug}.md?raw`).then(
      (x) => x.default,
    )
    const { content, data } = matter(fileContents)
    const renderedContent = await render(Post.replaceAssetUrls(content, date, slug))

    return { title: data.title, slug, date: date, content: renderedContent } as Post
  }
}
