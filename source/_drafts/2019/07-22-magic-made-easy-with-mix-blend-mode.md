---
title: Magic Made Easy with mix-blend-mode
layout: false # Don't render this post.
---

I enjoy experimenting with different geometries in web design. Whether it be the hexagon motif this blog currently uses, or something a bit more dramatic](link to Heart points)?, when it comes to web design, squares are...well, _square_.

Problem is, unusual geometry can be pretty difficult to style. We have a lot of CSS tools at our disposal for adding visuals to basic elements (`box-shadow`, gradients, and `border-radius`, to name a few), but more complex structures simply can't use. All is not lost, though: there's a secret hiding in CSS that can alleviate, if not solve, many of the constraints of complex visual designs.

## But First...SVG

_MDN says this doesn't work with SVGs in Safari...need to check. If it doesn't, rework this section to apply to images._

As with most things CSS, the technique I describe in this article can be applied to almost any element with varying degrees of success. That said, I've found it most useful when working with SVGs. This is mainly because it's very difficult to even _create_ complex geometry with basic HTML, though [that by no means means "impossible"](link to lynn and tonic CSS stuff).

I've spoken before on using SVG in your workflow, and I strongly recommend at least investigating it. The markup language is pretty easy to learn, and fairly ubiquitous as exports from most graphics apps. At Vectra, almost all of our visualizations, iconography, and complex visuals are made with at least some SVG.

## Will it Blend?

The secret sauce(s) I refer to here are [blend modes](https://en.wikipedia.org/wiki/Blend_modes). Blend modes describe how to colors will mix, or _blend_ together, assuming some transparency is involved (after all, a fully-opaque color doesn't really blend with what's behind it).

Designers have had access to blend modes for decades: I myself first encountered them in CorelDRAW, a graphics package I used as a kid. Blend modes can create some very interesting effects, but for most of their history, were regulated to visual design apps.

These days, web developers have access to many of the same blend modes designers have coveted for years, and can create some truly stunning visual effects. You'll be pleased to know most modern browsers [have good support](https://caniuse.com/#search=mix-blend-mode) for the CSS we'll use in this article. Edge is, unsurprisingly, the notable exception, though this will probably be a moot point once they [switch to Chrome's renderer](???source???).

## Blend Modes in Action

Getting started with blend modes is surprisingly easy with `mix-blend-mode`. Using this property, you can tell the browser to blend the selected element(s) with anything underneath. You might be surprised to learn that everything in CSS is _already_ using a blend mode: one we call "normal". This simply means fully-opaque elements occlude whatever is behind them in the stacking order, and that adding transparency allows some of the underlying visuals to show through.

Blend modes really shine, though, when you leave the "normal" path and start experimenting. I'll leave the [detailed explanations of what each blend mode does](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode#Examples) to those who are more qualified, but here are some tricks I use to make some unexpected interfaces:

## TODO

* Invert on click, like the social buttons here
* "Fill" animation (Heart Points)
* Headers in Dragon Dice with gradients
* Hue for icons, etc.
