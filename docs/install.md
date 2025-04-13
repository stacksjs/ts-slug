# Install

Installing `ts-slug` is easy. Simply pull it in via your package manager of choice.

## Package Managers

Choose your package manager of choice:

::: code-group

```sh [npm]
npm install --save ts-slug
# npm i ts-slug

# or, install as dev dependency
npm install --save-dev ts-slug
# npm i -d ts-slug
```

```sh [bun]
bun install ts-slug
# bun add ts-slug

# or, install as dev dependency
bun install --dev ts-slug
# bun add --dev ts-slug
# bun i -d ts-slug
```

```sh [pnpm]
pnpm add ts-slug

# or, install as dev dependency
pnpm add --save-dev ts-slug
# pnpm i -d ts-slug
```

```sh [yarn]
yarn add ts-slug

# or, install as dev dependency
yarn add --dev ts-slug
# yarn i -d ts-slug
```

:::

## Import into your project

You can import and use the library in your project:

```ts
// ESM
import slug from 'ts-slug'

// CommonJS
const slug = require('ts-slug')
```

Read more about how to use it in the [Usage](/usage) section of the documentation.

## TypeScript Support

`ts-slug` includes TypeScript declarations out of the box.

```ts
import type { SlugOptions } from 'ts-slug'
import slug from 'ts-slug'

const options: SlugOptions = {
  replacement: '-',
  lower: true
}

const result = slug('Hello World', options)
// result = 'hello-world'
```
