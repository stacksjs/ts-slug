# API Reference

This page provides a comprehensive reference for the ts-slug API.

## Core Function

### slug(string, options)

The main function that converts a string to a slug.

**Parameters:**

- `string` (string): The input string to convert to a slug
- `options` (string | SlugOptions): Either a string specifying the replacement character, or a SlugOptions object

**Returns:**

- (string): The slugified version of the input string

**Examples:**

```ts
import slug from 'ts-slug'

// Basic usage
slug('Hello World') // 'hello-world'

// With replacement string
slug('Hello World', '_') // 'hello_world'

// With options object
slug('Hello World', { replacement: '.', lower: false }) // 'Hello.World'
```

## SlugOptions Interface

```ts
interface SlugOptions {
  // Character that replaces spaces
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
  debug?: boolean // Default: false
}
```

## Properties

### slug.defaults

Object containing default settings for the slug function.

```ts
// Default settings structure
interface SlugDefaults {
  charmap: Record<string, string>
  multicharmap: Record<string, string>
  mode: 'rfc3986' | 'pretty'
  modes: {
    rfc3986: SlugOptions
    pretty: SlugOptions
  }
  fallback: boolean
}

// Example: View default mode
console.log(slug.defaults.mode) // 'rfc3986'

// Example: View default character map
console.log(slug.defaults.charmap)
```

### slug.charmap

Direct access to the current character map for single-character replacements.

```ts
// View current character map
console.log(slug.charmap)

// Character map is an object mapping special characters to their replacements
// Example subset: { 'à': 'a', 'á': 'a', 'â': 'a', ... }
```

### slug.multicharmap

Direct access to the current multi-character map.

```ts
// View current multi-character map
console.log(slug.multicharmap)

// Example: { 'ユニコード': 'unicode', ... }
```

## Methods

### slug.reset()

Resets all settings to their original defaults.

**Parameters:** None

**Returns:** None

**Example:**

```ts
// After making changes to defaults
slug.defaults.mode = 'pretty'
slug.extend({ '@': 'at' })

// Reset to original defaults
slug.reset()
```

### slug.extend(customMap)

Extends the character map with custom mappings.

**Parameters:**

- `customMap` (Record<string, string>): Object containing character to replacement mappings

**Returns:** None

**Example:**

```ts
// Add custom mappings
slug.extend({
  '☢': 'radioactive',
  '☣': 'biohazard',
  '♥': 'heart'
})

slug('Warning: ☢') // 'warning-radioactive'
```

### slug.setLocale(locale)

Sets the default locale for character mappings.

**Parameters:**

- `locale` (string): ISO locale code ('de', 'bg', 'sr', 'uk', etc.)

**Returns:** None

**Example:**

```ts
// Set German as default locale
slug.setLocale('de')

// Now German-specific mappings are used by default
slug('Schöne Grüße') // 'schoene-gruesse'
```

## TypeScript Types

ts-slug includes TypeScript definitions for all its functionality:

### SlugFunction

The type of the main slug function with its properties and methods.

```ts
interface SlugFunction {
  (string: string, opts?: SlugOptions | string): string
  charmap: Record<string, string>
  multicharmap: Record<string, string>
  defaults: SlugDefaults
  reset: () => void
  extend: (customMap: Record<string, string>) => void
  setLocale: (locale: string) => void
}
```

### SlugModes

The different modes available for slug generation.

```ts
interface SlugModes {
  rfc3986: SlugOptions
  pretty: SlugOptions
}
```

## Error Handling

The slug function throws an error if the input is not a string:

```ts
// This will throw: "slug() requires a string argument, received object"
slug({ foo: 'bar' })
```

For other cases, the function tries to be permissive and does not throw errors even with malformed input.

## Internal Implementation Details

For those needing to understand how ts-slug works internally:

1. The input string is processed character by character
2. Multi-character maps are checked first, looking for longest matches
3. Single-character maps are applied, with locale-specific maps taking precedence
4. Space and disallowed characters are replaced according to the mode
5. Leading/trailing replacement characters are trimmed (if `trim: true`)
6. Case is converted (if `lower: true`)
7. If the result is empty and `fallback: true`, a base64 encoding of the input is used instead

This process ensures efficient and consistent slug generation across a wide variety of inputs.
