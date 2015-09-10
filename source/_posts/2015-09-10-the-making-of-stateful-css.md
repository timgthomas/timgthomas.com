---
title: The Making of “You Might Not Need JavaScript”
---

Last week, I had the pleasure of presenting at the [JavaScript Austin](http://www.meetup.com/javascript-austin/) meetup. For this month's meetup, I gave my "stateful CSS" talk (titled "Form with Function" or "[You Might Not Need JavaScript](http://www.meetup.com/javascript-austin/events/225015546/)", depending on how trolling I feel at the time). If you haven't seen it yet, there's a video of it [on Vimeo](https://vimeo.com/131410261):

<iframe src="http://player.vimeo.com/video/131410261?title=0&amp;color=35aba5" width="500" height="281" frameborder="0" webkitAllowFullScreen="webkitAllowFullScreen" mozallowfullscreen="mozallowfullscreen" allowFullScreen="allowFullScreen"> </iframe>

There's a bit of a plot twist at the end of the talk that I get a lot of questions about (watch the video above first if you don't want spoilers). In this post, we'll look at how this plot twist was created.

## Spoiler Alert

If you're reading this, I assume you've either watched the above video, or you don't care about spoilers (you monster). Okay, here's the big plot twist:

> My entire presentation—the slides, the inline CSS editing, everything—was built without a single line of JavaScript.

Let's take a look at how to pull that off.

## Thinking without JavaScript

A slide deck doesn't have many "features" beyond showing one slide at a time (and having some way to switch between those). As it happens, we have access to an HTML element that _also_ shows one thing at a time: a radio button.

```html
<input name="slide" type="radio" checked>
<label ><!-- Slide 1 --></label>

<input name="slide" type="radio">
<label ><!-- Slide 2 --></label>

<input name="slide" type="radio">
<label ><!-- Slide 3 --></label>
```

Now, if we could somehow link the "checked" state of a radio button to the visibility of another element, we'd have the beginnings of a slide deck right there. Select the radio buttons in the following [pen](http://codepen.io/TimGThomas/pen/LppWpY/) to see what happens:

<p data-height="250" data-theme-id="1840" data-slug-hash="LppWpY" data-default-tab="result" data-user="TimGThomas" class="codepen" style="height:250px">See the Pen <a href='http://codepen.io/TimGThomas/pen/LppWpY/'>LppWpY</a> by Tim G. Thomas (<a href='http://codepen.io/TimGThomas'>@TimGThomas</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

So far, we've got a passable—albeit boring—slide deck, and all it took was some very basic HTML and a little clever CSS. Turns out styling elements is pretty straightforward thanks to the [`:checked`](https://developer.mozilla.org/en-US/docs/Web/CSS/%3Achecked) pseudo-class and the `+` ([adjacent](https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_selectors)) selector:

```css
/* Hide all slides by default. */
.slide {
  display: none;
}

/* But show the currently-selected one. */
input[name='slide']:checked + .slide {
  display: block;
}
```

<h2 id="radioButton-hide()" style="text-transform:initial">radioButton.hide()</h2>

You're more than welcome to stop here, as what we've covered so far is _technically_ all you need to make your own JavaScript-less styles, but there's more we can do.

Seeing all of those radio buttons sucks, so let's get rid of them:

```css
input[name='slide'] {
  display: none;
}
```

That's better, but now we have no way of moving through the slides. Fortunately, this is already (partially) solved for us: browsers will let you switch between radio button values with your keyboard. Try it out below: click on a radio button, then use your arrow keys to select different options. Obviously, this won't work if you're on a device without a keyboard, so keep that in mind if your slides' consumers will be on their phones:

<p data-height="150" data-theme-id="1840" data-slug-hash="xwwqRK" data-default-tab="result" data-user="TimGThomas" class="codepen" style="height:150px">See the Pen <a href='http://codepen.io/TimGThomas/pen/xwwqRK/'>xwwqRK</a> by Tim G. Thomas (<a href='http://codepen.io/TimGThomas'>@TimGThomas</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Next, we'll have to link each slide to its radio button. If we're hiding the inputs, we need some way of giving them focus so that the browser can work its keyboard magic. This is as easy as either giving each input an ID and changing each slide to be a `<label>`...

```html
<input id="slide_1" name="slide" type="radio">
<label for="slide_1"><!-- ... --></label>
```

...or wrapping each combination in its own `<label>`:

```html
<label>
  <input name="slide" type="radio">
  <div><!-- ... --></div>
</label>
```

Either technique will make each slide "clickable" to set the focus on the radio buttons, thus enabling keyboard movement.

Give each slide some CSS that makes it look like a real slide deck, and you're good!

## Inline CSS Editing

My slide deck also included the ability to edit CSS on the fly and see it instantly update. This is actually a very old [CSS Trick](https://css-tricks.com/show-and-edit-style-element/) that works well to this day. Just move your `<style>` block inside your `<body>`, set its style to `display: block`, and give it the [`contenteditable`](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_Editable) attribute: browsers will use it for styling and _you_ can use it for CSS demos. The CSS Tricks site has a great [demo page](https://css-tricks.com/examples/ShowCSS/) for playing around with this feature.

---

That's all there is to it! A few lines of HTML per slide, a sprinkling of CSS, and a little `<style>` block trickery, and you've got yourself a modern—and JavaScript free!— slide deck! If you'd like to learn more about (mis-)using CSS for behavior, [read my blog series on "stateful CSS"](https://www.google.com/search?q=fun+with+stateful+css+site%3Atimgthomas.com), [watch the presentation video](https://vimeo.com/131410261), and check out the [code for my slides on GitHub](https://github.com/TimGThomas/stateful-css-slides/).

If you've seen or built any great functionality with little or no CSS, share in the comments!
