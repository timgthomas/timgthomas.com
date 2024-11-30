<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props()
</script>

<nav>
  <a href="/">Home</a>
  <a href="/archives">Archives</a>
</nav>
{@render children()}
