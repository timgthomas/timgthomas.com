<script lang="ts">
  import Link from '$lib/components/link.svelte'
  import type Talk from '$lib/server/models/talk'
  import type { PageData } from './$types'

  const { data }: { data: PageData } = $props()
</script>

{#snippet talkSummary(talk: Talk)}
  <h2>{talk.title}</h2>
  <p>Presented at {talk.conference}</p>
  <p>{talk.description}</p>
  <ul>
    {#each talk.links as { link: href }}
      <li>
        <Link {href} />
      </li>
    {/each}
  </ul>
{/snippet}

<h1>Speaking</h1>
<ul>
  {#each data.talks as talk}
    <li>{@render talkSummary(talk)}</li>
  {/each}
</ul>
