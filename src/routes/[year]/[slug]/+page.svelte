<script lang="ts">
  import type { PageData } from './$types'

  const { data }: { data: PageData } = $props()
</script>

<p>Whee?</p>
<pre>{JSON.stringify(data, null, 2)}</pre>
