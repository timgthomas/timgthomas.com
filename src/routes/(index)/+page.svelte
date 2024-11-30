<script lang="ts">
  import type { PageData } from './$types'

  const { data }: { data: PageData } = $props()
</script>

<h1>Welcome to SvelteKit</h1>
<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
<ol>
  {#each data.posts as post}
    <li>{post.title}</li>
  {/each}
</ol>
