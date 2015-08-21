title: Controllerless Actions in Ember.js
---

Ember.js includes a robust eventing system for sending [actions](http://emberjs.com/guides/templates/actions/) from user-facing components deeper into your application (often into a [Controller](http://emberjs.com/guides/controllers/)):

``` handlebars
{{#each post in posts}}
  <a {{action 'markAsRead' post}}>Mark as Read</a>
{{/each}}
```

While Controllers are the perfect place for logic used on a single view, you may find that, over time, that behavior becomes duplicated in multiple places. Creating [Mixins](http://emberjs.com/api/classes/Ember.Mixin.html) is one way of [DRY](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself)-ing up your code (and is the preferred solution for interaction logic), but, in this post, we’ll look at another method that’s more [domain logic](http://en.wikipedia.org/wiki/Business_logic)–friendly.

To begin with, let’s take a look at a simple Controller that contains both interaction and domain logic:

``` js
Ember.Controller.extend({
  actions: {
    readMoreLess: function(post) {
      post.set('expanded', !post.get('expanded'));
    },
    markAsRead: function(post) {
      post.set('read', true);
    }
  }
});
```

Expanding and collapsing a blog post’s content is clearly an interaction concern (in other words, not something you’ll likely want to persist to a database), but marking a post as “read” is probably something more meaningful to your application. If we move this functionality to a [Model](http://emberjs.com/guides/models/) object, our action handler may end up looking something like this:

``` js
Ember.Controller.extend({
  actions: {
    readMoreLess: function(post) { /* ... */ },
    markAsRead: function(post) {
      post.markAsRead();
    }
  }
});
```

At this point, there’s not much use for having an action on our Controller that does nothing but delegate out to the Model for this behavior. Fortunately, we can hook into Handlebars for a solution:

``` handlebars
{{#each post in posts}}
  <a {{action 'markAsRead' target=post}}>Mark as Read</a>
{{/each}}
```

By telling Handlebars what the [target of this action](http://emberjs.com/guides/templates/actions/#toc_specifying-a-target) should be (in this case, the post object itself), we can bypass an explicit action handler on a Controller entirely (and it’s entirely possible you may be able to completely remove a Controller in some cases) and call a function directly on that Model. Note, however, that the function names must match _exactly_ between your templates and your model objects (much like a Controller's action's name must match the template):

``` js
BlogPost.reopen({
  markAsRead: function() { /* ... */ }
});
```

This approach won’t work in all cases, and you’ll want to keep an eye on your behavior to make sure you’re only including domain logic in Model objects (remember: interaction logic duplication should be kept in check with Mixins), but hopefully you’ll find your Controllers are cleaner and more expressive as a result.
