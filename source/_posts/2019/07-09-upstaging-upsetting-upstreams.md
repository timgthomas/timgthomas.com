---
title: Upstaging Upsetting Upstreams
date: 2019-07-09 15:08:04
tags:
---

Many browser requests communicate directly with one server: the client needs to grab or update data, or perhaps perform an action like logging in. Sometimes, though, you need to chat with sources upstream of even your own resource: passing an API token to a third party service, for example. In these situations, response status codes can quickly get out of hand. Do you return the upstream status code? Your own? A combination of the two?

One option is to simply pass along the upstream status code to the client: if your server can't login to another server, for instance, return the second box's `4XX`.

``` js
// HTTP 401 Not Authorized
{
  "response": {
    "error": "Your credentials were invalid"
  }
}
```

Unfortunately, this introduces some confusion to the consuming code: did _your_ server reject the request, or did the upstream one do so?

The solution that has worked well for us is to wrap the upstream request before sending it to the client. In other words, _your_ server should return its own status code, but _contain_ the upstream one. Philosophically, if the request to _your_ server succeeds, still consider the request "successful" (with a `200`) even if the upstream errors (a `404`, for example).

``` js
// HTTP 200 OK
{
  "upstreamResponse": {
    "statusCode": 401,
    "error": "Your credentials were invalid"
  }
}
```

This allows us to both represent _our_ system's status (where a `401` may represent that a user isn't logged in for us) and the _upstream's_ status (where a `401` may be completely unrelated to our own authentication system). It's helpful to include both for user experience purposes, as you can easily differentiate to users whether it's your code or someone else's that threw an exception.



This behavior is nuanced, but we've found it effectively represents disparate servers' statuses. Have you had similar results? Is there a solution that works better for you? Weigh in in the comments!
