---
title: Quick and Easy Filterable Lists in Ember.js
---

There are many great [filterable grids](http://demos.telerik.com/kendo-ui/grid/index) available for Javascript. Sometimes, though, you just want an easy way to show a subset of items in a small list. In this post, we'll look at doing just that in your [Ember.js](http://emberjs.com/) applications.

Let's start with a small list of books. In this fictional UI, we'll show each book's title and author, and let users filter the list of books by genre:

![A wireframe of what we're trying to do][a]

To begin, we need to polyfill a currently-missing component of Ember: radio buttons. It may seem odd, but these innocuous input fields are the key to this solution: we'll bind the selected item's value to an Ember property, which we'll then use to filter the list. Matthew Anderson [wrote a great post][0] on adding support for this input type, so we'll start by adding the code from that post to the Ember app.

Next, let's create a [Component](http://emberjs.com/guides/components/) to house our filtering functionality. This step is optional, but helpful if you plan to filter multiple lists in your app, or if your code's getting a bit messy.

{% code lang:handlebars %}
{{ "{"|escape }}{{ "{"|escape }}filterable-list list=listToFilter{{ "}"|escape }}{{ "}"|escape }}
{% endcode %}

In our Component, we'll include a property, `filterBy`, to store the current filter (defaulted to "all") from the selected radio button, as instructed by Mr. Anderson's post. Our Component also needs a "proxy" list property (let's call it `filteredList`). We'll display this collection in the UI, and we can use its property function to perform the filtering. To start, this property will return the whole collection, but we'll filter it shortly. Don't forget that this property needs to respond to changes for both the list of objects itself as well as the selected filter:

``` js
App.FilterableListComponent = Ember.Component.extend({
  filterBy: 'all',
  filteredList: function() {
    return this.get('list');
  }.property('list', 'filterBy')
});
```

Now let's write the Handlebars template for this Component. We'll need to use the new radio button View we added to the app earlier (one for each filter), and loop through the "proxy" list:

{% code lang:handlebars %}
<ul>
  <li>
    {{ "{"|escape }}{{ "{"|escape }}view Ember.RadioButton name='filter' id='filter_all'
      selectionBinding='filterBy' value='all'{{ "}"|escape }}{{ "}"|escape }}

    <label for="filter_all">All</label>
  </li>
  <!-- other options omitted for brevity -->
</ul>
<table>
  <tr><!-- column headers --></tr>
  {{ "{"|escape }}{{ "{"|escape }}#each filteredList{{ "}"|escape }}{{ "}"|escape }}

    <tr>
      <td>{{ "{"|escape }}{{ "{"|escape }}title{{ "}"|escape }}{{ "}"|escape }}</td>
      <td>{{ "{"|escape }}{{ "{"|escape }}author{{ "}"|escape }}{{ "}"|escape }}</td>
    </tr>
  {{ "{"|escape }}{{ "{"|escape }}/each{{ "}"|escape }}{{ "}"|escape }}

</table>
{% endcode %}

Finally, it's time to hook up our filtering. We'll use an object with properties that match those of the radio buttons, and values of functions that will perform the filtering. Then, when either the list of objects or the selected filter changes, we'll perform the filtering by pulling the matching filter function from that object:

``` js
App.FilterableListComponent = Ember.Component.extend({
  filterBy: 'all',
  filters: {
    all: function() {
      // Show all books.
      return true;
    },
    fantasy: function(book) {
      // Show only fantasy books.
      return book.get('genre') === 'fantasy';
    }
  },
  filteredList: function() {
    // Get the filter from our `filters` object.
    var filterFunction = this.filters[this.get('filterBy')];

    // Perform the filtering with an array function.
    return this.get('list').filter(filterFunction);
  }.property('list', 'filterBy')
});
```

Add in some nice styling, and we've got a pretty nice filterable list!

<p data-height="268" data-theme-id="1840" data-slug-hash="cJwEp" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/TimGThomas/pen/cJwEp/'>Filterable Lists in Ember.js</a> by Tim G. Thomas (<a href='http://codepen.io/TimGThomas'>@TimGThomas</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

[0]: http://thoughts.z-dev.org/2013/07/04/post/

[a]: /css/images/blog/2014-08-01-01.png
