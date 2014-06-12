---
title: Restoring "Show Hidden Windows on Hover" in Visual Studio 2012
category: blog
layout: post
---

I like my Visual Studio workspace to be as unobtrusive as possible. Easy-to-learn [keyboard shortcuts][1]&mdash;which negate the need for tons of buttons and menus&mdash;and productivity tools like JetBrains's [ReSharper][2] eliminate most reasons for needing to show tool windows at all.

![My minimalistic view of the world through Visual Studio 2010][a]

In Visual Studio 2010, a tool window could be easily hidden by clicking the "thumbtack" icon in its title, thereby reducing it to a non-intrusive side-tab of only 21 pixels in width: perfect for my minimalistic UI and infrequent use. Abiding by the Windows usability expectations, hovering over this now-reasonably-sized tab expands the window into view, providing for those quick glances. Furthermore, the team saw fit to include a short delay in said opening, so as to not aggrevate users who inadvertently moved their mouse over the tab.

Visual Studio 2012, unfortunately, decides to disable this particular behavior by default and now requires a click&mdash;*a click!*&mdash;on the aforementioned side-tab before the window is shown (or hidden, for that matter). Heresy!

Fear not, for all is not lost. To restore this essential functionality, simply follow these easy-to-remember steps:

1. Open the Options window. If your menu is visible, click "Tools"&mdash;I mean, "TOOLS"...this is <strike>Metro</strike> Windows 8 UI style, after all&mdash;followed by "Options".
2. In the Options window's "Environment" section, select "Tabs and Windows".
3. Enable the bottom-most option, "Show auto-hidden windows on mouse over".
4. Et voil&#0224;!

[1]: http://msdn.microsoft.com/en-us/library/da5kh0wa.aspx
[2]: http://www.jetbrains.com/resharper/

[a]: /css/images/blog/2012-08-23-01.png
