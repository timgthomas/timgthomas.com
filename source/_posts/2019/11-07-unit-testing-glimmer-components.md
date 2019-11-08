---
title: Unit-testing Glimmer Components
---

Like many Ember developers, I'm excited about [Glimmer](https://glimmerjs.com). With the [Octane](https://emberjs.com/editions/octane/) release, the Ember team has removed a lot of cruft from the framework and dramatically simplified day-to-day development. As such, I was excited to upgrade to the latest releases that support Glimmer—3.13 and 3.14—and try out the new goodies.

Unfortunately, I quickly ran into what seemed like a strange miss on Glimmer's part: Glimmer components don't appear to support unit tests. Most of my Ember projects use a large number of component unit tests, so this was a bummer to discover: I'd have to make major changes to the way my components worked in order to have test coverage.

## The Problem

A default component unit test (created via `ember generate`) looks something like this:

```js
test('it exists', function(assert) {
  let component = this.owner.factoryFor('component:my-component').create();
  assert.ok(component);
});
```

This test is pretty easy to understand: the test looks up the factory function for the component we specify, then creates an instance, returning a reference so we can make assertions against the component, minus its rendering. I use this kind of test all the time to exercise computed properties, so I naturally started here when looking to test Glimmer components.

Running said test, however, provided the following error:

> Error: Failed to create an instance of 'component:my-component'. Most likely an improperly defined class or an invalid module export.

I asked around on [Ember's Discord](https://discord.gg/emberjs) (a great place to get help, if you haven't discovered this already), but there was no obvious solution. I tried a couple of other suggested options, all to no avail:

```js
new (this.owner.factoryFor('component:my-component').class);
new MyComponent(this.owner.ownerInjection(), {});
```

> Error: You must pass both the owner and args to super() in your component.

What I *was* provided with, though, was some background on Glimmer's internals and some discussion on component testing in general: just enough to get the [little grey cells](https://en.wikipedia.org/wiki/Hercule_Poirot) moving.

## To the source!

Fortunately, Glimmer's source (and Ember's, too, really) is very readable, and it didn't take long to grok how Glimmer's components work: arguments passed to components are given to a [ComponentManager](https://github.com/glimmerjs/glimmer.js/blob/master/packages/%40glimmer/component/addon/-private/ember-component-manager.ts), which then passes them to newly-created [Component](https://github.com/glimmerjs/glimmer.js/blob/master/packages/%40glimmer/component/addon/-private/component.ts)s after confirming that the args' integrity is intact. Can we then use this same approach to create components for unit testing? In short: yes!

**The Owner.** First, we'll need a reference to the "owner": a shortcut into [Ember's dependency injection container](https://guides.emberjs.com/release/applications/dependency-injection/). If we're already inside a test, we can access this via `this.owner`; otherwise, we can use a function from [`@ember/test-helpers`](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#getcontext):

```js
import { getContext } from '@ember/test-helpers';
let { owner } = getContext();
```

**The Factory.** We also need a factory function to give to the Component Manager so it can create the Component instance. Historically, this was in a [`factoryFor()`](https://api.emberjs.com/ember/3.14/classes/ApplicationInstance/methods/factoryFor) function, and it still is: just behind a `class` property (since we're using classes now!). To get this, we'll need the lookup key for the component (usually of the style of `component:my-component`). If you're migrating an existing unit test, this is the string passed to `factoryFor()`:

```js
let lookupPath = 'component:my-component';
let { class: componentClass } = owner.factoryFor(lookupPath);
```

**The Component Manager.** Next, we need to create the aforementioned Component Manager, through which we'll pass arguments to our soon-to-be-created component. Looking at the Glimmer source, [a manager is exported into Ember apps](https://github.com/glimmerjs/glimmer.js/blob/master/packages/%40glimmer/component/app/component-managers/glimmer.js), so we can import it thusly:

```js
import GlimmerComponentManager from '../../component-managers/glimmer';
// This example is "located" in `tests/helpers`, so we need to go up two levels.
let componentManager = new GlimmerComponentManager(owner);
```

**At last: the Component!** Now that we have an Owner and Component Manager, we can create the component we've always wanted! We'll need one last thing: any arguments we want to provide the Component. The Component Manager expects these [in an attribute named `named`](https://github.com/glimmerjs/glimmer.js/blob/master/packages/%40glimmer/component/addon/-private/ember-component-manager.ts#L74), so we'll oblige it:

```js
let named = { myArgument: 42 };
let component = componentManager.createComponent(componentClass, { named });
```

**The Tests.** The component alone is not enough, of course: we still need our tests. I was concerned about this part, because Glimmer components [do away with computed properties and Ember's getters and setters](https://emberjs.github.io/rfcs/0410-tracked-properties.html). I needn't have worried, though: Octane's changes mean most Glimmer component code is regular JavaScript! Just set values as you would inside the Glimmer component, and you're all good!

```js
named.myArgument = 1337;
assert.equal(component.someGetterThatUsesMyArgument, 1337);
```

## Don't Repeat Yourself

I use this approach often enough that I usually create a test helper to do all the hard work for us in one place. Here's the helper in its entirety:

```js
import { getContext } from '@ember/test-helpers';
import GlimmerComponentManager from '../../component-managers/glimmer';

export default function createComponent(lookupPath, named = {}) {
  let { owner } = getContext();
  let { class: componentClass } = owner.factoryFor(lookupPath);
  let componentManager = new GlimmerComponentManager(owner);
  return componentManager.createComponent(componentClass, { named });
}
```

And you can use it thusly:

```js
import createComponent from 'my-app/tests/helpers/create-component';

test('should calculate uv indices', async function(assert) {
  let model = { val: 4 };
  let component = createComponent('component:my-component', { model });
  assert.equal(component.valueSquared, 16);

  model.val = 3;
  assert.equal(component.valueSquared, 9);
});
```

## A Disclaimer

As I mentioned earlier in this post, Octane doesn't officially support unit tests for Glimmer components. Although (as far as I can tell), everything in this post uses non-private APIs, there's no guarantee this approach will work in the future. Of course, I hope the Ember and Glimmer teams restore official support for this type of test, as it's usually the first thing I reach for when building out components. Until then, I'll try to keep up with any API changes and update this post to match.

-----

I want to extend special thanks to [NullVoxPopuli](https://twitter.com/nullvoxpopuli), [pzuraq](https://www.pzuraq.com), and [bendemboski](https://twitter.com/bendemboski) from the Discord server, for listening to my concerns, patiently explaining me through the Glimmer rendering process, and offering suggestions on how to proceed.

Do you have any other approaches you use for component tests? Suggestions for improvement? Let me know in the comments below, and happy testing!
