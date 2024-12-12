<script lang="ts">
  import type Post from '$lib/server/models/post'

  const { post }: { post: Post } = $props()
</script>

<article>
  <header>
    <h1>{post.title}</h1>
    <p>{post.date}</p>
  </header>
  {@html post.content}
</article>
