import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import robots from 'astro-robots'

export default defineConfig({
  site: 'https://timgthomas.com',
  integrations: [mdx(), robots(), sitemap()],
})
