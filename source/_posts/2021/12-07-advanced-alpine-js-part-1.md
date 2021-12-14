---
title: "Advanced Alpine.js, Part I: The Story So Far"
---

## Posts in This Series

<dl>
  <dt>Part I: The Story So Far (This post)</dt>
  <dd>In which we review some basics about Alpine.js</dd>
  <dt><a href="/2021/12/advanced-alpine-js-part-2/">Part II: Moving Beyond HTML</a></dt>
  <dd>In which we refactor our app and add filtering</dd>
  <dt>Part III</dt>
  <dd>Coming soon!</dd>
  <dt>Part IV</dt>
  <dd>Coming soon!</dd>
  <dt>Part V</dt>
  <dd>Coming soon!</dd>
</dl>

Recently, I’ve been spending a lot of time with [Alpine.js][alpine], a self-proclaimed “rugged, minimal” JavaScript tool that sprinkles behavior on top of rendered HTML. This is the kind of technology I wished for—and [briefly experimented with][illustractions]—in the bygone days of back-end-language-rendered HTML before single-page apps became the norm. Though Alpine isn’t as full-featured as other frameworks, I’ve found it refreshingly easy to work with, and perfect for proof-of-concept apps.

In this series, we’ll look at some advanced workflows with Alpine by building out a music playlist app. We’ll start by setting up Alpine (a shockingly trivial thing to do), then add some features, a build system, and finally, some testing. The final code is [available on GitHub][github] if you'd like to take a peek before we begin. Let’s dive in!

[alpine]: https://alpinejs.dev
[illustractions]: https://github.com/timgthomas/illustractions
[github]: https://github.com/timgthomas/apple-playlists/blob/main/blog/part-1/index.html

## What we're building

Like many developers, I love listening to music while I code. Also like many developers, I hate being interrupted while I'm focused...like when I need to find a new album to listen to after the current one ends, for example. Thankfully, playlists have been part of the streaming music streaming since the very beginning, and solve this problem nicely. Recently, [Apple announced][apple-press-release] some curated (and constantly-updated) playlists for "moods", and I've been a huge fan of every one I've listened to.

Unfortunately, as of this writing, Apple hasn't _published_ this list, and their discoverability is limited to asking Siri to "play the dinner party playlist". Thankfully, MacStories took the initiative to [document as many as they could find][macstories], but we can do better!

Our Alpine app will display these playlists, roughly categorized (thanks again to MacStories for the grouping), but also allow us to search for playlists and "favorite" some so we can easily find them later.

![A preview of the finished app from this post](/2021/12/advanced-alpine-js-part-1/0-preview.png)

[apple-press-release]: https://www.apple.com/newsroom/2021/10/apple-introduces-the-apple-music-voice-plan/
[macstories]: https://www.macstories.net/stories/a-comprehensive-guide-to-250-of-apple-musics-new-mood-and-activity-playlists/

## An Alpine Climb

If you're brand-new to Alpine, I strongly suggest [working through their tutorials][alpine-tuts]. It's quite remarkable how trivial it is to get started with Alpine: A single `<script>` tag is really all you need!

For our app, we'll start with just two files: An HTML page and a JavaScript file containing a static list of the playlists (there are just over 250 of them, so this helps keep our other code clean). Following the conventions of the Alpine docs, our HTML file looks something like this:

```html
<html>
<head>
  <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body>
  <!-- Our markup will live here... -->
  <script src="./data.js"></script>
  <script>
    // ...and our behavior, here!
  </script>
</body>
</html>
```

The data file creates a global variable for the playlists that we can reference from the app. Though global variables aren't a good practice, this one will work for for the moment, and we'll fix this issue in a later part of this series.

For this app, we'll need two pieces of information to uniquely identify each playlist (an ID and a slug, which I've pulled from each playlist's URL), as well as a group name (again, from the general grouping provided by MacStories):

```js
window.data = [
  // ...
  {
    id: '163ac0d163734b888fb6490db5520094',
    slug: 'spring',
    group: 'Seasons and Weather',
  },
  {
    id: '9d61a50fbc9c42a9b5eb5df3eb763d0c',
    slug: 'summer',
    group: 'Seasons and Weather',
  },
  {
    id: 'b04a92a765114f8691c08ff96f57ed57',
    slug: 'fall',
    group: 'Seasons and Weather',
  },
  {
    id: '8b36c21d1ce7493392a2f845c4293408',
    slug: 'winter',
    group: 'Seasons and Weather',
  },
  // ...
]
```

[alpine-tuts]: https://alpinejs.dev/start-here

## Listing the Playlists

We'll start building the app proper by showing a basic list of each playlist, and adding URLs so they can be clicked to open each playlist in Apple Music. We'll use a combination of Alpine's [`x-data`][alpine-x-data], [`x-for`][alpine-x-for], and [`x-text`][alpine-x-text] directives to render a list of each playlist's slug:

```html
<ul x-data>
  <template x-for="playlist in window.data" :key="playlist.id">
    <li x-text="playlist.slug"></li>
  </template>
</ul>
```

