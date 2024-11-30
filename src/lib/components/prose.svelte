<script lang="ts">
  // import type Post from '$lib/server/models/post'

  interface Props {
    title: string
    content: string
  }

  const { content, title }: Props = $props()
</script>

<article>
  <h1>{title}</h1>
  {@html content}
</article>
