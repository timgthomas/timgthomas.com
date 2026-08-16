---
title: Automating Custom macOS Icons
layout: false # Don't render this post yet.
---

I've been an app icon pedant for years, even going so far as to make my own when I feel an app developer has phoned theirs in. This is, admittedly, a very specific hill to die on—but at least it has a nicely aligned Dock.

Apple has done a great job bringing consistency to its iconography over the years, from the [app icon guidance](https://developer.apple.com/design/human-interface-guidelines/app-icons/) to [SF Symbols](https://developer.apple.com/sf-symbols/). With [Liquid Glass](https://developer.apple.com/design/human-interface-guidelines/materials) and the arrival of [Icon Composer](https://developer.apple.com/icon-composer/), we now have the same tools to make our own icons feel at home on macOS.

Not every app has caught up, though. Discord's icon, for example, stubbornly refuses to match the dark appearance of the rest of my Dock. I could replace it manually, but an app update would replace it right back. Naturally, this called for automation.

## Composing an Icon

[Icon Composer](https://developer.apple.com/documentation/xcode/creating-your-app-icon-using-icon-composer) turns one or more SVG or PNG layers into a single `.icon` file, adding the masking, lighting, translucency, and other Liquid Glass effects expected by current versions of macOS. It can also customize the same artwork for Default, Dark, and Mono appearances.

**TODO: Prolly want to rewrite this para + use another icon**
Apple's [Create icons with Icon Composer](https://developer.apple.com/videos/play/wwdc2025/361/) video from last year's WWDC provides an excellent tour of the full workflow. For our purposes, though, the barrier to entry is delightfully low. Save this tiny, entirely home-grown (and free to use without attribution) speech bubble as `chat.svg`:


```svg
<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M40 48h176v120H104l-48 40v-40H40z"
    fill="#fff"
  />
</svg>
```

It's straightforward to draft an icon: Open Icon Composer, drag the SVG into the layer list, choose a background color, adjust the material settings, _et voila!_ From someone who used to spend hours sweating over every custom highlight in new versions of macOS, I'm a _huge_ fan of this new simplicity!

The default `ictool` export is 

<!--

One small optical correction proved necessary: Icon Composer's flattened export fills the available canvas more aggressively than the system icons around it. I render the icon at 900×900, then center it on a transparent 1024×1024 canvas. That's about 88% of the full size, and makes the result align much more naturally in the Dock.-->

```sh
ictool Discord.icon \
  --export-image \
  --output-file Discord-rendered.png \
  --platform macOS \
  --rendition Dark \
  --width 900 \
  --height 900 \
  --scale 1

sips -p 1024 1024 Discord-rendered.png --out Discord.png
```

`ictool` lives inside Icon Composer's app bundle. For me, that was here (I'm using the Xcode 27 beta at time of writing, so expect this to differ).

`/Applications/Xcode-beta.app/Contents/Applications/Icon Composer.app/Contents/Executables/ictool`

It's always nighttime on my Dock, so I also use the `Dark` rendition above. Adjust for taste. :)

## Applying It

Actually setting the icon takes shockingly little Swift. `NSWorkspace` accepts an `NSImage` and a path; the rest of this script is some fairly basic error handling:

```swift
import AppKit

let imagePath = CommandLine.arguments[1]
let appPath = CommandLine.arguments[2]

guard let image = NSImage(contentsOfFile: imagePath) else {
  fatalError("Unable to read icon: \(imagePath)")
}

guard NSWorkspace.shared.setIcon(image, forFile: appPath, options: []) else {
  fatalError("Unable to set icon for: \(appPath)")
}
```

Then apply it with:

```sh
sudo swift set-icon.swift Discord.png /Applications/Discord.app
killall Dock
```

My full version of this process combines the export

## Keeping It That Way

Changing an application's icon modifies its bundle, so replacing or upgrading that application can restore the original. I added the icon script alongside my usual Homebrew update routine; once the apps are current, it quietly puts everything back where it belongs.

The whole process now looks like this:

1. Draw one or more simple SVG layers.
2. Compose their Default, Dark, and Mono appearances in Icon Composer.
3. Export the desired macOS rendition at 900×900 and pad it to 1024×1024.
4. Turn the result into an ICNS and apply it with `NSWorkspace`.
5. Run the script again after application updates.

It is an unreasonable amount of machinery for making Discord sit properly beside its neighbors. Fortunately, the machinery is reusable—and the Dock is once again at peace.

<!-- The prompt -->

```
i want to write a blog post about changing macos icons via automation. with the new icon composer, my flow is to go from a .icon file, generate a PNG, then use this swift app to set it. Very few lines of code, and you can design your own icons in icon composer.

parts of the post:
- why would i do this? (discord's icon still doesn't match, etc)
- brief on icon composer
- create an icon with a basic, no-license SVG to show how quick/easy it is
- swift script for applying to an icon
- for me, I added it next to my "brew update" script so new updates don't break
- "in action": summary of the whole process

this is in my current blog, so check out all my other posts to make sure you fit my writing style, please. Nothing too long for this one. :)

Here's some rough notes/pseudocode…

"""
I've been an app icon (purist/Nazi/etc) for years, even going so far as to make my own when I feel app devs phoned in their icons. [i have an example icon somewhere i'll try to link, but can't find it yet]

Apple has done a great job of bringing consistency to their iconography over years [note: add links for app icon guidance, sfsymbols], but the introduction of Liquid Glass [link] and Icon Composer [link] means we have tools for even more consistent design

But some apps still don't fit: Discord's stubbornly refuses to align to the new "dark" mode on macOS, so I decided to reach for an older tool of auto-replacing icons.

"""

Some things to cover:
- The PNG export is too physically big by default, so we scaled it down to ~88% (verify) so that it lines up with other icons
- This does the specific dark version, so adjust as necessary
- Can you look online for official links to Icon Composer docs, maybe a YouTube video from Apple directly on using it?

The code that does this is in my _dotfiles repo ("icons"), so you can find it there for the real code! :)
```
