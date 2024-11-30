import { describe, it, expect } from 'vitest'
import Post from './post'

describe('models | post', () => {
  it('should map post dates and slugs as descriptors', async () => {
    // Just test the first one
    const [[date, slug]] = await Post.getPostDescriptors()
    expect(date).toMatch(/\d{4}-\d{2}-\d{2}/)
    expect(slug).toBeDefined()
  })
})
