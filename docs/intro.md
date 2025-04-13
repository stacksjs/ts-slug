# Introduction to ts-slug

<p align="center"><img src="https://github.com/stacksjs/ts-slug/blob/main/.github/art/cover.jpg?raw=true" alt="Social Card of ts-slug"></p>

## What is ts-slug?

ts-slug is a powerful, TypeScript-first library for converting text strings into URL-friendly slugs. Whether you're building a blog, CMS, or any application that needs clean, normalized URLs, ts-slug provides a robust solution with excellent multilingual support.

## Key Features

- **Unicode Support**: Handles special characters from any language
- **Locale-specific Handling**: Special support for German, Bulgarian, Serbian, Ukrainian, and more
- **Customizable**: Configure replacement characters, case sensitivity, and more
- **Multiple Modes**: Choose between RFC 3986 compliant or pretty URL formats
- **TypeScript Native**: Full type definitions included
- **Zero Dependencies**: Lightweight with no external dependencies
- **Thoroughly Tested**: Comprehensive test suite ensures reliability

## Why Use Slugs?

Slugs are URL-friendly versions of text strings, commonly used for:

- **SEO-friendly URLs**: Improve search engine visibility with descriptive URLs
- **Readability**: Make your URLs human-readable and memorable
- **Compatibility**: Avoid special characters that might cause issues in URLs
- **Consistency**: Ensure uniform URL patterns across your application

## Quick Example

```ts
import slug from 'ts-slug'

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

## Getting Started

Ready to get started? Check out the [Installation](/install) guide or dive into the [Usage](/usage) examples.

## Changelog

Please see our [releases](https://github.com/stacksjs/ts-slug/releases) page for more information on what has changed recently.

## Contributing

Please review the [Contributing Guide](https://github.com/stacksjs/contributing) for details.

## Community

For help, discussion about best practices, or any other conversation that would benefit from being searchable:

[Discussions on GitHub](https://github.com/stacksjs/stacks/discussions)

For casual chit-chat with others using this package:

[Join the Stacks Discord Server](https://discord.gg/stacksjs)

## Postcardware

Stacks.js is completely free and open-source. We do love getting postcards from the places where our software is being used!

Our address: Stacks.js, 12665 Village Ln #2306, Playa Vista, CA 90094

## Credits

- [Chris Breuer](https://github.com/chrisbbreuer)
- [All Contributors](https://github.com/stacksjs/ts-slug/graphs/contributors)

## License

The MIT License (MIT). Please see [LICENSE](https://github.com/stacksjs/ts-slug/tree/main/LICENSE.md) for more information.

Made with 💙

<!-- Badges -->

<!-- [codecov-src]: https://img.shields.io/codecov/c/gh/stacksjs/rpx/main?style=flat-square
[codecov-href]: https://codecov.io/gh/stacksjs/rpx -->
