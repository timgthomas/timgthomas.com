---
title: "Fun with Stateful CSS: A View/Edit Screen"
date: 2013-10-17
---

I've [previously blogged][0] about using the concept of "stateful CSS" to indicate when your application is in the middle of a potentially long-running process. In that post, we looked at how to create a simple "view/edit" screen, but we relied on JavaScript to swap out CSS classes. Fortunately, there's an easier way: using a checkbox!

## Structure

We'll start with some basic HTML. The important things to note here are:
* Both the "view" and "edit" groups' fields are contained within two container elements.
* Preceding both of those container elements is a lowly checkbox field (more on this later).
* Each view also contains a `label` tag, which will toggle the state of that field.

      <input id="toggle" type="checkbox">
      <div class="view">
        <p>Name: Test</p>
        <label class="button" for="toggle">Edit</label>
      </div>
      <div class="edit">
        <p>
          <label for="name">Name:</label>
          <input type="text" value="Test" />
        </p>
        <label class="button" for="toggle">Done</label>
      </div>

This checkbox field is the key to the whole thing: it will store the state of whether we're in "edit" mode or not (if it's checked, we are). We'll use the `label` tags in each section to toggle its value, and CSS to show and hide the "view" and "edit" fields based on whether it's checked.

## Behavior (in style!)

The CSS is strikingly minimal:

    .edit, #toggle { display: none; }
    #toggle:checked ~ .view { display: none; }
    #toggle:checked ~ .edit { display: block; }

First, we hide the "edit" view and the checkbox by default. We then use the [`:checked`][1] and [`~` ("general sibling")][2] selectors to hide the "view" panel and show the "edit" panel only when our checkbox-turned-state-machine is checked.

_Update: After [some feedback][3] that the functionality of the example below was incomplete, editing the "name" property now persists after clicking "Done"._

<p data-theme-id="0" data-slug-hash="uAaCe" data-user="TimGThomas" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/TimGThomas/pen/uAaCe'>uAaCe</a> by Tim G. Thomas (<a href='http://codepen.io/TimGThomas'>@TimGThomas</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script src="http://codepen.io/assets/embed/ei.js"> </script>

In the coming weeks, we'll see some more UI patterns you can build without JavaScript, so stay tuned!

[0]: /2012/05/mute-your-asynchronous-uis-with-stateful-css/
[1]: https://developer.mozilla.org/en-US/docs/Web/CSS/:checked?redirectlocale=en-US&redirectslug=CSS%2F%3Achecked
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_selectors
[3]: #comment-1086752051
