import { describe, it, expect } from 'vitest'
import Post from './post'

describe('models | post', () => {
  it('should map post dates and slugs as descriptors', async () => {
    // Just test the first one
    const [[date, slug]] = await Post.getPostDescriptors()
    expect(date).toMatch(/\d{4}-\d{2}-\d{2}/)
    expect(slug).toBeDefined()
  })

  it('should replace asset urls in markdown content', async () => {
    const before = '![Test]($/test.png)'
    const after = '![Test](/post-assets/2000-01-01-test-slug/test.png)'

    const actual = Post.replaceAssetUrls(before, '2000-01-01', 'test-slug')
    expect(actual).toBe(after)
  })
})
