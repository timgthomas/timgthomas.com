<script lang="ts">
  import type Post from '$lib/server/models/post'

  const { post }: { post: Post } = $props()
</script>

<article>
  <header>
    <h1 class="h1">{post.title}</h1>
    <p>{post.date}</p>
  </header>
  {@html post.content}
</article>

<style lang="scss">
  article {
    // TODO: Duped to `.p`.
    font-family: 'Fira Sans';
    font-size: 1.7rem;
    font-weight: 400;

    :global(> :not(header)) {
      letter-spacing: 0.01em;
      line-height: 1.6;
    }
  }

  header {
    border-block-end: 2px solid #9f358e;
    margin-block-end: var(--space);
    padding-block-end: var(--space);
  }

  article :global {
    :is(blockquote, ol, p, pre, ul) + :is(blockquote, ol, p, pre, ul) {
      margin-block-start: var(--space-narrow);
    }

    // TODO: This is duped from `.h2`, but these are rendered by `@html`, so I
    // can't use the class.
    h2 {
      color: var(--color-foreground-elevated);
      font-family: 'Fira Sans Condensed';
      font-size: 2rem;
      font-weight: 400;
      margin-block: var(--space) var(--space-narrow);
      text-transform: uppercase;
    }

    code {
      font-size: 1.5rem;
    }

    p {
      padding-inline-start: var(--space);
    }

    ul li {
      list-style: square;
    }

    :is(ol, ul) {
      padding-inline-start: var(--space-wide);
    }

    pre {
      border-left: 2px solid #9f358e;
      line-height: 1.15;
      overflow: hidden;
      margin-inline-start: var(--space-wide);
      padding-inline: var(--space);
      text-wrap: wrap;

      /* border: 2px dashed deeppink; */
    }
  }
</style>
