<script lang="ts">
  import Link from '$lib/components/link.svelte'
  import type Project from '$lib/server/models/project'
  import type { PageData } from './$types'

  const { data }: { data: PageData } = $props()
</script>

{#snippet projectSummary(project: Project)}
  <h2 class="h2">{project.title}</h2>
  {#if project.caption}
    <p class="p">{project.caption}</p>
  {/if}
  <p class="desc p">{project.description}</p>
  <ul>
    {#each project.links as link}
      <li><Link {link} /></li>
    {/each}
  </ul>
{/snippet}

<h1 class="h1 header">Projects</h1>
<ul>
  {#each data.projects as project}
    <li>{@render projectSummary(project)}</li>
  {/each}
</ul>

<style>
  .desc {
    padding-inline-start: var(--space);
  }
</style>
