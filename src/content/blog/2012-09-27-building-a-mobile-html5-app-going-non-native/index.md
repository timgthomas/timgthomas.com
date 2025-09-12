---
title: "Building a Non-Native Mobile HTML5 App, Part I: A Business Case"
---

## Posts in This Series

<dl><dt>Part I: A Business Case</dt><dd>Why our client chose to build a Web app over a native one.</dd><dt><a href="/2012/10/building-a-mobile-html5-app-choosing-a-technology-stack/">Part II: Choosing a Technology Stack</a></dt><dd>How we chose our tools and technologies, and what we picked.</dd><dt><a href="/2012/10/building-a-mobile-html5-app-hooking-things-together/">Part III: Hooking Things Together</a></dt><dd>Wire up a client and server with JavaScript and .NET.</dd><dt><a href="/2012/10/building-a-mobile-html5-app-making-it-work-offline/">Part IV: Making It Work Offline</a></dt><dd>Store data locally and synchronize it with a server.</dd><dt><a href="/2012/10/building-a-mobile-html5-app-testing-the-app/">Part V: Testing the App</a></dt><dd>Develop and test for a mobile device.</dd><dt><a href="/2012/11/building-a-mobile-html5-app-making-it-look-native/">Part VI: Making It Look Native</a></dt><dd>Leverage some tricks of Mobile Safari to make a site look like an app.</dd></dl>

## Introduction

Nearly two months ago, my team and I [delivered a mobile-optimized, HTML5-based Web application][1] that helps youth football coaches find, organize, and utilize on-the-field game strategies, known as "plays". In many ways, this project is a departure from Headspring's norm: it's public-facing, needs to work in a sometimes-connected environment, and, most notably, it's designed to supplement an existing native iPad app, so it has to look and feel, as much as possible, like a native application. However, accomplishing these tasks didn't mean we couldn't leverage our existing experience building Web applications.

In this series of posts, we'll look at some the major milestones in our process of building a mobile HTML5 app. We'll see why we chose to build a Web site instead of developing a native app, what tools and techniques helped us along the way, and how to simulate the native "feel" of an app.

To start, let's take a look at how this project got started, and why we ultimately chose the Web as the platform of choice.

## Going Non-Native

When we first met with the client, a local sports technology startup, they had already paid to have a native (iPhone, iPad) app developed. It was working quite well, but they now needed to target a completely different market segment (in other words, they wanted a new, independent application). Instead of simply paying for another native app to be built, however, they took a step back and identified some particularly troubling limitations of their current application:

*Few supported devices.* The client's existing app works on iPads and iPhones, but nothing else. Desktop and laptop users, as well as those who opted for Android devices, are out of luck. Also problematic was that, since the app stored its data locally, any user-specific data couldn't be shared with other devices.

*Poor User Analytics.* Even with the data Apple provides regarding app purchasers and users, it was difficult for the client to extract purchase and use trends over time.

*The App Store.* The existing app is subject to Apple's 30% cut of any and all sales. The client also experienced multiple-day delays in pushing out new versions of the app (waiting for Apple to "approve" the update) and found it difficult to lead users to the in-app store.

## The Mobile Web To The Rescue

To address these three issues, we recommended building a Web app. For one, practically all devices—mobile and otherwise—include a Web browser, so building a Web site means access to many non-iOS-device-using users would be unlocked. Secondly, since Web apps aren't hosted on Apple's servers, this one could be deployed and redeployed as often as needed with no delays from Apple. Furthermore, we could, thanks to a number of third-party analytics systems that integrate easily with Web sites, log and track almost any data the client wanted. Finally, since the app wouldn't live within the App Store, we were free to choose another payment processor: one without 30% fees.

## A Double-Edged Sword

Switching from a native app to a Web-based one isn't without its drawbacks, however. The most notable of these is that Web apps can't leverage the App Store's searching and discoverability, meaning it's considerably harder for users to "stumble upon" a Web application. One excellent way to combat this is with targeted advertising; after all, "accidental users" of a specialized app like this one, which targets youth football coaches specifically, aren't very likely to make in-app purchases.

Secondly, native apps begin their lives in "offline mode", only adding server interaction when necessary. By their very nature (being *served from* an online Web server), Web apps are, instead, mostly-connected, unless special care is taken to facilitate their use in disconnected scenarios. This facilitation, therefore, is considerably more challenging to incorporate into a Web application than into a native one, and extra care must be taken to ensure not a single online request is made while in "offline" mode, or users will experience some unhappy error dialogs.

## A Path Forward

Though the downsides of a Web application are far from trivial, they pale in comparison to the benefits we could provide the client by moving to the Web. Ultimately, access to more devices, increased analytics, and a far larger cut of any profits made building the second app on the Web an easy choice.

[In the next post][2], we'll review the technical aspects of the app we built, including what client- and server-side tools we chose, and how we came to those decisions. Stay tuned!

[1]: http://www.headspring.com/mary/headspring-1st-down-technologies/
[2]: /2012/10/building-a-mobile-html5-app-choosing-a-technology-stack/
