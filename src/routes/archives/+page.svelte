<script lang="ts">
  import type { PageData } from './$types'

  const { data }: { data: PageData } = $props()
</script>

<ol>
  {#each data.posts as post}
    <li>{post.title}</li>
  {/each}
</ol>
