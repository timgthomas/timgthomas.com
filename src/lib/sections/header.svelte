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
    border-radius: var(--corners);
    color: var(--color-foreground-elevated);
    display: flex;
    inset: var(--space) var(--space) auto;
    padding: var(--space);
    position: fixed;
    z-index: var(--elevation-menu);

    backdrop-filter: blur(5px);
    background: #000;
  }

  h1 {
    flex: 1 0;
    font-family: 'Fira Sans Condensed';
    font-weight: 400;
    text-transform: uppercase;
  }

  a {
    color: currentColor;
  }
</style>
