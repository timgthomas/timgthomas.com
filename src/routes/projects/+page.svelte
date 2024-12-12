<script lang="ts">
  import Link from '$lib/components/link.svelte'
  import type Project from '$lib/server/models/project'
  import type { PageData } from './$types'

  const { data }: { data: PageData } = $props()
</script>

{#snippet projectSummary(project: Project)}
  <h2>{project.title}</h2>
  <p>{project.description}</p>
  <ul>
    {#each project.links as { link: href }}
      <li><Link {href} /></li>
    {/each}
  </ul>
{/snippet}

<h1>Projects</h1>
<ul>
  {#each data.projects as project}
    <li>{@render projectSummary(project)}</li>
  {/each}
</ul>
