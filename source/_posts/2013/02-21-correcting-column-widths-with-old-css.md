---
title: Correcting Column Widths with Old CSS
---

During a demo this week, one of the participants pointed out some strange behavior: when data tables in this application are modified by adding in more rows with `colspan` attributes—as happens when users request more details about a particular row of data—the table's column widths inexplicably shift positions and sizes. Normally, I work around this bit of silliness by adding some explicit widths (always in percentages! :) to the header cells, but these tables already featured that "fix".

Confused, I turned to Google, where I came across a forum thread from 2005. Normally, I'd skip over this most ancient of search results (and did, initially), but something about its verbose title, "[how can I force &lt;TD> width to remain the same width no matter what happens to others][1]", made me think this dusty tome of Webmasterism might contain the solution I sought. As you're currently reading a post on the subject, it obviously did.

The solution, helpfully provided by forum member "pocu", involves a CSS property I've either never before used, or filed away years ago when I finally abandoned the vestiges of table-based design: [`table-layout`][2]. Changing this property from its user agent default to `fixed` modifies the way in which `table` column widths are calculated: instead of adapting each column's width to the content on any of its cells, only the table's width, or the width of a cell in the first row, can adjust a column's size.

The following [JSFiddle][3] demonstrates this behavior. Click in any cell to modify its value, and notice how the automatic-layout table (top) differs from the fixed-layout one:

<iframe src="https://jsfiddle.net/TimGThomas/D3eYK/15/embedded/result,html,css" style="height:300px" allowfullscreen="allowfullscreen" frameborder="0">.</iframe>

Though table-based layouts are a distant memory, many sites still need to represent tabular data, and it's still important to give `table`s some visual consideration. `table-layout` does just that, by solving column width inconsistencies when a table's structure is modified. Maybe it's time to move this antique from its long-forgotten home into your HTML table toolbelt.

[1]: http://www.sitepoint.com/forums/showthread.php?246456-how-can-I-force-lt-TD-gt-width-to-remain-the-same-width-no-matter-what-happens-to-others
[2]: https://developer.mozilla.org/en-US/docs/CSS/table-layout
[3]: http://jsfiddle.net/TimGThomas/D3eYK/