Alpine uses `x-data` to identify which parts of the page require interactivity, so we'll add that to our `<ul>`, even though we're referencing the playlist array directly in the `x-for` directive. You could also add a proxy variable inside `x-data` if you choose (i.e. `<ul x-data="{ playlists: window.data }">`), which is a testament to Alpine's flexibility when integrating with existing HTML.

Just showing playlists' slugs isn't very useful, so let's add links so users can open each playlist. For this, we'll use the [`x-bind`][alpine-x-bind] directive (more accurately, its shorthand of `:<attribute>`) to populate each playlist's `href` attribute. Alpine lets us use plain JavaScript expressions (be sure to [read up on the security implications][alpine-csp]), so a string interpolation to translate a playlist's ID and slug into a correct URL is straightforward:

```html
<li>
  <a
    :href="`https://music.apple.com/us/playlist/${playlist.slug}/pl.${playlist.id}`"
    x-text="playlist.slug"
  ></a>
</li>
```

Of course, a flat list of 250+ playlist slugs isn't a great experience, but to improve that, we're going to need a little help...

![Our progress: Showing 250+ playlist slugs and links](/2021/12/advanced-alpine-js-part-1/1-playlists.png)

[alpine-csp]: https://alpinejs.dev/advanced/csp
[alpine-x-bind]: https://alpinejs.dev/directives/bind
[alpine-x-data]: https://alpinejs.dev/directives/data
[alpine-x-for]: https://alpinejs.dev/directives/for
[alpine-x-text]: https://alpinejs.dev/directives/text

## (Lo)Dashing up the Mountain

Lodash is a [fantastic utility library][lodash] that comprises a large number of useful functions. It's worthy of its own blog series, but we're going to use only two of its many helpers: [`startCase()`][lodash-startcase], which converts a slug into something more human-readable, and [`groupBy()`][lodash-groupby], which, well, _groups_ the playlists _by_ a given key (in our case, we're using `group`).

Adding Lodash to our app is as simple as inserting another `<script>` tag into our `<head>`; we can use the same CDN as Alpine itself:

```html
<script src="https://unpkg.com/lodash@4.x.x/lodash.js"></script>
```

...and humanizing our slugs is nearly as straightforward:

```html
<li>
  <a
    :href="..."
    x-text="_.startCase(playlist.slug)"
  ></a>
</li>
```

Grouping the playlists is slightly more complex, but only just. Lodash's `groupBy()` function's return value is an object with the group names as keys; for example, our example data from above would get grouped thusly:

```js
{ 'Seasons and Weather': [ { ... }, { ... }, { ... }, { ... } ] }
```

Built-in functions like `Object.entries()` could help us out here by converting this object to an array, but I've found Alpine is capable of iterating objects on its own. Be warned, though: I haven't found any official documentation suggesting this is a supported feature, so it's possible it will break in future releases, or behave strangely. That said, we can use a similar template as we've used above for the groups:

```html
<ul x-data>
  <template
    x-for="(playlists, groupName) of _.groupBy(window.data, 'group')"
    :key="groupName"
  >
    <li x-text="groupName"></li>
  </template>
</ul>
```

Ah, but now we have a list of 250+ playlists _and_ a list of about twenty groups. So how can we put the two together? Spoiler alert: Quite easily! We can nest the `x-for` for the playlists (and its associated `<template>`) _inside_ the one for the grouping:

```html
<ul x-data>
  <template
    x-for="(playlists, groupName) of _.groupBy(window.data, 'group')"
    :key="groupName"
  >
    <li>
      <h1 x-text="groupName"></h1>
      <ul>
        <template x-for="playlist in playlists" :key="playlist.id">
          <li>
            <a
              :href="`https://music.apple.com/us/playlist/${playlist.slug}/pl.${playlist.id}`"
              x-text="_.startCase(playlist.slug)"
            ></a>
          </li>
        </template>
      </ul>
    </li>
  </template>
</ul>
```

We've now got a lovely nested list of grouped playlists and the playlists themselves:

![More progress: Showing groups of playlists](/2021/12/advanced-alpine-js-part-1/2-grouping.png)

Throw in a bit of styling, and we have ourselves a great mini-app for finding our favorite Apple "mood" playlists! If you've been following along, you may have noticed something interesting: Excepting the data file and the sprinkling of Alpine code, this app contains zero JavaScript! Everything's done within Alpine's directives.

![The finished app from this post](/2021/12/advanced-alpine-js-part-1/0-preview.png)

[lodash]: https://lodash.com
[lodash-groupby]: https://lodash.com/docs/4.17.15#groupBy
[lodash-startcase]: https://lodash.com/docs/4.17.15#startCase

## Next Up: More Features!

In the next post in the series, we'll expand our simple app with some quality-of-life features: Filtering the playlists by name, and "favoriting" some so we can easily get back to our most-loved moods. Until next time!

### Resources in this post

* [Alpine.js docs][alpine]
* [Lodash docs][lodash]
* [Source code for Part I (GitHub)][github]
