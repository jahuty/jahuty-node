[![CircleCI](https://circleci.com/gh/jahuty/jahuty-node.svg?style=svg)](https://circleci.com/gh/jahuty/jahuty-node) [![codecov](https://codecov.io/gh/jahuty/jahuty-node/branch/master/graph/badge.svg?token=3NBRW34P6N)](https://codecov.io/gh/jahuty/jahuty-node) [![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

# jahuty-node

The Node.js SDK provides convenient access to the [Jahuty API](https://docs.jahuty.com/api) from applications written in server-side JavaScript.

## Requirements

This library requires Node 10+. It may work with earlier versions but has not been tested.

## Installation

Install the package with:

```
npm install jahuty --save
# or
yarn add jahuty
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

You can [pass parameters](https://docs.jahuty.com/liquid/parameters) into your snippet using the options hash and the params key:

```js
const Client = require('@jahuty/jahuty').default;

const jahuty = new Client({ apiKey: YOUR_API_KEY });

const render = await jahuty.snippets.render(YOUR_SNIPPET_ID, {
  params: { foo: "bar" },
});

console.log(render.content);
```

The parameters above would be equivalent to [assigning the variables](https://www.jahuty.com/docs/assigning-a-variable) below in your snippet:

```
{% assign foo = "bar" %}
```

## Errors

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
