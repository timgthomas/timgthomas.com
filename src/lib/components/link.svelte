<script lang="ts">
  interface Props {
    href: string
  }

  const { href }: Props = $props()

  let title = $derived(href)
</script>

<a {href} rel="noreferrer" target="_blank">{title}</a>

<style>
  a::after {
    content: ' ->';
  }
</style>
