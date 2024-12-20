hexo.extend.helper.register("page-title", function pageTitle({ data }) {
  const { config, page } = data.root;
  const pageTitle = page.title ?? page.posts.first()?.title;
  return [pageTitle, config.title].filter(Boolean).join(" - ");
});
