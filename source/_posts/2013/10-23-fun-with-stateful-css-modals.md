---
title: "Fun with Stateful CSS: Modals"
---

[In the first post in this series][0], we looked at how to switch between the "view" and "edit" modes of a page with just a checkbox. Today, we'll apply a similar technique to show a modal popup. Once again, we'll be using nothing but HTML and CSS…no JavaScript!

To review, the concept is simple: use HTML elements that are designed to hold state to do so (think form inputs), and rely on CSS rules to react to those states. The previous post relied on a checkbox input and the `:checked` selector, which is what we'll use here, too.

The HTML is quite simple. Due to the nature of CSS, our checkbox needs to be before (in the DOM) any elements we want to target with selectors, but we only need two extra elements beyond that (one for the modal itself and another to form the "cover" behind it):

      <input id="show-modal" type="checkbox">
      <div class="modal">
        <p>This is content of the modal.</p>
        <label class="button" for="show-modal">Hide Modal</label>
      </div>
      <div class="modal-cover"></div>
      <label class="button" for="show-modal">Show Modal</label>

Behaviorally, both `label` elements in this example will toggle the state of the `show-modal` checkbox. We'll use CSS to show the modal (and its cover) when that checkbox is checked, and hide it otherwise. [The "general sibling" selector][1] makes another appearance here:

      /* Hide the modal by default... */
      .modal, .modal-cover { visibility: hidden; }

      /* ...and show it when the checkbox is checked. */
      #show-modal:checked ~ .modal,
      #show-modal:checked ~ .modal-cover { visibility: visible; }

      /* Always hide the checkbox. */
      #show-modal { display: none; }

You can easily add some CSS transitions to make the modal fade in and out (or even [something more exciting][2]), but the concept remains the same. You may wonder about the `label` tag inside the modal: its purpose is to un-check the checkbox, thereby hiding the modal, much like a "close" button (but without the JavaScript!).

<p data-theme-id="0" data-slug-hash="KILyq" data-user="TimGThomas" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/TimGThomas/pen/KILyq'>KILyq</a> by Tim G. Thomas (<a href='http://codepen.io/TimGThomas'>@TimGThomas</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script src="http://codepen.io/assets/embed/ei.js"> </script>

My team uses this approach on our current project. Though we use JavaScript to populate the *contents* of our modals, this technique seriously cuts down on the script overhead of showing a modal popup. Stick around for more fun with stateful CSS!

[0]: /2013/10/fun-with-stateful-css-a-view-edit-screen/
[1]: https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_selectors
[2]: http://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/
