---
title: "Building a Non-Native Mobile HTML5 App, Part IV: Making It Work Offline"
---

## Posts in This Series

<dl><dt><a href="/blog/building-a-mobile-html5-app-going-non-native/">Part I: A Business Case</a></dt><dd>Why our client chose to build a Web app over a native one.</dd><dt><a href="/blog/building-a-mobile-html5-app-choosing-a-technology-stack/">Part II: Choosing a Technology Stack</a></dt><dd>How we chose our tools and technologies, and what we picked.</dd><dt><a href="/blog/building-a-mobile-html5-app-hooking-things-together/">Part III: Hooking Things Together</a></dt><dd>Wire up a client and server with JavaScript and .NET.</dd><dt>Part IV: Making It Work Offline</dt><dd>Store data locally and synchronize it with a server.</dd><dt><a href="/blog/building-a-mobile-html5-app-testing-the-app/">Part V: Testing the App</a></dt><dd>Develop and test for a mobile device.</dd><dt><a href="/2012/11/building-a-mobile-html5-app-making-it-look-native/">Part VI: Making It Look Native</a></dt><dd>Leverage some tricks of Mobile Safari to make a site look like an app.</dd></dl>

In [part III](/blog/building-a-mobile-html5-app-hooking-things-together/) of this series, we saw how to retrieve a collection of books, via jQuery, from an ASP.NET MVC endpoint. Retrieving data from a server in this manner is great...if you can guarantee your users will always be online. Since we're discussing how to build a *mobile* app, however, it's important to realize users may not always be connected to the Internet. Let's look at how we can store our list of books offline for use later.

## Web Storage to the Rescue

As we discussed in [part II](/blog/building-a-mobile-html5-app-choosing-a-technology-stack/), we used a number of HTML5 APIs to make our mobile app work. The one we'll be looking at today to facilitate storing our book list offline is `localStorage`.

The `localStorage` API allows access to an internal-to-the-browser storage area containing key/value pairs of data. While there's no requirement on storage size, the W3C [recommends browsers allow at least 5MB per domain](http://dev.w3.org/html5/webstorage/#disk-space). We've found iOS devices default to this 5MB limit, but ask the user's permission to increase this amount if the app approaches the limit.

Currently, a large number of browsers support `localStorage` (91.67% completely support it, according to [caniuse.com](http://caniuse.com/#search=localStorage)). There are also a number of libraries to help you work with it (including [Lawnchair.js](http://brian.io/lawnchair/) and [Store.js](https://github.com/marcuswestin/store.js)), but, for this post, we'll stick to using the base API.

## Using the API

Taking advantage of `localStorage` is actually quite simple. Supporting browsers expose a JavaScript object, conveniently called `localStorage`, with which you can interact. Storing a value is quite simple:

    localStorage.setItem('favorite-color', '#123');
    // > undefined

...as is retrieving it:

    localStorage.getItem('favorite-color');
    // > "#123"

We want to store something a little more complicated than a hexadecimal string, though. Unfortunately, `localStorage` only supports saving strings, so we'll need to "stringify" our JSON data before we can save it. For this, we'll use the browser's `JSON` object (though, if you're stuck supporting IE7 or below, you'll also need Douglas Crockford's ["JSON2" library](https://github.com/douglascrockford/JSON-js)).

    // Our collection of books. This JSON could have come from an AJAX call.
    var books = [{"title":"Myst: The Book of Atrus","author":"Rand Miller"},{"title":"The Hobbit","author":"J.R.R. Tolkien"},{"title":"Stardust","author":"Neil Gaiman"}];

    var stringifiedBooks = JSON.stringify(books);
    localStorage.setItem('books', stringifiedBooks);

Consequently, to retrieve our collection, we'll need to parse the string back into a JSON object.

    var stringifiedBooks = localStorage.getItem('books');
    var books = JSON.parse(stringifiedBooks);

It's that easy!

## Considerations

Keep in mind that not *quite* every browser supports `localStorage`. Fortunately, we can perform a simple check to avoid any errors and unexpected behaviors:

    if (window.localStorage) {
       // work your localStorage magic
    } else {
       // er...?
    }

So what *do* we do when a browser doesn't support `localStorage`? The industry's answer to this question is to use what's known as a "polyfill": a third-party library that "fills-in" missing functionality. For our purposes, there are a number of options available, most of which use cookies to simulate this type of persistent storage (and are relatively easy to implement). Mozilla's [Developer Network article](https://developer.mozilla.org/en-US/docs/DOM/Storage) on `localStorage` includes two such options (and is, in general, an excellent overview of `localStorage`).

In this post, we saw how trivially easy it is to store data offline with the `localStorage` API. Next time, we'll see some options for debugging mobile apps, *just in case* some code doesn't behave the way it should. :)
