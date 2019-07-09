---
title: Mute Your Asynchronous UIs with Stateful CSS
date: 2012-05-24
---

Asynchronous operations are very common in today's highly-interactive Web sites. Often, these operations are communicated to users by "muting" or "greying-out" the page, thus preventing user interactions. This is both a convenient way of setting user expectations (so they don't frantically click on other parts of your page expecting something to happen) and helps to prevent circumstances wherein you have multiple, potentially conflicting, operations in progress.

While there are a number of ways to accomplish this, in this post, I'll demonstrate one of my favorites (and my "go-to" solution)...using CSS. I prefer this method for a number of reasons: it keeps my JavaScript free of presentational concerns (like showing and hiding elements on the page), is easy to apply to multiple pages on a site (or multiple parts of the same page), and can be modified quickly to match other site style changes.

## Stateful CSS...in Theory

The principle driving the examples below is something I like to call "stateful CSS". While CSS is well-known for its ability to add visual styling to your site (like background colors, rounded corners, and text sizes), it is often overlooked as a way to visually represent the state of a Web page. A page can be in a particular state, for example, simply by having a particular CSS class applied to it. Let's look at an example.

<iframe src="http://jsfiddle.net/TimGThomas/t6rL6/embedded/result,html,js,css" allowfullscreen="allowfullscreen" frameborder="0">.</iframe>

In this sample, a simple "view/edit" scenario, we have two "screens": one that contains the "read-only" version of the object, and one that allows the user to edit its details. The behavior we're looking for is to display the "view" screen by default, and replace it with the "edit" version when the user clicks the "Edit" button. Likewise, when a user is editing the object and clicks "Cancel", we'd like to hide the "edit" screen and display the "view" version. The HTML for this example is very straightforward and contains only a single container and elements for each screen:

      <div>
         <div class="view">
            <!-- The "view" screen -->
            <button class="toggle">Edit</button>
         </div>
         <div class="edit">
            <!-- The "edit" screen -->
            <button class="toggle">Cancel</button>
         </div>
      </div>

The moving parts of this sample, therefore, are in the CSS, which we'll implement with a CSS class to represent the "I'm in edit mode" state of the container (let's call it editing). Remember, we'd like the "view" screen to be the only one shown by default:

      /* Defaults */
      .view { display: block; }
      .edit { display: none; }

      /* The "edit" state */
      .editing .view { display: none; }
      .editing .edit { display: block; }

Given these styles, we can trivially switch between the "view" and "edit" screens by adding and removing the `editing` class from the container element. Assuming that our container has the ID of `details`, this can be implemented with jQuery like so:

      $(function() {
         $('.toggle').click(function() {
            $('#details').toggleClass('editing');
         });
      });

Combining these three components gives us a clean way to allow users to switch between states with a minimum of fuss.

## Stateful CSS in Action!

Now that we've outlined the use of CSS to control the state of your application, let's apply these principles to our problem. Remember, we have the need to "disable" or "pause" several independent parts of our page during asynchronous requests, so let's add some stateful CSS!

Let's start with some mostly-real HTML. In this markup, the elements marked with the class "pausable" should be disabled during an AJAX request. Note that they're spread around the structure of the page:

      <body>
         <!-- ... -->
         <div class="pausable"></div>
         <!-- ... -->
         <button id="start">Start</button>
         <div>
            <!-- ... -->
            <div class="pausable"></div>
            <!-- ... -->
         <div>
         <!-- ... -->
         <div class="pausable"></div>
      </body>

To programmatically disable these elements, we'll start by adding some style to each "pausable" element. The only requirement is that we relatively-position these containers, which will allow us to add a semitransparent overlay to each element to "mute" the content. The other CSS rules make things a tad less dull.

      .container {
         /* Required */
         position: relative;
         /* Optional: */
         border: 1px solid #999;
         margin: 0 auto 10px;
         height: 200px;
         width: 300px;
      }

Now to add our overlay to disable the containers. By default, we'll hide these overlays and show them when our page is in the "wait" state: this is where our stateful CSS comes in. To minimize the amount of extra markup we'll need, I like to use the "after" pseudoselector; if your needs include compatibility with IE7, however, you can simply add some extra HTML.

      .container:after {
         content: " ";
         display: none; /* Hide by default */
         background: #fff;
         background: rgba(255, 255, 255, 0.5);
         filter: alpha(opacity=50);
         height: 100%;
         width: 100%;
         position: absolute;
         z-index: 1;
         left: 0px;
         top: 0px;
      }

      body.paused .container:after {
         display: block;
      }

Now that the CSS states have been defined, let's hook everything together with some JavaScript. The `<button>` element defined earlier will kick everything off:

      $(function() {
         $('#start').on('click', function() {
            $('body').addClass('paused');
            // Do something that takes a long time.
            $('body').removeClass('paused');
         });
      });

From this point, the process is simple: first, add the "paused" class to the `<body>` element. The CSS styles we defined earlier will take effect and show our overlays. Next, perform whatever asynchronous or long-running operation you intend. Finally, remove the "paused" class from `<body>` to hide the overlays. The following JSFiddle demonstrates this functionality:

<iframe src="http://jsfiddle.net/TimGThomas/76pD8/embedded/result,html,js,css" allowfullscreen="allowfullscreen" frameborder="0">.</iframe>

Using CSS, we now have the ability to create a clean, maintainable method of "muting" UI elements during asynchronous operations. Not only does this method reduce the amount of presentational logic in your JavaScript, it's also easy to read and understand and leverages the infrequently-touted stateful features of CSS.
