# Slug Modes

ts-slug provides different modes for generating slugs, allowing you to choose between different levels of strictness and readability.

## Available Modes

The library currently supports two slug generation modes:

1. `rfc3986` (default): Strictly follows the RFC 3986 URI standard
2. `pretty`: More lenient, allowing certain special characters for improved readability

## RFC 3986 Mode

This is the default mode that strictly adheres to the [RFC 3986](https://tools.ietf.org/html/rfc3986) URI standard. It's the most compatible option for URLs across different systems.

```ts
import slug from 'ts-slug'

// Using RFC 3986 mode (default)
slug('Hello.World') // 'hello-world'
slug('file_name.txt') // 'file-name-txt'
slug('user@example.com') // 'user-example-com'
```

In RFC 3986 mode, only the following characters are allowed:

- Alphanumeric characters (`a-z`, `A-Z`, `0-9`)
- Unreserved special characters: `-`, `_`, `.`, `~`

All other characters are either removed or replaced according to the character map.

## Pretty Mode

The "pretty" mode is more lenient and allows certain special characters to remain in the slug, making it more readable in some contexts.

```ts
import slug from 'ts-slug'

// Using Pretty mode
slug('Hello.World', { mode: 'pretty' }) // 'hello.world'
slug('file_name.txt', { mode: 'pretty' }) // 'file_name.txt'
slug('10.5%', { mode: 'pretty' }) // '10.5%'
```

In pretty mode, a wider range of characters is allowed, but it's still sanitized for URL safety.

## Comparing the Modes

Here's a comparison of how different inputs are handled in each mode:

| Input             | rfc3986 (default)        | pretty                   |
|-------------------|--------------------------|--------------------------|
| `Hello.World`     | `hello-world`            | `hello.world`            |
| `file_name.txt`   | `file-name-txt`          | `file_name.txt`          |
| `price: $19.99`   | `price-19-99`            | `price-$19.99`           |
| `10+5=15`         | `10-5-15`                | `10+5=15`                |
| `user@example.com`| `user-example-com`       | `user@example.com`       |

## Setting the Mode

You can set the mode for individual slug operations:

```ts
// Set mode in options
slug('Hello.World', { mode: 'pretty' }) // 'hello.world'
```

You can also change the default mode for all operations:

```ts
// Change the default mode globally
slug.defaults.mode = 'pretty'

// Now all operations use pretty mode by default
slug('Hello.World') // 'hello.world'

// Reset to defaults
slug.reset()
```

## When to Use Each Mode

- **Use RFC 3986 mode (default)**:
  - When maximum compatibility is important
  - For URLs that need to work across all systems
  - When consistency is more important than readability

- **Use Pretty mode**:
  - For more human-readable slugs
  - When the slugs will be displayed to users
  - In controlled environments where you know the URLs will be handled correctly

## Mode Configuration

Each mode also comes with its own default settings for other slug options:

```ts
// View the configuration for RFC 3986 mode
console.log(slug.defaults.modes.rfc3986)

// View the configuration for Pretty mode
console.log(slug.defaults.modes.pretty)
```

These configurations can help you understand the exact differences between the modes.
