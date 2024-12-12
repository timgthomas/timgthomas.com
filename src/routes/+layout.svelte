<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props()
</script>

<nav>
  <a href="/">Home</a>
  <a href="/projects">Projects</a>
  <a href="/archives">Archives</a>
  <a href="/speaking">Speaking</a>
</nav>
{@render children()}
