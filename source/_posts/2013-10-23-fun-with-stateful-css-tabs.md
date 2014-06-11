---
title: Fun with Stateful CSS: Tabs
category: blog
layout: post
---

In this series, we've covered how to use form inputs and some [clever CSS selectors][0] to [toggle between states of a form][1] and [show a modal window][2]. Now, let's apply the same principles to create a simple—and JavaScript-less!—collection of tabs.

As you may have come to expect, the HTML is fairly straightforward, though a tad more complex than last time:

      <input type="radio" id="panel-1" name="panels" checked>
      <input type="radio" id="panel-2" name="panels">
      <input type="radio" id="panel-3" name="panels">
      
      <ol class="tabs">
        <li><label class="button" for="panel-1">One</label></li>
        <li><label class="button" for="panel-2">Two</label></li>
        <li><label class="button" for="panel-3">Three</label></li>
      </ol>

      <div class="panel panel-1">Panel one contents.</div>
      <div class="panel panel-2">Panel two contents.</div>
      <div class="panel panel-3">Panel three contents.</div>

Instead of a single "yes/no" checkbox, we now have three radio buttons to represent state: one for each "panel" of the collection. Next is an ordered list containing the `label` elements you might expect (to review, these allow us to "toggle" the state of the `input` elements), and then three `div` elements that contain each panel's contents. As always, we'll hide the `input` elements with CSS, but still select based on their "checked" state (with the `:checked` pseudoselector) to determine what tab to show. We'll also hide all of the panels by default unless one of the associated radio buttons is selected:

      /* Hide all panels by default */
      .panel-1,
      .panel-2,
      .panel-3 {
        display: none;
      }
      
      /* Show a panel when its associated radio button is selected */
      #panel-1:checked ~ .panel-1,
      #panel-2:checked ~ .panel-2,
      #panel-3:checked ~ .panel-3 {
        display: block;
      }
      
      /* Also hide all of the radio buttons */
      input[type=radio] {
        display: none;
      }

In this way, we can migrate away from a simple boolean state (with a checkbox) to a potentially infinite number of states with radio buttons.

<p data-height="268" data-slug-hash="qijKp" data-user="TimGThomas" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/TimGThomas/pen/qijKp'>Fun with Stateful CSS: Tabs</a> by Tim G. Thomas (<a href='http://codepen.io/TimGThomas'>@TimGThomas</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script src="//codepen.io/assets/embed/ei.js"> </script>

That concludes this round of fun with stateful CSS! Thanks for reading!

[0]: https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_selectors
[1]: /2013/10/fun-with-stateful-css-a-view-edit-screen/
[2]: /2013/10/fun-with-stateful-css-modals/
