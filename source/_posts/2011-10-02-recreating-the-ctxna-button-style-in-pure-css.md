---
title: Recreating the CTXNA Button Style in Pure CSS
category: blog
layout: post
---

Although the design of the [CTXNA Web site][1] makes extensive use of images (for
browser compatability), I became curious how difficult the style would be to
reproduce in nothing but CSS and threw together a demo using JSFiddle:

<iframe style="width:95%;height:150px;margin:10px" src="http://jsfiddle.net/TimGThomas/GyxaD/embedded/result,css,html">
</iframe>

The complete sample requires a browser that supports CSS gradients and the
`border-radius`, `box-shadow`, and `text-shadow` properties; however, older
browser users will still be able to recogize the button even if it's not _quite_
so pretty. :)

Switching your graphics from using images to CSS has some great advantages:

- **More flexibility.** Modern design techniques typically involve a number of
  iterations, each one of which can involve a major rework of graphical
  elements. If your images have already been sliced and placed into your HTML,
  it can be a chore to re-export them from your graphics tool of choice. Using
  CSS instead means you can make iterative changes without starting over.
- **Fewer requests.** Instead of loading a CSS file _and_ several image files,
  browsers simply load a simple file, cutting down on slow loading times caused
  by network latency.
- **Smaller file sizes.** Though our example above is relatively complex, many
  images can be replaced with CSS with a significant reduction in file size
  (being text, CSS rules take up less space on disk than graphics). Given the
  average number of images on Web sites, this can lead to some serious page
  load time improvements!

Have you encountered sites with good use of CSS in lieu of images? Share in the
comments!

[1]: http://ctxna.org/