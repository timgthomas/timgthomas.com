title: A More Reactive Build Tool
date: 2015-10-28
---

An interesting philosophy I've been introduced to while building apps with [React](https://facebook.github.io/react/) is that of avoiding static config files. Even HTML, arguably one of the most venerable "config" languages out there, has been replaced with a superset that can contain JavaScript, [React's JSX](https://facebook.github.io/jsx/). Newer trends even recommend [supplementing _CSS_ with JavaScript](https://speakerdeck.com/vjeux/react-css-in-js), so you can make changes to styles based on application state in near real-time.

<!-- more -->

One of the "complementary tools" to React (and the one recommended by many example apps I've encountered) is [Webpack](http://webpack.github.io/): a self-described "module bundler" that's also commonly used to compile and process images, CSS, and other soon-to-be-static assets. Though Webpack is often suggested, I encountered several problems that led me to look elsewhere for setting up a build task. In this post, we'll look at a few of those problems and what I ended up replacing Webpack with to solve them.

**TL;DR:** If you want to jump straight to the good parts, I've created an [example app hosted on GitHub](https://github.com/TimGThomas/building-react-with-broccoli) that covers everything in this post.

## A (Web)pack of Trouble

When I was first getting started with React, I found the guides to be lacking with regards to setting up and maintaining a local development environment. Admittedly, I'm very spoiled by the [Ember](http://emberjs.com/) ecosystem and [Ember CLI](http://www.ember-cli.com/), but I eventually happened on ["The React.js Way"](https://blog.risingstack.com/the-react-way-getting-started-tutorial/) blog series, which advocates using Webpack for this purpose. I started using it, but quickly ran into a number of issues:

**Regular expressions.** Web pack uses “[loaders](http://webpack.github.io/docs/using-loaders.html)” to transform files, which rely on regular expressions to select the files to be transformed. Coming from the world of [Grunt](http://gruntjs.com/) and friends, which uses very readable strings like `src/**/*.js` to represent files, expressions like `/src\/.+.js$/` make my head hurt, and I'm utterly unable to create new expressions without [a reference guide](http://www.regular-expressions.info/).

**Magic strings.** Once you've managed to select your files using arcane RegEx strings, you'll need to tell Webpack how to transform them. Webpack implicitly imports these loaders, then relies on string parsing to figure out what to do to the files, and in what order. Here's an example [from the Webpack documentation](http://webpack.github.io/docs/using-loaders.html#loaders-in-require):

    require("!style!css!less!bootstrap/less/bootstrap.less")

Aside from [using Bootstrap](https://vimeo.com/97318798), there are more insidious issues with this approach: one, it's very unclear what, exactly, each of these processing steps does (and from which package they're loaded), and, two, it turns out they're executed from right to left, thereby guaranteeing I'll get the execution order backwards _every time_ I write a config file. Even after you decipher this processing instruction, you still need to import your CSS into your JavaScript, of course. [Wait: _what_?](https://github.com/webpack/css-loader#usage)

**Confusing documentation.** Your mileage may vary, but I had a heck of a time deciphering the [official Webpack documentation](http://webpack.github.io/docs/). I mostly relied on other confused individuals who had divined the secrets of Webpack's functionality and [blogged about it](http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup).

I normally try to stick with new concepts for a while when learning a new language/library/framework; after all, these ideas and tools typically exist for a reason, and it can sometimes take a while to really grok them. With Webpack, though, I kept running into the same issues, with nothing but hacky-feeling workarounds to "solve" them. So, instead, I went back to the drawing board to look for an alternative.

## Eat Your Vegetables

If you've spent any length of time talking shop with me, you've probably heard me mention [Broccoli](https://github.com/broccolijs/broccoli). If you haven't, here's the gist: [I'm a huge fan](https://speakerdeck.com/timgthomas/chocolate-covered-vegetables-tasty-workflows-with-broccoli). I find it insanely simple to start with, yet solidly scalable when the need arises. Massive build systems have been built from it (read more about the aforementioned Ember CLI if you're interested), yet even at that level of complexity, it's pretty straightforward to work with.

When I finally made the decision to ditch Webpack, I first thought of Broccoli, even though I honestly wasn't sure if it would solve all of my issues. I wanted, in no particular order, something that would:

* Let me use React and libraries written for it (most of which used calls to `require()`, meaning I couldn't just stick more `<script>` tags on a page);
* Compile any non-standard JavaScript, including JSX for templating and ES2015 for, mostly, [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) and [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings);
* Process any CSS I might need (without making me import it into JavaScript files, naturally); and
* Run all of this stuff in a web server.

As it happens, Broccoli's pretty amazing at all of these, even with the JSX compilation (the cause for most of my uncertainty). Let's see how to set up a simple React app with it.

## Replacing Webpack with Broccoli

Taking the requirements from the previous section, here's what we want Broccoli to do:

1. Compile any JSX and/or ES2015 in our JavaScript files.
2. Bundle the scripts together, respecting any dependencies using `require()`.
3. Process our CSS from, say, [Sass](http://sass-lang.com/).
4. Serve everything from a web server.

To start with, let's install Broccoli. It's an [npm](https://www.npmjs.com/) package, so you'll probably want to run [`npm init`](https://docs.npmjs.com/cli/init) and get yourself a `package.json` file you can save these dependencies to first. After that, install Broccoli:

``` bash
$ npm install -g broccoli-cli
$ npm install --save-dev broccoli
```

The first command installs the Broccoli binary, while the second tells our app that it'll need Broccoli as a dependency. Next, let's make a simple Broccoli build file, named `Brocfile.js`. This file is a [node module](https://nodejs.org/api/modules.html#modules_modules), so we'll be using calls to `require()` to bring in dependencies, and expose any outputs with `module.exports`.

Broccoli works primarily with directory paths, called “[trees](https://github.com/broccolijs/broccoli#plugin-api-specification)”, that represent files and folders in your app. If we wanted Broccoli to act as a passthrough and not do any real processing, all we'd need in `Brocfile.js`—assuming our app assets are in an `app` folder—is:

    module.exports = 'app';

We need a bit more than this, so let's continue. First, we'll need to install React, since our code depends on it. You'll use a similar method if you want to install other packages on which your runtime code depends. Install it with the following npm command:

``` bash
$ npm install --save react
```

Next, we'll use two Broccoli helper packages to accomplish Objectives #1 and #2 (compiling and bundling our JavaScript), so run these commands to install them. Note that we're installing these with `--save-dev`, not just `--save`, since they're used for _building_, and not _running_, this app.

``` bash
$ npm install --save-dev broccoli-babel-transpiler
$ npm install --save-dev broccoli-browserify
```

`broccoli-babel-transpiler` is a Broccoli wrapper around the excellent [Babel library](https://babeljs.io/). When we use it, the package will convert any ES2015 code we might right into code that runs in the majority of modern browsers ([TL;DR: IE9+](https://babeljs.io/docs/faq/)). As it happens, Babel also features support for [converting JSX templates into JavaScript](https://babeljs.io/docs/usage/jsx/), as well, so that problem solves itself! We'll then use [Browserify](http://browserify.org/) to take care of those `require()` calls. Here's what our Brocfile looks like now, after we've imported and used these two packages:

``` js
var browserify = require('broccoli-browserify');
var babel = require('broccoli-babel-transpiler');

var js = 'app';
js = babel(js, {});
js = browserify(js, {
  entries: [ './app.js' ],
  outputFile: 'app.js'
});

module.exports = 'app';
```

Broccoli lets us pass trees (like `app` in the above example) through varying processing steps, which will be executed in order (and, if you ask me, with far less confusion than Webpack's approach).

Let's move on to Objective #3: processing CSS. There are a number of CSS preprocessors, and a number of Broccoli plugins for them, but let's go with one of my favorites, Sass. Install the [`broccoli-sass`](https://github.com/joliss/broccoli-sass) package with `npm install --save-dev broccoli-sass`, and point it at your CSS directory in `Brocfile.js`:

``` js
var compileSass = require('broccoli-sass');
var css = compileSass([ 'app/styles' ], 'app.scss', 'app.css');
```

I'll leave the explanation of this plugin to the `broccoli-sass` documentation, but, in essence, we grab the uncompiled Sass code from `app/styles` and transform it, starting with `app.scss`.

At this point, we've run into a bit of a problem. With `module.exports`, we can only export a single tree object, but what we want is to "merge" the compiled JavaScript from Objectives #1 and #2 with the compiled CSS from Objective #3. Another Broccoli plugin to the rescue: [`broccoli-merge-trees`](https://github.com/joliss/broccoli-merge-trees). This package, hopefully unsurprisingly, can merge our two (or more!) trees together. Here's an example where we also bring in a `public` directory:

``` js
var merge = require('broccoli-merge-trees');
module.exports = merge([ 'public', js, css ]);
```

Let's then create an `index.html` file that will represent the starting point of our app. We'll stick this file in the `public` directory since it doesn't require any special processing or compilation. You may notice that the build steps we've created output two files: `app.js` and `app.css`. We'll want to reference these in this HTML file like so:

``` html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <link href="app.css" rel="stylesheet" />
    <title>(Your App)</title>
  </head>
  <body>
    <script src="app.js"></script>
  </body>
</html>
```

What about Objective #4? You'll be pleased to know Broccoli comes with a simple web server preinstalled! To start it, run:

``` bash
$ broccoli serve
```

Then visit `http://localhost:4200/` in your favorite web browser (I don't know where the port number comes from, but I like to think it's inspired by the late [Douglas Adams](https://en.wikipedia.org/wiki/Douglas_Adams)). If all goes well, you should see your React app in all its compiled and bundled glory!

<hr>

If you've been fighting with Webpack for building your React apps—or if you, too, struggle with setting up a React dev environment—why not give Broccoli a try? Alternatively, if you're a die-hard Webpacker, or if you've found another build tool to solve Webpack's issues, I'd love to hear what's keeping your React apps built!
