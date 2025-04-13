# Configuration

ts-slug offers a flexible configuration system to customize how your slugs are generated.

## Basic Configuration

You can customize slug generation by passing an options object:

```ts
import slug from 'ts-slug'

// Basic usage with default options
slug('Hello World') // 'hello-world'

// With custom options
slug('Hello World', {
  replacement: '_', // Replace spaces with underscores
  lower: true, // Convert to lowercase (default)
  trim: true, // Trim leading/trailing spaces (default)
})
// 'hello_world'
```

## Available Options

The `SlugOptions` interface provides several ways to customize slug behavior:

```ts
interface SlugOptions {
  // Character that replaces whitespace
  replacement?: string // Default: '-'

  // Custom character map for replacing special characters
  charmap?: Record<string, string>

  // Map for multi-character replacements
  multicharmap?: Record<string, string>

  // RegExp pattern to remove characters
  remove?: RegExp | null

  // Convert to lowercase
  lower?: boolean // Default: true

  // Trim leading/trailing whitespace
  trim?: boolean // Default: true

  // Slug mode: 'rfc3986' (strict) or 'pretty' (more readable)
  mode?: 'rfc3986' | 'pretty' // Default: 'rfc3986'

  // ISO locale code for locale-specific character mappings
  locale?: string

  // Use base64 fallback for strings that would result in empty slugs
  fallback?: boolean // Default: true

  // For debugging purposes
  debug?: boolean
}
```

## Modes

ts-slug supports two different modes:

```ts
// RFC 3986 mode (default) - adheres to URI standard
slug('Hello, World!', { mode: 'rfc3986' }) // 'hello-world'

// Pretty mode - allows more readable characters
slug('Hello, World!', { mode: 'pretty' }) // 'hello-world'
```

The main differences:

- `rfc3986`: Only allows characters defined in [RFC 3986](https://tools.ietf.org/html/rfc3986) URI standard
- `pretty`: Allows a wider range of characters for more readable slugs

## Locale Support

Configure locale-specific character mappings:

```ts
// Set German locale to handle umlauts
slug('Schöne Grüße', { locale: 'de' }) // 'schoene-gruesse'

// Ukrainian localization
slug('Привіт світ', { locale: 'uk' }) // 'pryvit-svit'
```

Currently supported locales:

- `bg`: Bulgarian
- `de`: German
- `sr`: Serbian
- `uk`: Ukrainian

## Default Settings

You can view or modify the default settings:

```ts
// View default character map
console.log(slug.defaults.charmap)

// View default mode
console.log(slug.defaults.mode) // 'rfc3986'

// Reset to original defaults
slug.reset()
```
