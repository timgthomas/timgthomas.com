import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import inspectUrls from '@jsdevtools/rehype-url-inspector'
import { defineConfig } from 'astro/config'
import robots from 'astro-robots'

const openLinksInNewTab = [
  inspectUrls,
  {
    selectors: ['a[href]'],
    inspectEach(url) {
      if (!url.node.properties.href.includes('//')) return
      url.node.properties.rel = 'noopener'
      url.node.properties.target = '_blank'
    },
  },
]

export default defineConfig({
  site: 'https://timgthomas.com',
  integrations: [mdx(), robots(), sitemap()],
  markdown: {
    rehypePlugins: [openLinksInNewTab],
    syntaxHighlight: 'prism',
  },
})
