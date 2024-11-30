<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props()
</script>

<nav>
  <a href="/">Home</a>
</nav>
{@render children()}
