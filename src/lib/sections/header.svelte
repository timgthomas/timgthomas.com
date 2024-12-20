<header>
  <h1>Tim G. Thomas</h1>
  <nav>
    <a href="/">Home</a>
    <a href="/projects">Projects</a>
    <a href="/speaking">Speaking</a>
    <a href="/archives">Archives</a>
  </nav>
</header>

<style lang="scss">
  header {
    align-items: last baseline;
    background-color: hsla(0, 0%, 10%, 0.9);
    backdrop-filter: blur(5px);
    border-radius: var(--corners);
    color: var(--color-foreground-elevated);
    display: flex;
    inset: var(--space) var(--space) auto;
    margin-inline: auto;
    max-width: calc(var(--measure) - 2 * var(--space));
    padding: var(--space);
    position: fixed;
    z-index: var(--elevation-menu);
  }

  h1 {
    flex: 1 0;
    font-family: 'Fira Sans Condensed';
    font-weight: 400;
    text-transform: uppercase;
  }

  nav {
    display: flex;
  }

  a {
    color: currentColor;
    font-family: 'Fira Sans';
    font-size: 1.4rem;
    padding-inline: 0.5em;
    text-decoration: none;
    text-transform: uppercase;
  }
</style>
