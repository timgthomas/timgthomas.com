---
title: Installing Ember CLI on Windows
---

Yesterday, I made a huge mistake: I decided to install [Ember CLI](http://www.ember-cli.com/) on a brand-new Windows installation. Over _two hours_ later, I was finally able to build and run an Ember CLI project. I'd like to share some of that process with you, and perhaps save you some of the headaches I encountered.

<!-- more -->

## Installing Ember CLI

Before I begin, some bad news: when I began this arduous journey, I didn't realize how difficult it would become, so I neglected to document most of the error messages I received. If I'm feeling masochistic and ever try this again, I'll update this post with more detailed errors.

Also, I based this post on my experiences, so your mileage may vary (and I certainly hope it does). For reference, I'm using Windows 7 Ultimate, 64-bit. Let's get started:

1. **npm.** On Windows, nested packages in `node_modules` often [overflow Windows's file path length limitations](https://github.com/joyent/node/issues/6960). To bypass this restriction, the npm 3 (beta) [stores modules in a flat structure](http://www.infoq.com/news/2015/06/npm). I didn't install this at first, and soon ran into issues. To get npm 3, install [Node](https://nodejs.org/), then use the [`npm-windows-upgrade`](https://github.com/felixrieseberg/npm-windows-upgrade) package to upgrade it. One caveat: the package's README _implies_ you should [run the upgrade in an Administrator console](https://github.com/felixrieseberg/npm-windows-upgrade#usage), but this later caused several permissions errors. Everything worked as expected when I ran the command in a non-Admin window.
1. **Python.** One of Ember CLI's dependencies, `node-gyp`, requires [Python](https://www.python.org/). If you're unfamiliar with the Python ecosystem, there are two major, and [somewhat-incompatible](https://wiki.python.org/moin/Python2orPython3), versions. The package doesn't state which version it needs, but it will complain if you've installed the wrong one. You'll want some flavor of 2.x (I used the newest as of this writing, [2.7.10](https://www.python.org/downloads/)).
1. **Visual Studio.** Yep, you read that right: you need _Visual Freaking Studio_ to build Ember apps on Windows. `node-gyp` only [requires some of VS's C++ compilers](https://github.com/TooTallNate/node-gyp#installation), but a full install is the reliable way to get those. A free version is available (I used the recommended "[Visual Studio 2013 Express for Windows Desktop](https://www.visualstudio.com/en-us/products/visual-studio-express-vs.aspx)”), but set aside at least an hour to find, download, and install it. Oh, and say "goodbye" to a clean "Programs and Features" screen after you're done:
![Installing Visual Studio adds a few apps](/2015/07/installing-ember-cli-on-windows/programs-and-features.png)
1. **Bower.** You'll also need [Bower](http://bower.io/) for browser-side package management, but this was a painless installation for me. Just `npm install bower -g` and you should be good to go.

## Building an Ember CLI Project

At this point, I was about 90 minutes into the process...but I wasn't done yet. After installing Ember CLI, you'll need to install a project's npm and Bower dependencies (with `npm install` and `bower install`, respectively). The Bower packages installed fine, but npm's were another story:

1. **Folder permissions.** I encountered several npm `EACCES` errors when installing a project's dependencies, stating that I didn't have permissions for `C:\Program Files\nodejs`. This is an [easy fix](http://stackoverflow.com/questions/16151018/npm-throws-error-without-sudo) on OSes that have `chown`, but I had to use Windows's infamous "Security" UI instead. Though my user account is a member of the "Administrators" group, which has access to that folder, that's not enough: I needed to give my user account full access to the `nodejs` folder and its children. The permissions errors disappeared after that.
1. **Disconnections.** Once the permissions errors cleared up, I started receiving `ECONNRESET` errors a few seconds into downloading npm packages. Re-running `npm install` sometimes worked, but [changing the npm registry to a non-HTTPS version](http://stackoverflow.com/questions/18419144/npm-not-working-read-econnreset) solved the issue.

Finally, two hours after I began, I was able to build and run an Ember CLI app. Unfortunately, I then discovered Windows is abysmally slow at _compiling_ the Ember CLI stuff. There's [an npm package to help](https://github.com/felixrieseberg/ember-cli-windows), but it was still pretty painful for me after that...but at least it was working.

I'm still trying to remember exactly _why_ I embarked on this near-Sisyphean experience—I had a MacBook Pro within arm's reach on which I develop most of my Ember apps—but I hope documenting my painful journey will help yours be less so. Happy Embering!
