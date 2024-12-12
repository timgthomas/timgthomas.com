<script lang="ts">
  import type { Project } from '$lib/server/models/project'
  import type { PageData } from './$types'

  const { data }: { data: PageData } = $props()
</script>

{#snippet projectSummary(project: Project)}
  <p>{project.title}</p>
  <ul>
    {#each project.links as link}
      <li><a href={link.link} rel="noreferrer" target="_blank">{link.type}</a></li>
    {/each}
  </ul>
{/snippet}

<p>Projects</p>
<ul>
  {#each data.projects as project}
    <li>{@render projectSummary(project)}</li>
  {/each}
</ul>
