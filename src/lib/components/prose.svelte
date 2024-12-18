<script lang="ts">
  import type Post from '$lib/server/models/post'

  const { post }: { post: Post } = $props()
</script>

<article>
  <header>
    <h1>{post.title}</h1>
    <p>{post.date}</p>
  </header>
  {@html post.content}
</article>

<style lang="scss">
  article {
    font-family: 'Fira Sans';
    font-size: 1.8rem;
    font-weight: 400;

    :global(> :not(header)) {
      letter-spacing: 0.05em;
      line-height: 1.6;
    }
  }

  h1 {
    color: var(--color-foreground-elevated);
    font-family: 'Fira Sans Condensed';
    font-size: 2.6rem;
    font-weight: 400;
    letter-spacing: 0.05em;
    line-height: 1.15;
    text-wrap: balance;
  }
</style>
