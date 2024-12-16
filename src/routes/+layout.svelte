<script lang="ts">
  import type { Snippet } from 'svelte'

  import '../app.scss'

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props()
</script>

<header>
  <h1>Tim G. Thomas</h1>
  <nav>
    <a href="/">Home</a>
    <a href="/projects">Projects</a>
    <a href="/speaking">Speaking</a>
    <a href="/archives">Archives</a>
  </nav>
</header>
<main>
  {@render children()}
</main>
