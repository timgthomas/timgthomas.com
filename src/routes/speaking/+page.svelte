<script lang="ts">
  import type { Talk } from '$lib/server/models/talk'
  import type { PageData } from './$types'

  const { data }: { data: PageData } = $props()
</script>

{#snippet talkSummary(talk: Talk)}
  <p>{talk.title}</p>
  <ul>
    {#each talk.links as link}
      <li><a href={link.link} rel="noreferrer" target="_blank">{link.type}</a></li>
    {/each}
  </ul>
{/snippet}

<p>Projects</p>
<ul>
  {#each data.talks as talk}
    <li>{@render talkSummary(talk)}</li>
  {/each}
</ul>
