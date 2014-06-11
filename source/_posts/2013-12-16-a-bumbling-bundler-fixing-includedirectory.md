---
title: A Bumbling Bundler: Fixing IncludeDirectory()
category: blog
layout: post
---

[In my post on getting started with ASP.NET MVC's Bundler][0], we looked at a couple of methods that allow you to include files and directories to include as part of a bundle. Unfortunately, there's a serious gotcha with [`IncludeDirectory()`][1] that we'll see—and correct!—in this post.

## You keep using that word...

Let's say we have a directory structure like this (in this example, files for an [Ember][2] application):

    - app
      - controllers
        - account
            create.js
            login.js
        + 
      + routes

Logically, we'd want to include both of the "account" controllers. This can be easily done with a call to `IncludeDirectory()`, specifying the full (relative) path and a search filter:

    bundles.Add(new ScriptBundle("~/bundles/app")
      .IncludeDirectory("~/app/controllers/account", "*.js")
    );

This approach is fine for smaller apps with only a few of these "[feature][3]" subfolders, but quickly becomes unmanageable with a more complex system:

    bundles.Add(new ScriptBundle("~/bundles/app")
      .IncludeDirectory("~/app/controllers/account", "*.js")
      .IncludeDirectory("~/app/controllers/authors", "*.js")
      .IncludeDirectory("~/app/controllers/books", "*.js")
      // ...
      .IncludeDirectory("~/app/controllers/search", "*.js")
    );

One option, and the one we'll discuss here, is to bundle all of the files in all of the folders under `~/app/controllers` together. If you poke around the `Bundle` class's methods, you may notice that the `IncludeDirectory()` method has a `searchSubdirectories` parameter on an overload that sounds like it would do exactly that.

    bundles.Add(new ScriptBundle("~/bundles/app")
      .IncludeDirectory("~/app/controllers/account", "*.js", true)
      //                                                     ^ the overload
    );

Unfortunately, what's output isn't really all that helpful:

    <script src="/app/controllers/create.js"></script>
    <script src="/app/controllers/login.js"></script>

Can you spot the problem? While all of the path's subdirectories are searched, the subfolder structure isn't respected when the bundler compiles the paths to output to the page. Our `create` and `login` controllers aren't children of the `controllers` folder, but rather its subfolders, so the above references will return a 404 ("not found") error. (Frankly, I can't think of a reason why this parameter exists, but if you've used it, let me know in the comments!)

## Building a better recursor

One potential solution is to build our own directory recursor using [`DirectoryInfo`][4]. Keep in mind that MVC's bundler uses application-relative URLs (that begin with `~/`), and `DirectoryInfo` needs absolute, file path URLs (e.g. `C:\dev\...`). In this implementation, we're using `Server.MapPath()` and a simple string replacement to swap between the two:

    public static class BundleExtensions
    {
      public static Bundle IncludeSubdirectoriesOf(
        this Bundle bundle,
        string path, string searchPattern)
      {
        // Get the current and root paths for `DirectoryInfo`.
        var absolutePath = HttpContext.Current.Server.MapPath(path);
        var rootPath = HttpContext.Current.Server.MapPath("~/");
        var directoryInfo = new DirectoryInfo(absolutePath);

        foreach (var directory in directoryInfo.GetDirectories())
        {
          // Swap out the absolute path format for a URL.
          var directoryPath = directory.FullName;
          directoryPath = directoryPath
            .Replace(rootPath, "~/")
            .Replace('\\', '/');
          bundle.IncludeDirectory(directoryPath, searchPattern);
          bundle.IncludeSubdirectoriesOf(directoryPath, searchPattern);
        }

        return bundle;
      }
    }

Once we incorporate our new directory searching function (implemented as an extension method so we don't break the option for method chaining), we can organize our files however we'd like, and they come out just fine:

    <script src="/app/controllers/account/create.js"></script>
    <script src="/app/controllers/account/login.js"></script>

If you've used other ways of including subdirectories in a bundle, or if you have intimate knowledge of why the `searchSubdirectories` parameter even exists, let me know in the comments! Happy bundling!

[0]: /2012/09/a-quick-start-of-asp-net-mvc-4s-bundling/
[1]: http://msdn.microsoft.com/en-us/library/jj646468(v=vs.110).aspx
[2]: http://emberjs.com/
[3]: /2013/10/feature-folders-and-javascript/
[4]: http://msdn.microsoft.com/en-us/library/s7xk2b58(v=vs.110).aspx
