---
title: Building a Non-Native Mobile HTML5 App, Part II: Choosing a Technology Stack
category: blog
layout: post
---

## Posts in This Series

<dl><dt><a href="/2012/09/building-a-mobile-html5-app-going-non-native/">Part I: A Business Case</a></dt><dd>Why our client chose to build a Web app over a native one.</dd><dt>Part II: Choosing a Technology Stack</dt><dd>How we chose our tools and technologies, and what we picked.</dd><dt><a href="/2012/10/building-a-mobile-html5-app-hooking-things-together/">Part III: Hooking Things Together</a></dt><dd>Wire up a client and server with JavaScript and .NET.</dd><dt><a href="/2012/10/building-a-mobile-html5-app-making-it-work-offline/">Part IV: Making It Work Offline</a></dt><dd>Store data locally and synchronize it with a server.</dd><dt><a href="/2012/10/building-a-mobile-html5-app-testing-the-app/">Part V: Testing the App</a></dt><dd>Develop and test for a mobile device.</dd><dt><a href="/2012/11/building-a-mobile-html5-app-making-it-look-native/">Part VI: Making It Look Native</a></dt><dd>Leverage some tricks of Mobile Safari to make a site look like an app.</dd></dl>

[In the first post of this series][1], we looked at some business reasons why a client went with a mobile-focused HTML5 Web app instead of a native one. In this post, we'll discuss some of the technical decisions that facilitated building the app.

As a Web app, this project had three distinct components we'll discuss: the server, the client (in this case, a mobile device), and the hosting environment.

## Back-End Backup

Headspring's history of being a .NET development studio means some of the technology choices are made for us. We've historically found Microsoft's server components to be solid, easy to develop for, and flexible when the need arises (so much so, in fact, that several Headspring employees and former employees have [authored books on the subject][2]), and there were no technical limitations that would preclude its use, so we started development with the "standard" .NET Web development stack of Windows, IIS (.NET's Web server), SQL Server (.NET's database), and ASP.NET MVC, a fantastic model-view-controller Web application framework.

Apart from our go-to stack of Microsoft components, we also leveraged the excellent [ELMAH][3] library. This invaluable tool provides notifications—in our case, via email, but many other "loggers" exist—about any exceptions and errors that happen in production.

We also utilized a particularly-nice feature of the newest version of MVC, bundling, to keep our CSS and JavaScript files compact. You can [learn more about MVC4's bundling][4] in a post I wrote a few weeks ago.

## Client-Side Cleverness

The front-end portion of the application uses some of our other favorite tools: mainly, [jQuery][5] and [Backbone][6], both of which we've found to be an excellent choice for developing responsive, interactive UIs. jQuery provides an excellent API for querying and manipulating each page's content, while Backbone allows us to modularize each application screen to reduce code duplication and increase maintainability.

Along with these two libraries (and Backbone's dependency, [Underscore][7], which [powers our templates][8]), we relied on the outstanding jQuery plugins of Zurb's [Foundation project][9] for custom form skinning, modal windows, and more.

Most important to the project's success as an offline application were browser-based "HTML5" APIs. Not every browser in use today supports these APIs, but the devices the app targets—iPads, higher-end Android tablets, desktops, and laptops—have enough support to make their use a logical choice. The two that made offline support possible were `localStorage` and `applicationCache`, and we'll take a more in-depth look at these APIs in Part IV, "Making it Work Offline".

## Hosting Happiness

At some point, every application should move out of the development environment into production. This part of the process for our HTML5 app became quite painless by working with some amazing vendors.

For Web and database hosting, we selected my favorite cloud-based .NET hosting solution: [AppHarbor][10]. It's difficult to argue with the ease-of-use of features like git-based deployments (`git push appharbor master`), automatically-run unit tests, easy roll-backs for bad builds, and more. AppHarbor also features impressive scalability (a simple slider adjusts the number of processes serving the site) and an extensive collection of add-ons, one of which we leveraged to host the entire database for the application. At $49 per month (the cost of the plan we chose, cleverly titled "Catamaran"), it's even very affordable.

As our app includes a small e-commerce component (users can purchase collections of "plays", organized by the football concept of "formations", or layouts of players), we needed to accept credit cards. The mere mention of this, however, sends many a developer sprinting in the opposite direction, and for good reason: the price of failure to build a robust, secure payment gateway [can be quite high][11]. Insted of trying to build our own e-commerce system, we chose to utilize the outstanding services of [Stripe][12]. Stripe provides the payment processing services and some outstanding APIs with which our system integrates; all we had to do was provide the product data and call into their endpoints. Their status dashboard and documentation are especially noteworthy, as special attention is given to make the system easy for developers to work with.

## A Solid Foundation

Thanks to the stability of Microsoft's server technologies, the flexibility of some client-side frameworks like jQuery and Backbone, the offline utility of HTML5 APIs like `localStorage` and `applicationCache`, and the power of third-party services like AppHarbor and Stripe, we were free to focus on building the best non-native HTML5 app we could.

[In the next post](/2012/10/building-a-mobile-html5-app-hooking-things-together/), we'll look at some actual code to see how to communicate between a client, with JavaScript, and a server, running ASP.NET MVC.

[1]: /2012/09/building-a-mobile-html5-app-going-non-native/
[2]: http://www.amazon.com/ASP-NET-MVC-Action-Jeffrey-Palermo/dp/1617290416/
[3]: http://code.google.com/p/elmah/
[4]: /2012/09/a-quick-start-of-asp-net-mvc-4s-bundling/
[5]: http://jquery.com/
[6]: http://backbonejs.org/
[7]: http://documentcloud.github.com/underscore/
[8]: http://www.headspring.com/tim/an-underscore-templates-primer/
[9]: http://foundation.zurb.com/
[10]: https://appharbor.com/
[11]: http://www.pcicomplianceguide.org/pcifaqs.php#11
[12]: https://stripe.com/
