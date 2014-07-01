---
title: Breaking Your Old HTML Habits
category: blog
layout: post
---

The markup portion of HTML 5 is an incredible leap forward in Web development, but is nonetheless not a brand-new language or technology.  As such, bad habits that have crept up after years of working with browser inconsistencies, poor maintenance habits, and so forth continue to exist even in so-called "modern, HTML 5 sites".  In this post, I'll share some of my own bad habits and how HTML 5 has allowed me to ditch them in favor of much cleaner pages that I don't mind showing off to my friends.

## The Problem.

First, let's take a look at a typical HTML page I might have written several years ago:

<pre><code class="language-markup">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

&lt;html xmlns="http://www.w3.org/1999/xhtml">
&lt;head>
   &lt;meta http-equiv="content-type" content="text/html;charset=UTF-8" />
   &lt;title>My Yucky Site&lt;/title>
   &lt;link rel="stylesheet" href="style.css" type="text/css" />
   &lt;script type="text/javascript">
      /* A smattering of JavaScript. */
   &lt;/script>
&lt;/head>
&lt;body>
   &lt;div id="header">
      &lt;h1>My Yucky Site&lt;/h1>
   &lt;/div>
   &lt;div id="navigation">
      &lt;!-- Some navigation. -->
   &lt;/div>
   &lt;div id="content">
      &lt;h2>A Yucky Section&lt;/h2>
      &lt;!-- Lots of content. -->
   &lt;/div>
   &lt;div id="footer">
      &lt;!-- A copyright notice. -->
   &lt;/div>
&lt;/body>
&lt;/html></code></pre>

Obviously, I was in one of those "my HTML must be valid XML!" kicks back then: this hypothetical page needs lots of love and attention.

Let's get started with something simple: the `DOCTYPE` declaration:

<pre><code class="language-markup">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"></code></pre>

Fortunately, this one's easy: this page won't even _be_ HTML 5 unless we get rid of that nonsense:

<pre><code class="language-markup">&lt;!doctype html></code></pre>

Much better!  Now on to the good stuff.

## The Head.

Now that we're not making our site masquerade as XML (thanks to switching to the HTML 5 document type), we can clean up some other parts, too, like self-closing tags and that odd "xmlns" attribute:

<pre><code class="language-markup">&lt;html>
&lt;head>
   &lt;meta http-equiv="content-type" content="text/html;charset=UTF-8">
   &lt;title>My Yucky Site&lt;/title>
   &lt;link rel="stylesheet" href="style.css" type="text/css">
   &lt;script type="text/javascript">
      /* A smattering of JavaScript. */
   &lt;/script>
&lt;/head>
&lt;!-- Our document's body -->
&lt;/html></code></pre>

HTML 5 also allows us to use a much-improved shorthand for specifying the character set of a document...

<pre><code class="language-markup">&lt;meta charset="utf-8"></code></pre>

...and also provides some default assumptions for file types, like "text/javascript" for script files and "text/css" for style sheets.  Here's what our cleaner `<head>` looks like now:

<pre><code class="language-markup">&lt;html>
&lt;head>
   &lt;meta charset="utf-8">
   &lt;title>My Slightly-Less-Yucky Site&lt;/title>
   &lt;link rel="stylesheet" href="style.css">
   &lt;script>
      /* A smattering of JavaScript. */
   &lt;/script>
&lt;/head>
&lt;!-- Our document's body -->
&lt;/html></code></pre>

## The Body.

Unfortunately, our poor `<body>` tag is overrun with "div-itis": we have `<div>` tags _everywhere_!  Thankfully, HTML 5 provies us with a large number of new tags that express meaning about the content of our site.  Here's what our "old" HTML looks like again:

<pre><code class="language-markup">&lt;body>
   &lt;div id="header">&lt;/div>
   &lt;div id="navigation">&lt;/div>
   &lt;div id="content">&lt;/div>
   &lt;div id="footer">&lt;/div>
&lt;/body></code></pre>

Applying some of these new HTML tags, we can clean this up, too:

<pre><code class="language-markup">&lt;body>
   &lt;header>&lt;/header>
   &lt;nav>&lt;/nav>
   &lt;div id="content">&lt;/div>
   &lt;footer>&lt;/footer>
&lt;/body></code></pre>

