import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

const config = {
  kit: {
    adapter: adapter(),
    prerender: {
      handleHttpError() {
        console.warn('missing file/image')
        return
      },
      handleMissingId() {
        console.warn('missing id for link')
        return
      },
    },
  },
  preprocess: vitePreprocess(),
}

export default config
