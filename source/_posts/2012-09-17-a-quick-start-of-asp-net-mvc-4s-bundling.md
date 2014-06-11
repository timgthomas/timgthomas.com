---
title: A Quick-Start of ASP.NET MVC 4's Bundling
category: blog
layout: post
---

As a Web application becomes more complex, the number of external scripts on which it depends grows significantly. Start with [jQuery][1] and some application libraries like [Backbone.js][2] (and its dependency, [Underscore][3]), then throw in plugins from UI frameworks like [Foundation][4] and some form validation scripts—not to mention your app's code itself!—and you can easily discover your app has dozens of external files, each of which must be loaded on every page refresh.

To combat this problem, developers often use tools called "bundlers", which concatenate script files—or stylesheets—together into a single file, thereby reducing the I/O overhead of sending multiple files across the Internet. Many also perform a process known as "minification", whereby non-essential whitespace is removed and variable names are changed to be as short as possible, resulting in an unreadable—but highly efficient—piece of code.

In a [project we recently completed][5] at [Headspring][6], a coworker and I encountered this problem quite early. Though the application we developed was quite complex (and featured about two dozen external script files), it was targeted at iPad users, among others, and therefore needed to load quickly, even over a slow cellular network. The server component of the application, written in [ASP.NET MVC 4][7], provided us with an excellent way of providing bundled, minified scripts with its built-in bundling feature.

To get started with bundling in MVC4, you'll need to perform a few straightforward steps:

1. Create a bundle configuration to instruct MVC how to combine and compress (minify) your files.
2. Register your bundle configuration with your Web application.
3. Add a reference to your bundle to your MVC views.

Let's go over these steps in more detail.

## Create a bundle configuration

If you've worked with MVC in the past, you're no doubt familiar with the concept of configuration collections, as seen in a site's `Global.asax.cs` file. Common collections include `RouteTable.Routes` and `GlobalFilters.Filters`, but MVC adds a new one: `BundleTable.Bundles`. The default project templates then provide static methods of modifying these collections with app-specific details. We'll take this such approach for our bundles, as well.

To start, create a new, static class called `BundleConfig` (or "`BundleConfiguration`", if you're feeling verbose) with a single static method called `RegisterBundles`:

    public static class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles) {}
    }

Next, inside this method, create one or more `Bundle` instances. MVC provides two tailored classes for our purposes: `ScriptBundle`, for JavaScript files, and `StyleBundle`, for CSS. Both of these classes provide built-in minification, thus reducing your total payload even further. You'll need to specify a unique path for each bundle, which we'll use to output references to our MVC views later.

    var myBundle = new ScriptBundle("~/bundles/js");

Using this bundle, you can simply add new files (or entire directories!) by using its methods:

    myBundle.IncludeDirectory("~/js/vendor/");
    myBundle.Include("~/js/app.js");

A nice feature of these methods is that you can specify your paths as "app-relative"—that is, relative to the root of your application, whether it be in a subfolder or not—with the "tilde" notation. Thus, "`~/js/app.js`" might become "`localhost:1234/js/app.js`" in development and "`www.myapp.com/js/app.js`" in production, no questions asked.

Once you're done with each bundle, add it to the collection passed in as a parameter (in this example, we've called it `bundles`):

    bundles.Add(myBundle);

Continue this pattern until you've configured all of the bundles you'd like.

## Register the bundle configuration

Congratulations! The hard—well, tedious—part is done! Next, we just need to link our bundle configuration with the MVC application. By default, you're given a `Global.asax.cs` file containing your application's programmatic configuration. Inside this file is, typically, an `Application_Start` method. Inside that method, add a call to your static class/method, passing in MVC's `BundleTable.Bundles` object so the custom bundles can be added:

    protected void Application_Start()
    {
        AreaRegistration.RegisterAllAreas();
        // (Other stuff MVC generates is here)

        // Add this line:
        BundleConfig.RegisterBundles(BundleTable.Bundles);
    }

## Output your bundles in your MVC views

Normally, you'll want to output your bundled references in some sort of common layout file to reduce duplication. For MVC, this file is normally found in the "Shared" subfolder of the "Views" directory in your Web project, and is commonly named "`_Layout.cshtml`". Inside this file, all that's needed to output your bundled reference is the following:

    @System.Web.Optimization.Scripts.Render("~/bundles/js")

Note that the string argument passed in here needs to match the path of a bundle we created earlier. This means you have fine-grained control over where each bundle is referenced, a quite useful feature (for example, most scripts should be placed immediately before the closing `</body>` tag, but [Modernizr][8] should be referenced in your HTML document's `<head>` tag to avoid a [flash of unstyled content][9]).

A nice built-in feature of bundling is that if `debug="true"` is defined in your Web.config file (meaning you're running your application in "debug" mode) the bundler will output each file individually, as if no bundling had occurred. This is incredibly useful for debugging purposes, as combined and minified JavaScript or CSS is practically unusable. Want to see what the bundle reference will look like in production? Just remove the `debug="true"` line from your Web.config and you're good to go!

## Wrapping (or should that be "bundling"?) up

Using this very useful component of ASP.NET MVC on our project at Headspring, we were able to reduce our HTTP requests for JavaScript resources from 21 to 3, and lowered the time to download these assets by over 30%! I hope you find it as easy to optimize your JavaScript and CSS references as I do, and if you'd like learn more about bundling and the other great features in MVC4, [check out Headspring's MVC Boot Camp][10]. Happy bundling!

[1]: http://jquery.com/
[2]: http://backbonejs.org/
[3]: http://documentcloud.github.com/underscore/
[4]: http://foundation.zurb.com/
[5]: http://www.headspring.com/news/headspring-1st-down-technologies/
[6]: http://www.headspring.com/
[7]: http://www.asp.net/mvc
[8]: http://modernizr.com/
[9]: http://www.bluerobot.com/web/css/fouc.asp
[10]: http://www.headspring.com/events/mvc-boot-camp/