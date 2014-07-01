---
title: Creating Conical Gradients in Illustrator CS6
category: blog
layout: post
---

One feature I used to use frequently in [CorelDRAW!][1] is conical gradients. The concept is simple: take a linear gradient and wrap it around a central point to create the appearance of a cone. When I switched to [Adobe Illustrator][2] (my primary motivation was that Corel's exporting features weren't very Web-friendly, but that's a topic for another day), my main complaint was its lack of conical gradients. While [some workarounds][3] are available, none was frictionless, and my designs went without for some time.

A few weeks ago, I watched a video [previewing the new "gradient on a stroke" feature][4] of Illustrator CS6. While this feature sounds amazing for a number of reasons, my first thought was to try to use it to create conical gradients. The process is even simple enough to no longer make me long for Corel's implementation. Here's how to do it:

1. First, use the Ellipse Tool to draw a circle (hold down the \[Shift\] key while dragging to create a perfect circle). The circle's width and height should be half that of the final size you're looking for; for example, if you want a gradient 100px by 100px in size, create a circle that is 50px by 50px.

<img src="/css/images/blog/2012-05-08-01.png" alt="Step 1" class="inline">

2. Create a stroke on the circle of the same size as the shape itself. In our example, that would be 50px. As you can see, I prefer to make my stroke and fill dramatically different colors so I can see ensure everything lines-up.

<img src="/css/images/blog/2012-05-08-02.png" alt="Step 2" class="inline">

3. In the Gradient Panel, click the stroke symbol to select it, then, in the "Type" selection box, choose "Linear".

<img src="/css/images/blog/2012-05-08-03.png" alt="Step 3" class="inline">

4. Gradients-on-strokes have three possible display options: "within stroke", which paints the gradient normally, just on a stroke; "along stroke", which draws it perpendicular to the stroke's line, and "across stroke", which draws it parallel to the line. To create a conical gradient, select the "along stroke" option.

<img src="/css/images/blog/2012-05-08-04.png" alt="Step 4" class="inline">

This basic process can be extended to create some pretty awesome gradients. Also, don't forget about Illustrator's clipping mask feature to add conical gradients to any shape of object:


<img src="/css/images/blog/2012-05-08-05.png" alt="Some other things you can do with conical gradients" class="inline">

Have a conical gradient you're proud of? Share it in the comments!

[1]: http://www.corel.com/corel/product/index.jsp?pid=prod4260069
[2]: http://www.adobe.com/products/illustrator.html
[3]: http://vector.tutsplus.com/tutorials/tools-tips/quick-tip-create-a-conical-gradient-with-adobe-illustrator-in-two-minutes/
[4]: http://www.adobe.com/feature/creativesuite/designandweb/cs6/gradients-on-strokes-in-illustrator.modaldisplay.2._s_content_s_dotcom_s_en_s_products_s_creativesuite_s_design-web-premium_s_features.html
