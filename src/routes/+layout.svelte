<script lang="ts">
  import type { Snippet } from 'svelte'
  import Header from '$lib/sections/header.svelte'
  import Masthead from '$lib/sections/masthead.svelte'

  import '@fontsource/fira-sans-condensed/400.css'
  import '@fontsource/fira-sans/400.css'
  import '../app.scss'

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props()
</script>

<Header />
<Masthead />
<main>{@render children()}</main>

<style>
  main {
    margin-inline: auto;
    max-width: 60rem;
    padding: var(--space);

    color: var(--color-foreground);
    mix-blend-mode: plus-lighter;
  }
</style>
