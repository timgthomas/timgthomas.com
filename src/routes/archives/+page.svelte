<script lang="ts">
  import type Post from '$lib/server/models/post'
  import type { PageData } from './$types'

  const { data }: { data: PageData } = $props()

  function urlFor(post: Post): string {
    const [month, , ...slugParts] = post.slug.split('-')
    return `/${post.year}/${month}/${slugParts.join('-')}`
  }
</script>

<ol>
  {#each data.posts as post}
    <li>
      <a href={urlFor(post)}>{post.title}</a>
    </li>
  {/each}
</ol>
