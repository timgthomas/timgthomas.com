<script lang="ts">
  import type { PageData } from './$types'

  const { data: post }: { data: PageData } = $props()
</script>

<h1>{post.title}</h1>
<article>{@html post.content}</article>
