[![CircleCI](https://circleci.com/gh/jahuty/jahuty-node.svg?style=svg)](https://circleci.com/gh/jahuty/jahuty-node) [![codecov](https://codecov.io/gh/jahuty/jahuty-node/branch/master/graph/badge.svg?token=3NBRW34P6N)](https://codecov.io/gh/jahuty/jahuty-node) [![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

# jahuty-node

The Node.js SDK provides convenient access to the [Jahuty API](https://docs.jahuty.com/api) from applications written in server-side JavaScript.

## Requirements

This library requires Node 10+. It may work with earlier versions but has not been tested.

## Installation

Install the package with:

```
npm install @jahuty/jahuty --save
# or
yarn add @jahuty/jahuty
```

## Syntax

This package is written using ES6 syntax and transpiled to CommonJS for maximum compatibility.

## Usage

The package needs to be configured with your account's [API key](https://docs.jahuty.com/api#authentication) before using the `snippets.render()` method to render a snippet:

```js
const Client = require('@jahuty/jahuty').default;

const jahuty = new Client({ apiKey: YOUR_API_KEY });

const render = await jahuty.snippets.render(YOUR_SNIPPET_ID);

console.log(render.content);
```

You can also use tags to render a collection of snippets with the `snippets.allRenders()` method:

```js
const Client = require('@jahuty/jahuty').default;

const jahuty = new Client({ api_key: 'YOUR_API_KEY' });

const renders = await jahuty.snippets.allRenders('YOUR_TAG');

renders.forEach((render) => console.log(render));
```

## Rendering content

By default, Jahuty will render a snippet's _published_ content, the content that existed the last time a teammate clicked the "Publish" button, to avoid exposing your creative process to customers.

You can use the `preferLatest` configuration option, however, to render the snippet's _latest_ content, the content that currently exists in the editor, in the current environment:

```js
const Client = require('@jahuty/jahuty').default;

const jahuty = new Client({ apiKey: YOUR_API_KEY, preferLatest: true });
```

You can also prefer the latest content (or not) for a single render:

```js
const Client = require('@jahuty/jahuty').default;

const jahuty = new Client({ apiKey: YOUR_API_KEY });

const render = await jahuty.snippets.render(YOUR_SNIPPET_ID, { preferLatest: true });
```

## Using parameters

You can [pass parameters](https://docs.jahuty.com/liquid/parameters) into your snippet using the options hash and the params key:

```js
const Client = require('@jahuty/jahuty').default;

const jahuty = new Client({ apiKey: YOUR_API_KEY });

const render = await jahuty.snippets.render(YOUR_SNIPPET_ID, {
  params: { foo: 'bar' },
});

console.log(render.content);
```

The parameters above would be equivalent to [assigning the variables](https://www.jahuty.com/docs/assigning-a-variable) below in your snippet:

```
{% assign foo = "bar" %}
```

If you're rendering a collection, the first dimension of the `params` key determines the parameters' scope. Use an asterisk key (`*`) to pass the same parameters to all snippets, or use a snippet id as key to pass parameters to a specific snippet.

```js
const Client = require('@jahuty/jahuty').default;

const jahuty = new Client({ apiKey: YOUR_API_KEY });

const renders = await jahuty.snippets.allRenders('YOUR_TAG', {
  params: {
    '*': { foo: 'bar' },
    '1': { baz: 'qux' },
  },
});
```

This will pass the parameters `{ foo: 'bar' }` to all snippets, except for snippet `1`, which will be passed `{ foo: 'bar', baz: 'qux' }`.

The two parameter lists will be merged recursively, and parameters for a specific snippet will take precedence over parameters for all snippets. For example, the parameter `foo` will be assigned the value `"bar"` for all snippets, except for snippet `1`, where it will be assigned the value `"qux"`:

```js
const Client = require('@jahuty/jahuty').default;

const jahuty = new Client({ apiKey: YOUR_API_KEY });

const renders = await jahuty.snippets.allRenders('YOUR_TAG', {
  params: {
    '*': { foo: 'bar' },
    '1': { foo: 'qux' },
  },
});
```

## Tracking renders

You can record where snippets are rendered using the `location` configuration option. This helps your team preview their changes, and it helps you find and replace deprecated snippets.

```js
const Client = require('@jahuty/jahuty').default;

const jahuty = new Client({ apiKey: YOUR_API_KEY });

const render = await jahuty.snippets.render(YOUR_SNIPPET_ID, {
  location: 'https://example.com'
});
```

Note, this configuration option is only supported by the `render()` method, and because locations are only reported when a request is sent to Jahuty's API, they may not be reported in all scenarios (e.g., if a call to `render` results in a cache hit).

## Caching for performance

You can use caching to control how frequently this library requests the latest content from Jahuty's API.

* When content is in _development_ (i.e., frequently changing and low traffic), you can use the default in-memory store to view content changes instantaneously with slower response times.
* When content is in _production_ (i.e., more stable and high traffic), you can use persistent caching to update content less frequently and improve your application's response time.

### Caching in memory (default)

By default, this library uses an in-memory cache to avoid requesting the same render more than once during the same request lifecycle. For example:

```js
const Client = require('@jahuty/jahuty').default;

const jahuty = new Client({ apiKey: YOUR_API_KEY });

// sends a synchronous API request; caches the result in memory; and, returns it
// to the caller
const render1 = jahuty.snippets.render(YOUR_SNIPPET_ID);

// this call skips sending an API request and uses the cached value instead.
const render2 = jahuty.snippets.render(YOUR_SNIPPET_ID);
```

The in-memory cache only persists for the duration of the original request. At the end of the request's lifecycle, the cache will be discarded. To store renders across requests, you need a persistent cache.

### Caching persistently

A persistent cache allows renders to be cached across multiple requests. This reduces the number of synchronous network requests to Jahuty's API and improves your application's average response time.

To configure Jahuty to use your persistent cache, pass a cache implementation to the client via the `cache` configuration option:

```js
const Client = require('@jahuty/jahuty').default;

const jahuty = new Client({ apiKey: YOUR_API_KEY, cache: CACHE_INSTANCE });
```

The persistent cache implementation you choose and configure is up to you. There are many libraries available, and most frameworks provide their own. At this time, we support any cache implementation which responds to `get(key)`/`set(key, value, ttl)` such as  [Keyv](https://www.npmjs.com/package/keyv).

### Expiring

There are three methods for configuring this library's time-to-live (`ttl`), the amount of time between when a render is stored and when it's considered stale. From lowest-to-highest precedence, the methods are:

1. configuring your caching implementation,
1. configuring this library's default `ttl`, and
1. configuring a render's `ttl`.

#### Configuring your caching implementation

You can usually configure your caching implementation with a default `ttl`. If no other `ttl` is configured, this library will defer to the caching implementation's default `ttl`.

#### Configuring this library's default `ttl`

You can configure a default `ttl` for all of this library's renders by passing an integer number of seconds via the client's `ttl` configuration option:

```js
const Client = require('@jahuty/jahuty').default;

const jahuty = new Client({
  apiKey: YOUR_API_KEY,
  cache: CACHE_INSTANCE,
  ttl: 60  // <- cache renders for 60 seconds
});
```

If this library's default `ttl` is set, it will take precedence over the default `ttl` of the caching implementation.

#### Configuring a render's `ttl`

You can configure `ttl` for individual renders by passing an integer number of seconds via the render method's `ttl` configuration option:

```js
const Client = require('@jahuty/jahuty').default;

// cache all renders five minutes
const jahuty = new Client({
  apiKey: YOUR_API_KEY,
  cache: CACHE_INSTANCE,
  ttl: 300
});

// except, cache this render for 60 seconds
const render = jahuty.snippets.render(YOUR_SNIPPET_ID, { ttl: 60 });

// except, cache the renders in this collection for 120 seconds
const renders = jahuty.snippets.allRenders('YOUR_TAG', { ttl: 120 });
```

If a render's `ttl` is set, it will take precedence over the library's default `ttl` and the caching implementation's `ttl`.

### Caching collections

By default, this library will cache the individual renders returned by the `allRenders` method:

```js
const Client = require('@jahuty/jahuty').default;

const jahuty = new Client({ apiKey: YOUR_API_KEY, cache: CACHE_INSTANCE });

// sends a network request, caches each render, and returns the collection
const renders = jahuty.snippets.allRenders('YOUR_TAG');

// if this render exists in the collection, the cached value will be used
// instead of sending a network request for the latest version
const render = jahuty.snippets.render(YOUR_SNIPPET_ID);
```

This is a powerful feature when combined with a persistent cache. Using the `allRenders()` method, you can render and cache an arbitrarily large chunk of content with a single network request. Since any subsequent call to `render` a snippet in the collection will use its cached version, you can reduce the number of network requests to load your content.

This method is even more powerful when combined with an asynchronous background job. When `allRenders()` can be called outside your request cycle periodically, you can turn your cache into your content storage mechanism. You can render and cache dynamic content as frequently as you like without any hit to your application's response time.

### Disabling caching

You can disable caching, even the default in-memory caching, by passing an `ttl` of zero (`0`) or a negative integer (e.g., `-1`) via any of the methods described above. For example:

```js
const Client = require('@jahuty/jahuty').default;

// disable all caching
const jahuty1 = new Client({ apiKey: YOUR_API_KEY, ttl: 0 });

// disable caching for a specific render
const jahuty2 = new Client({ apiKey: 'YOUR_API_KEY' });
jahuty2.snippets.render(1, { ttl: 0 });
```

## Handling errors

If [Jahuty's API](https://docs.jahuty.com/api) returns an error, a `BadResponse` error will be thrown:

```js
const Client = require('@jahuty/jahuty').default;

const jahuty = new Client({ apiKey: YOUR_API_KEY });

try {
  const render = await jahuty.snippets.render(YOUR_SNIPPET_ID, {
    params: { foo: "bar" },
  });
} catch (error) {
  if ('problem' in error) {
    // The API returned something besides 2xx status code. The error contains
    // a problem property with more information.
    console.error(error.problem);
  } else {
    // Something else went wrong. Perhaps the key is not set?
    console.error(error.message);
  }
}
```

## License

This library is licensed under the [MIT license](LICENSE).
