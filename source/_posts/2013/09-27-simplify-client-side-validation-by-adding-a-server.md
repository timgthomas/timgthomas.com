---
title: Simplify Client-side Validation…by Adding a Server
date: 2013-09-27
---

Traditional web validation techniques typically involve a mix of client-side validation (with a JavaScript library), followed by another round of validation on the server. By necessity, server-side validation needs to be a superset of client-side code to prevent erroneous—or sometimes malicious—data from getting into the system.

Unfortunately, this approach has some flaws. For one, it relies on developers remembering to duplicate validation features on both the client and server , which they often don't. Even if you use a system that "automatically" applies validation logic in both places, there are cases where a page can't be validated without checking with the server (validating the uniqueness of a user name comes to mind).

The approach on which we decided for the project I'm currently on leverages the ubiquity of server-side validation with much of the high level of responsiveness of client-side solutions.

Here's the gist: when we detect that a form is about to be submitted, intercept the request with JavaScript, serialize the form, and send it up to the server. The server performs its validation normally, and either allows the request through, or responds with a serialized object describing exactly why the validation failed.

_UPDATE: I've built a [simple example application][4] ([source code][5]) demonstrating this technique._

## Keep the client code clean

Say we're building a sign-up form. We'll need a "user name" field that we want to make sure unique within the system. Our HTML probably looks something like this:

``` html
<input name="userName" type="text" />
```

We _could_ perform this validation with a custom AJAX request (using jQuery, in this example):

``` js
$('#userName').on('change', function() {
  var attemptedUserName = $(this).val();
  $.ajax(/* ... */)
    .success(function() { /* All good! */ })
    .error(function() { /* Nope; it's a duplicate. */ });
});
```

...but now we've introduced another server endpoint that needs to handle these requests, as well as some JavaScript that's really only good for verifying user name uniqueness. This code could be optimized to reduce duplication, but it's still not very extensible. Instead, what if we serialized the entire form and validated it all at once?

``` js
$('form').on('submit', function() {
  var attemptedFormData = $(this).serialize();
  $.ajax(/* ... */)
    .success(function() { /* The whole form's good! */ })
    .error(function() { /* Something went wrong. */ });
});
```

Now we can check not only the "user name" field's value, but all of the values of the form at once. The server's response (which we'll see how to build in the next section), could look something like this:

``` json
{
  "userName": {
    "errors": [ "This user name has already been taken." ]
  }
}
```

Instead of a simple "yes/no" validation response, we have a rich model representing _exactly_ what's wrong with the entire form, and with no additional markup (or even client-side code, beyond our single form hijacking call). We can even use the keys in this return object (which correspond to the `name` values of form inputs) to highlight the erroneous fields:

``` js
var fields = Object.keys(result);
fields.forEach(function(field) {
  if (result[field].errors) {
    $('[name=' + field + ']').addClass('invalid');
  });
});
```

## Add the server component

In this project, built on ASP.NET MVC, we use the [Fluent Validation library][0] for validating data sent up from the client, though this approach hardly requires .NET. To get started, we'll need a model class to store this form's data:

``` csharp
public class SignUpViewModel
{
  public string UserName { get; set; }
}
```

We'll also add a custom validator, using the Fluent Validation syntax. This example is relatively sparse, but the [Fluent Validation API][1] is quite flexible.

``` csharp
public class SignUpViewModelValidator :
  AbstractValidator<SignUpViewModel>
{
  public SignUpViewModelValidator()
  {
    RuleFor(x => x.UserName).Must((model, userName) => {
      // Determine whether 'userName' is unique.
    });
  }
}
```

ASP.NET MVC already has a built-in server-side validation concept, called "Model State", that Fluent Validation bolts onto. A `ModelState` object contains a .NET object–based representation of exactly the server result we want, so all we need to do is respond to invalid requests with it. Another MVC extensibility point, "Action Filters", gives us this ability:

``` csharp
public class ValidatorActionFilter : IActionFilter
{
  public void OnActionExecuting(ActionExecutingContext filterContext)
  {
    // Continue normally if the model is valid.
    if (filterContext.Controller.ViewData.ModelState.IsValid) return;

    var serializationSettings = new JsonSerializerSettings
      {
        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
      };

    var serializedModelState = JsonConvert.SerializeObject(
      filterContext.Controller.ViewData.ModelState,
      serializationSettings);

    var result = new ContentResult
      {
        Content = serializedModelState,
        ContentType = "application/json"
      };

    filterContext.HttpContext.Response.StatusCode = 400;
    filterContext.Result = result;
  }
}
```

In short, this filter serializes the `ModelState` object and sends it down to the client as JSON with a "400" status code ("Bad Request"). .NET provides a `JsonResult` object, but the default serializer misbehaves frequently with all but the simplest of objects to serialize. As a result, we've opted to use the [Newtonsoft JSON library][2] instead.

You'll need to attach this filter to your MVC application—if that's your server-side framework of choice. We're using it as a [global action filter][3].

## Happy validating!

Now that we've built a client that's aware of potential form errors reported in a certain structure, and instructed the server to send down a meaningful model on invalid form submissions, all that's left is to sit back and enjoy never having to write a client-side form validator again!

[0]: http://fluentvalidation.codeplex.com/
[1]: http://fluentvalidation.codeplex.com/wikipage?title=Validators&referringTitle=Documentation
[2]: https://github.com/JamesNK/Newtonsoft.Json
[3]: http://weblogs.asp.net/gunnarpeipman/archive/2010/08/15/asp-net-mvc-3-global-action-filters.aspx
[4]: http://validation-sample.apphb.com/
[5]: https://github.com/TimGThomas/validation-sample