Now our header is represented by a tag actually _designed_ to contain header information instead of a `<div>` pretending to be one, our navigation uses a tag designed to encapsulate site navigation, and so forth.

## The Script.

So far, we've focused on cleaning up the structure of our Web page, but what about its behavior (in other words, "JavaScript")?  You'll notice our "yucky" version's scripts are inside the `<head>` tag, but that can cause some nasty side-effects, specifically that all of the scripts therein have to be loaded before the browser will show any content to the user.

A temptingly easy way to fix this (and one that works for most scripts) is to put all of our scripts _after_ the rest of the HTML content.  Browsers will load the HTML page and, at the very end, load all of the JavaScript-ey goodness:

<pre><code class="language-markup">&lt;html>
&lt;head>&lt;!-- Our document's head -->&lt;/head>
&lt;body>
   &lt;!-- Our document's body -->
   &lt;script>/* Our script! */&lt;/script>
&lt;/body>
&lt;/html></code></pre>

However, scripts that need to modify your browser's behavior or content can sometimes cause what Web developers call a ["Flash of Unstyled Content"][1]. Likely the most well-known scripts that are in this category are those that add support for HTML 5 elements in older browsers.  What's that?  Don't tell me I haven't yet talked about--

## Browser Compatibility.

While HTML 5's markup is designed to (mostly) behave like previous versions, older browsers like Internet Explorer 7 don't like seeing the new elements--such as `<header>` and `<nav>`--and will ignore putting styles on them.  To get around this issue, we can use "HTML 5 shims" to trick these browsers into knowing about these elements.  Two of the most well-known are [Modernizr][2], which also helps you check for supported browser features like geolocation, and the [HTML 5 Shim][3], which _only_ adds support for the new elements.  If you're using either one of these scripts, it's okay (and recommended!) to stick them inside your page's `<head>` tag:

<pre><code class="language-markup">&lt;html>
&lt;head>
   &lt;!-- Other heady stuff -->
   &lt;script src="js/modernizr.js">&lt;/script>
&lt;/head>
&lt;body>
   &lt;!-- The rest of our page -->
   &lt;!-- Other scripts -->
   &lt;script>&lt;/script>
&lt;/body>
&lt;/html></code></pre>

## Wrapping Up.

Now that we've cleaned-up our page quite a bit using many of the new ways we can write markup with HTML 5, let's see just how much we've changed.  Once again, here's our crummy older version:

<pre><code class="language-markup">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

&lt;html xmlns="http://www.w3.org/1999/xhtml">
&lt;head>
   &lt;meta http-equiv="content-type" content="text/html;charset=UTF-8" />
   &lt;title>My Yucky Site&lt;/title>
   &lt;link rel="stylesheet" href="style.css" type="text/css" />
   &lt;script type="text/javascript">&lt;/script>
&lt;/head>
&lt;body>
   &lt;div id="header">
      &lt;h1>My Yucky Site&lt;/h1>
   &lt;/div>
   &lt;div id="navigation">&lt;/div>
   &lt;div id="content">&lt;/div>
   &lt;div id="footer">&lt;/div>
&lt;/body>
&lt;/html></code></pre>

...and now our much-improved modern HTML 5 version!

<pre><code class="language-markup">&lt;!doctype html>

&lt;html>
&lt;head>
   &lt;meta charset="utf-8">
   &lt;title>My Awesome Site!&lt;/title>
   &lt;link rel="stylesheet" href="style.css">
&lt;/head>
&lt;body>
   &lt;header>
      &lt;h1>My Awesome Site!&lt;/h1>
   &lt;/header>
   &lt;nav>&lt;/nav>
   &lt;div id="content">&lt;/div>
   &lt;footer>&lt;/footer>
   &lt;script>&lt;/script>
&lt;/body>
&lt;/html></code></pre>

Not only have we removed a lot of noise (making the HTML much easier to read), but we've leveraged some new HTML 5 features to make our markup more _meaningful_, which has positive implications like improving search engines' ability to crawl your site, helping visually impaired users view your site with screen readers, and making your friendly Web developer coworkers happy. :)

[1]: http://www.bluerobot.com/web/css/fouc.asp/
[2]: http://www.modernizr.com/
[3]: http://code.google.com/p/html5shim/
