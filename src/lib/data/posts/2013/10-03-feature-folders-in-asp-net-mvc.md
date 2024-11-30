---
title: Feature Folders in ASP.NET MVC
---

If you've worked with ASP.NET MVC, you're no doubt familiar with the default folder structure, which looks something like this:

    - App
      + Content
      + Controllers
      + Models
      + Views

...and if you're [evolving your project structure][0], it may even look like this:

    - App
      + Content
      + Controllers
      + Handlers
      + Models
      + Queries
      + ViewModels
      + Validators
      + Views

Problem is, this structure gets out of hand really quickly. You either have a ton of similarly-named folders in each top-level folder for the main features in your application, or a lot of very verbosely-named classes directly in each folder.

Wouldn't it be awesome if all of these horizontally-sliced files were instead grouped by *feature*?

In our current project, [Jimmy Bogard][1] and I decided to switch to a model of "feature folders", where each vertical slice of the project existed—as much as possible—in a single folder. Take a look:

    - App
      - Features
        - User
            Index.cshtml
            Index.js
            IndexValidator.cs
            IndexViewModel.cs

This is a *whole lot* cleaner to look at. For us, the Solution Explorer was practically useless as we'd need to scroll through dozens and dozens of files only related by role within the system. In this new structure, all files are related by function, and some consistent naming (in our case, by the name of the view) ensures they're sorted together. Here's how it works.

## Stuff that "just works"

Most of our files work with this pattern automatically. [StructureMap][2] does an impeccable job of finding dependencies regardless of where they're located, and many other files (commands and queries, à la Matt Hinze's [Short Bus][3]) are referenced directly.

## Views

The first work we'll need to do is for the views. We really only want to tell MVC to look for views in a different place than normal, which can be accomplished easily with an extension of the default `RazorViewEngine`:

    public class FeatureViewLocationRazorViewEngine : RazorViewEngine
    {
      public FeatureViewLocationRazorViewEngine()
      {
        var featureFolderViewLocationFormats = new[]
          {
            "~/Features/{1}/{0}.cshtml",
            "~/Features/{1}/{0}.vbhtml",
            "~/Features/Shared/{0}.cshtml",
            "~/Features/Shared/{0}.vbhtml",
          };

        ViewLocationFormats = featureFolderViewLocationFormats;
        MasterLocationFormats = featureFolderViewLocationFormats;
        PartialViewLocationFormats = featureFolderViewLocationFormats;
      }
    }

_Note: If you're a [ReSharper][4] user, it won't find the views unless you explicitly assign the array of view locations to each property. The project still builds otherwise, but your controllers will have errors next to every call to `View()` and `PartialView()`. See [this gist by Jimmy][5] for more details._

Next, tell MVC to use this—and only this—view engine:

    ViewEngines.Engines.Clear();
    ViewEngines.Engines.Add(new FeatureViewLocationRazorViewEngine());

...and you're done! You can now move your Razor views into feature folders alongside your commands, queries, handlers, and validators!

As it stands, we're keeping our controllers separate, but we're looking into ways to put those in feature folders, too.

In the next post, I'll explain how to use the same process to organize your JavaScript files. The process is a little trickier—though still quite straightforward—and may even help clean up your client code in other ways, too! Stay tuned!

[0]: http://lostechies.com/jimmybogard/2012/08/30/evolutionary-project-structure/
[1]: http://lostechies.com/jimmybogard/author/jimmybogard/
[2]: http://docs.structuremap.net/
[3]: https://github.com/mhinze/ShortBus
[4]: http://www.jetbrains.com/resharper/
[5]: https://gist.github.com/jbogard/6812184
