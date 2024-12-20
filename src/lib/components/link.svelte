<script lang="ts">
  import type { Link } from '$lib/server/models/link'

  interface Props {
    // href: string
    link: Link
  }

  const { link }: Props = $props()

  // let title = $derived(href)
</script>

<a href={link?.link} rel="noreferrer" target="_blank">{link?.type}</a>

<style>
  a::after {
    content: ' ->';
  }
</style>
