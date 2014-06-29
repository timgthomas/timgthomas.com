---
title: Feature Folders and JavaScript
category: blog
layout: post
---

[In my last post][0], we looked at how to organize C# files in an ASP.NET MVC project into "feature folders" that contain all the files needed for a vertical slice of an application (view models, commands/queries, and views). Today, we'll see how we can accomplish the same thing with JavaScript files, and maybe optimize how JavaScript works in an MVC app while we're at it.

## RequireJS and ASP.NET MVC

As a system designed primarily for data entry, this project isn't a single-page application (SPA) so much as it is a collection of SPAs: one per feature. We still have a lot of complex client-side logic, though, that we need to keep maintained. We've been using [RequireJS][1], a JavaScript module loader, to great effect so far, which helps us organize our client code into reusable modules and load only the ones we need for a given page.

All of this project's client scripts are in one folder inside our MVC project (third-party libraries like [jQuery][2] and [Backbone][3] live in a `lib` subfolder to keep things clean). We use [some MVC][4] to determine what "main" file we should load based on the controller and view name (we use the view name instead of the action name since the scripts are paired to specific HTML, not arbitrary action names), which we can pull from a `ViewContext` instance:

    [ChildActionOnly]
    public string GetRequireJSUrl(ViewContext context)
    {
      var values = context.RouteData.Values;
      var controllerName = values["controller"].ToString();
      var viewContext = (RazorView)context.View;
      var viewName = Path.GetFileNameWithoutExtension(viewContext.ViewPath);
      return "a <script> block containing your Require URL";
    }

...and call it from our `_Layout` (we're using [MVC Futures][5] for the expression-based helper here):

    @{ Html.RenderAction<HomeController>(x => x.GetRequireJSUrl(ViewContext)); }

Until we switched to feature folders, all of these scripts were in the same folder: `~/Content/js`. We followed the RequireJS convention of prefixing our "entry" scripts with `main-`, and used the naming structure of:

    ~/Content/js/main-{controller}-{view}.js

Unfortunately, this resulted in dozens and dozens of JavaScript files, unrelated in every way save that they all had `js` as file extensions, in the same folder. Moving to feature folders allows us to relocate all of these files...and simplify the names, to boot:

    ~/{feature}/{view}.js

Changing the URL rendered by our child action, above, was the easy part. It took a *bit* more work to update the Require modules themselves. Let's see how it's done.

## Changing Require's modules

RequireJS assumes that the directory within which a JavaScript file lives should be the starting point for locating dependencies. Since our dependencies reside in a single folder (like most projects', I imagine), we need to start by telling Require where to look:

    require.config({
      // Tell Require where to start looking for dependencies.
      baseUrl: '/Content/js'

      // (The `paths` object and friends live down here.)
    });

**Note:** If you're using a project path that includes subfolders in the url (e.g. `localhost/myapp`), watch out: this `baseUrl` will need to take that into account. Though, if you're planning to deploy this site to a domain, it might be better to fix your local web server to serve things up directly from `localhost` and avoid any nasty surprises when you deploy.

If your Require modules have any path-based dependencies (e.g. they're referenced by relative path instead of being defined in your `require.config()` call), Require will try to load those from the `baseUrl` directory, too, so the modules will need to be changed:

    // Before
    require(['normal-lib', './mixin'], /* ... */);

    // After
    require(['normal-lib', '/Features/{feature}/mixin.js'], /* ... */);

I'll admit: this change is both annoying and very difficult to get *just right*, but we only have two or three instances of this in the entire project, so I'll leave its resolution as an exercise to the reader (though I'd be very appreciative if you commented your solution below :).

## "Featured" Scripts

That's all it takes to relocate your RequireJS scripts! Our MVC child action tells our views where to find the reorganized modules, and adding a simple `baseUrl` path to the Require configuration ensures most of our dependencies are loaded without incident.

We've had great results with this approach so far. RequireJS allows us to simplify our client-side script loading, and feature folders help us realize a dramatic reduction in context switching (not to mention Visual Studio's Solution Explorer is useful again!). If you've benefitted from switching to feature folders (or found it causes some pain), share your experiences in the comments!

[0]: /2013/10/feature-folders-in-asp-net-mvc/
[1]: http://requirejs.org/
[2]: http://www.jquery.com/
[3]: http://backbonejs.com/
[4]: https://gist.github.com/TimGThomas/05ffe58306e360905863
[5]: http://www.nuget.org/packages/Mvc4Futures/
