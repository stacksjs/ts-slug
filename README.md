<p align="center"><img src=".github/art/cover.jpg" alt="Social Card of this repo"></p>

[![npm version][npm-version-src]][npm-version-href]
[![GitHub Actions][github-actions-src]][github-actions-href]
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
<!-- [![npm downloads][npm-downloads-src]][npm-downloads-href] -->
<!-- [![Codecov][codecov-src]][codecov-href] -->

# ts-slug

A powerful TypeScript library for converting text strings into URL-friendly slugs. Whether you're building a blog, CMS, or any application that needs clean, normalized URLs, `ts-slug` provides a robust solution with excellent multilingual support.

## Features

`ts-slug` offers a range of powerful features:

- 🌍 **Unicode Support** - Handles special characters from any language
- 🔤 **Locale-specific Handling** - Special support for German, Bulgarian, Serbian, Ukrainian, and more
- ⚙️ **Highly Configurable** - Customize replacement characters, case sensitivity, and more
- 🔄 **Multiple Modes** - Choose between RFC 3986 compliant or pretty URL formats
- 📝 **TypeScript Native** - Full type definitions included
- 🪶 **Zero Dependencies** - Lightweight with no external dependencies
- 🧪 **Thoroughly Tested** - Comprehensive test suite ensures reliability

## Quick Example

```ts
import slug from 'ts-slug'
// alternatively
// import { slug } from 'ts-slug'

// Basic usage
slug('Hello World') // 'hello-world'

// With options
slug('Hello World', {
  replacement: '_',
  lower: false
}) // 'Hello_World'

// Multilingual support
slug('こんにちは世界') // 'konnichihasei-jie'
slug('Schöne Grüße', { locale: 'de' }) // 'schoene-gruesse'
```

## Installation

```bash
# npm
npm install ts-slug

# yarn
yarn add ts-slug

# pnpm
pnpm add ts-slug

# bun
bun install ts-slug
```

## Testing

```bash
bun test
```

## Changelog

Please see our [releases](https://github.com/stackjs/ts-slug/releases) page for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Community

For help, discussion about best practices, or any other conversation that would benefit from being searchable:

[Discussions on GitHub](https://github.com/stacksjs/ts-slug/discussions)

For casual chit-chat with others using this package:

[Join the Stacks Discord Server](https://discord.gg/stacksjs)

## Postcardware

"Software that is free, but hopes for a postcard." We love receiving postcards from around the world showing where Stacks is being used! We showcase them on our website too.

Our address: Stacks.js, 12665 Village Ln #2306, Playa Vista, CA 90094, United States 🌎

## Credits

- [@Trott](https://github.com/Trott) for the original [slug](https://github.com/Trott/slug) library

## Sponsors

We would like to extend our thanks to the following sponsors for funding Stacks development. If you are interested in becoming a sponsor, please reach out to us.

- [JetBrains](https://www.jetbrains.com/)
- [The Solana Foundation](https://solana.com/)

## License

The MIT License (MIT). Please see [LICENSE](LICENSE.md) for more information.

Made with 💙

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/ts-slug?style=flat-square
[npm-version-href]: https://npmjs.com/package/ts-slug
[github-actions-src]: https://img.shields.io/github/actions/workflow/status/stacksjs/ts-slug/ci.yml?style=flat-square&branch=main
[github-actions-href]: https://github.com/stacksjs/ts-slug/actions?query=workflow%3Aci

<!-- [codecov-src]: https://img.shields.io/codecov/c/gh/stacksjs/ts-slug/main?style=flat-square
[codecov-href]: https://codecov.io/gh/stacksjs/ts-slug -->
