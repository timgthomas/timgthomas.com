---
title: Building a Non-Native Mobile HTML5 App, Part III: Hooking Things Together
category: blog
layout: post
---

## Posts in This Series

<dl>

   <dt><a href="/2012/09/building-a-mobile-html5-app-going-non-native/">Part I: A Business Case</a></dt>
   <dd>Why our client chose to build a Web app over a native one.</dd>

   <dt><a href="/2012/10/building-a-mobile-html5-app-choosing-a-technology-stack/">Part II: Choosing a Technology Stack</a></dt>
   <dd>How we chose our tools and technologies, and what we picked.</dd>

   <dt>Part III: Hooking Things Together</dt>
   <dd>Wire up a client and server with JavaScript and .NET.</dd>

   <dt><a href="/2012/10/building-a-mobile-html5-app-making-it-work-offline/">Part IV: Making It Work Offline</a></dt>
   <dd>Store data locally and synchronize it with a server.</dd>

   <dt><a href="/2012/10/building-a-mobile-html5-app-testing-the-app/">Part V: Testing the App</a></dt>
   <dd>Develop and test for a mobile device.</dd>

   <dt><a href="/2012/11/building-a-mobile-html5-app-making-it-look-native/">Part VI: Making It Look Native</a></dt>
   <dd>Leverage some tricks of Mobile Safari to make a site look like an app.</dd>

</dl>

In this post, we'll look at how to use ASP.NET MVC to serve data through an HTTP API to a client running JavaScript. To keep this example simple, we'll be using the [jQuery](http://jquery.com/) plugin (though it's easy to integrate [Backbone](http://backbonejs.org/#Collection-url) into this mini stack).

## A Server Sidebar

As I mentioned in the last post, we used the ASP.NET MVC framework on the back-end of our HTML5 app. The newest release of ASP.NET MVC, version 4, includes a new set of features designed to aid in the creation of Web APIs (coincidentally-enough, called "ASP.NET Web API") of the exact type we're trying to build. We had used MVC Web API on past projects, and it originally seemed like a good fit for this application, as well. However, our app had some particular characteristics that clashed with the goals of Web API:

*Resource-based endpoints.* MVC Web API is designed to create REST APIs. Though the definition of "REST" is quite vague, many server frameworks have settled on an approach where data is served via "resource URLs" that correspond to the type of data being requested. For example, to retrieve a list of books, one might use the following URL:

    http://example.com/api/books

To retrieve a specific book, this URL might look something like this. Note the value "42", which here represents the unique identifier for the requested book:

    http://example.com/api/books/42

MVC Web API aims to create these types of URLs, where every "resource" has multiple endpoints. This works quite well for applications that are always connected to the Internet, and can therefore make the more-granular requests that this approach encourages, but this app has to work offline, as well. The approach we took to facilitate this was to "cache" the a user's entire set of data when the application is first launched. As a result, we only need a single HTTP endpoint with which to communicate, making a full "RESTful API" a bit more complex than the app requires.

*Content negotiation.* On a similar vein, MVC Web API supports a feature whereby a client can request a particular file format (XML, JSON, etc.) and the server serializes the data appropriately. This capability, known as "content negotiation", is amazingly helpful for public APIs, as it adapts to whatever format of which a client can make the best use. Our API is only really useful to the app itself, meaning we had complete control over data interchange formats (we chose JSON, for the curious), thus negating the need for this otherwise-handy feature.

## Teh Codez!

To keep things consistent with the way we built the HTML5 app, we'll be using "standard" ASP.NET MVC for this example, as well, though I highly encourage you to check out Web API. The features I listed above that make it a poor choice for our application also make it an excellent option for almost any public-facing API. The [official Web API site](http://www.asp.net/web-api) is a great place to get started.

If you're already familiar with ASP.NET MVC, feel free to continue reading. If you'd like a bit of a refresher on ASP.NET MVC, however, you may find [this post on the ASP.NET site](http://www.asp.net/mvc/tutorials/getting-started-with-aspnet-mvc3/cs/intro-to-aspnet-mvc-3) useful. The article was written for ASP.NET MVC 3, not 4, but the concepts described therein are still completely applicable.

To begin, let's get our server up-and-running. After creating a new MVC project (for this example, we'll use the name "Bookstore"), create a new controller called `BooksController`. If there's anything in there by default except an empty C# class, remove it.

    using System.Web.Mvc;
    
    namespace Bookstore.Controllers
    {
       public class BooksController : Controller
       {

       }
    }

Next, we'll need to add an action method. There are two important things to remember when using stock MVC to serve up JSON:

1. Your action methods will need to return an instance of type `JsonResult`.
2. When calling into the JSON serializer (we'll see this next), you need to specify that "`GET`" requests are a-okay.

With this in mind, let's add our action method with some dummy data, using an anonymous object (pulled from [my blog post on using Understore for templating](http://www.headspring.com/tim/an-underscore-templates-primer/)):

    public JsonResult Books()
    {
       var books = new[]
          {
             new { title = "Myst: The Book of Atrus", author = "Rand Miller" },
             new { title = "The Hobbit", author = "J.R.R. Tolkien" },
             new { title = "Stardust", author = "Neil Gaiman" }
          };
    
       return Json(books, JsonRequestBehavior.AllowGet);
    }

Note the last line. This line calls into the `Controller` base class to serialize our object as JSON. As mentioned in gotcha #2 above, you'll need to add the `JsonRequestBehavior.AllowGet` parameter or MVC will throw an exception when you try to hit this endpoint with an HTTP "`GET`" request.

Speaking of hitting our endpoint, let's give it a try. Run the MVC application, then try to retrieve data from our endpoint with a tool like [Curl](http://curl.haxx.se/) (since we don't yet have a client). Note that your URL and port number may vary.

<pre><code>curl localhost:8080/books/</code></pre>

    [{"title":"Myst: The Book of Atrus","author":"Rand Miller"},{"title":"The Hobbit","author":"J.R.R. Tolkien"},{"title":"Stardust","author":"Neil Gaiman"}]

Things are working well so far! Let's now add the JavaScript- and jQuery-based client code. If you've done any AJAX work with jQuery before, it should look pretty familiar. Here, we're asynchronously loading the data from the server and writing the contents to the browser's console. For this example, we'll assume the page on which this script appears is served from the same domain as the endpoint we defined earlier. If we were to attempt to load the JSON data from a different domain, we'd run into some HTTP errors, as [explained in this article](https://developer.mozilla.org/en-US/docs/HTTP_access_control). Watch out for this problem area in your applications.

    var request = $.ajax({
       url: 'http://localhost:8080/books'
    });
    
    request.success(function(data) {
       console.log(data);
    });

After the request completes, your browser's console should show the three books we retrieved from the server. Browsers display data in consoles quite differently from one-another, but mine (Chrome 22) shows me:

    [ ▶ Object, ▶ Object, ▶ Object ]

Expanding one of these `Object`s shows us that we have indeed retrieved the three books from our endpoint:

    author: "Rand Miller"
    title: "Myst: The Book of Atrus"
    __proto__: Object

## What's next?

In this post, we've seen why ASP.NET Web API wasn't a good fit for our HTML5 application, how we can build an ASP.NET MVC-based HTTP endpoint that serves JSON data, and how we can access that data via jQuery. [In the next post](/2012/10/building-a-mobile-html5-app-making-it-work-offline/), we'll discuss using HTML5 APIs to store data retrieved from MVC endpoints, like the one we created here, for offline use later.
