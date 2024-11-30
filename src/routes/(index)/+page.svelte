<script lang="ts">
  import type Post from '$lib/server/models/post'
  import type { PageData } from './$types'

  const { data }: { data: PageData } = $props()

  function urlFor(post: Post): string {
    return `/${post.year}/${post.slug}`
  }
</script>

<h1>Welcome to SvelteKit</h1>
<pre>{JSON.stringify(data, null, 2)}</pre>
<ol>
  {#each data.posts as post}
    <li>
      <a href={urlFor(post)}> {post.title}</a>
    </li>
  {/each}
</ol>
