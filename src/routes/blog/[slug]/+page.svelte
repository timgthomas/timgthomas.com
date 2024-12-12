<script lang="ts">
  import Prose from '$lib/components/prose.svelte'
  import type { PageData } from './$types'

  const { data: post }: { data: PageData } = $props()
</script>

<Prose {post} />
