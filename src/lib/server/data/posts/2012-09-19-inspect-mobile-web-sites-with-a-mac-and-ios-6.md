---
title: Inspect Mobile Web Sites with a Mac and iOS 6
---

iOS 6 includes [a number of new features][1], including brand-new, Apple-designed maps and, for some, Siri support. My favorite new feature by far, however, is one that very few consumers will even know exists: remote Web inspection.

If you've done any Web development, you've likely encountered Webkit's Web inspector in either Safari or Chrome, but developers were relegated to inspecting pages on their desktops or laptops. With iOS 6, you can now remotely inspect a Web page running on your iOS device...from your Mac. In this post, I'll show you how.

## Getting started

Obviously, you'll need an iOS device. For this post, I'll be using my (new) iPad. You'll also need a Mac on which to run Safari (as of this writing, Safari is no longer available on Windows). You'll also need to connect your iOS device to your Mac with a cable.

You'll now need to enable Web inspection on your device. Open Settings, then tap the "Safari" option. Scroll to the bottom and open the "Advanced" panel. Turn the option for "Web Inspector" on, and you're good to go.

After you've connected your iOS device and enabled the Web inspector, open up Mobile Safari and navigate to a site of your choice.

![My site, running on Mobile Safari.][a]

## Connecting to the remote inspector

Next, open Safari on your Mac. If you don't have the "Develop" toolbar showing, you'll need to show it:

1. Open the "Preferences" window.
2. Click the "Advanced" tab.
3. At the bottom of this panel, click "Show Develop menu in menu bar"

Open the "Develop" menu and look for your iOS device's name (mine is "Tim's iPad"). Select that menu and click the menu option that corresponds to the URL you'd like to remotely inspect. If you have your iOS device closeby and the about-to-be-inspected tab open, you'll notice the Web page gains a blue tint when you hover over the menu item.

Select the option (in this example, "timgthomas.com"), and a Web inspection window will appear.

## Get inspecting!

From here, there are a number of ways you can inspect your remotely-viewed Web page. The center of the screen contains a hierarchical view of the page's markup, and you can hover over and click various tags to see their properties (and watch them be highlighted on your iOS device).

![Hover over an element in the Web inspector, and see it highlighted on your iOS device!][b]

If you want to avoid digging through a bunch of markup to inspect an element, simply click the "hand" icon and, on your device, tap an element to target it in the inspector.

![The "hand" icon.][c]

You can even remotely-debug JavaScript! Expand the "Scripts" folder and choose a script file to debug. Then, click the line number margin to set a breakpoint, and cause the break by performing the corresponding action on the device. Don't forget that you can also debug Web sites running on a Web server local to your Mac!

I've already used this tool to diagnose and fix some iPad layout issues on this site. I hope you find iOS 6's remote Web inspector just as invaluable!

[1]: http://www.apple.com/ios/

[a]: $/2012-09-19-01.png
[b]: $/2012-09-19-02.png
[c]: $/2012-09-19-03.png
