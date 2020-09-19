[![CircleCI](https://circleci.com/gh/jahuty/snippets-js/tree/master.svg?style=svg)](https://circleci.com/gh/jahuty/snippets-js/tree/master)

# jahuty-node

The Node SDK for [Jahuty's API](https://docs.jahuty.com/api)!

## Installation

Install the package with:

```
npm install stripe --save
# or
yarn add stripe
```

## Usage

Before use, the package needs to be configured with your [API key](https://docs.jahuty.com/api#authentication) (ideally, once during startup):

```js
import Jahuty from 'jahuty';

Jahuty.setKey('YOUR_API_KEY');
```

With the API key set, you can use the `Snippet.render()` method to render a snippet:

```js
import Snippet from 'jahuty/snippet';

// render the snippet and log it to the console
Snippet.render(YOUR_SNIPPET_ID).then((render) => {
  console.log(render);
});
```
