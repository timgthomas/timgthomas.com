<script lang="ts">
  import type { PageData } from './$types'

  const { data }: { data: PageData } = $props()
</script>

<h1 class="h1 header">Blog archives</h1>
<ol>
  {#each data.posts as post}
    <li>
      <a href="/blog/{post.slug}">{post.title}</a>
    </li>
  {/each}
</ol>
