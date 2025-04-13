# Handling Special Cases

While ts-slug handles most slug generation scenarios automatically, there are some special cases that require additional attention.

## Empty Slugs and Fallback Behavior

By default, if a string would result in an empty slug (for example, a string containing only special characters), ts-slug uses a base64 encoding as a fallback:

```ts
import slug from 'ts-slug'

// String with only special characters
slug('★☆♿☢☎♨') // Without fallback, this would be empty
// Results in a base64 encoded fallback like: 'kiffe44odb-kldkc38'
```

You can disable this behavior if you prefer empty strings to remain empty:

```ts
// Disable fallback
slug('★☆♿☢☎♨', { fallback: false }) // ''
```

## Preserving Case

By default, slugs are converted to lowercase, but you can preserve the original case:

```ts
// Default behavior (lowercase)
slug('Hello World') // 'hello-world'

// Preserve case
slug('Hello World', { lower: false }) // 'Hello-World'
```

This is particularly useful for names or identifiers where case is meaningful.

## Customizing Removal Patterns

The `remove` option allows you to specify a RegExp pattern to remove specific characters or patterns:

```ts
// Remove all numbers
slug('Hello 123 World', { remove: /\d/g }) // 'hello-world'

// Remove specific words or patterns
slug('Hello (private) World', { remove: /\(private\)/g }) // 'hello-world'
```

This is powerful for content filtering or specializing slug behavior for specific domains.

## Working with Multi-byte Characters and Emoji

ts-slug handles multi-byte characters like emoji properly, but you may want to customize how they're represented:

```ts
// Default behavior for emoji
slug('I ❤️ coding') // 'i-coding' (emoji removed by default)

// Custom mapping for emoji
const options = {
  charmap: {
    '❤️': 'heart',
    '👍': 'thumbs-up',
    '🚀': 'rocket'
  }
}

slug('I ❤️ coding 🚀', options) // 'i-heart-coding-rocket'
```

## Handling URLs and Paths

When dealing with full URLs or file paths, you might want different handling:

```ts
// Default behavior with URLs
slug('https://example.com/page?query=value') // 'https-example-com-page-query-value'

// For specific URL components, pre-process the string
const url = new URL('https://example.com/page?query=value')
slug(url.pathname) // 'page'
```

## Debugging Slug Generation

For troubleshooting complex cases, use the debug option:

```ts
// Enable debug mode to see how characters are processed
slug('Hello 世界', { debug: true })
// Returns detailed information about code points and processing
```

This is particularly useful when working with non-Latin scripts or when extending the library.

## Long Text and Performance

For very long strings, consider truncating before slugifying for better performance and usability:

```ts
// Function to create a slug from a potentially long text
function createSlugFromLongText(text, maxLength = 100) {
  // Truncate the text before slugifying
  const truncated = text.length > maxLength
    ? `${text.substring(0, maxLength).trim()}...`
    : text

  return slug(truncated)
}

// Usage
const longText = 'This is a very long text that might continue for several paragraphs...'
createSlugFromLongText(longText, 20) // 'this-is-a-very-long...'
```

## Creating Safe IDs

When creating HTML IDs from user input, slugs are a great way to ensure safety:

```ts
// Creating a safe ID from user input
function createSafeId(input, prefix = 'id-') {
  return prefix + slug(input)
}

// Usage
createSafeId('User Input: Hello!') // 'id-user-input-hello'
```

This ensures valid HTML IDs while preserving readability.

## Edge Case: Purely Numeric Slugs

Be cautious with purely numeric inputs if you need to maintain a specific format:

```ts
// Default behavior with numbers
slug('12345') // '12345'

// If you need to ensure non-numeric IDs
function ensureNonNumericSlug(input, prefix = 'item-') {
  const slugged = slug(input)
  return /^\d+$/.test(slugged) ? prefix + slugged : slugged
}

// Usage
ensureNonNumericSlug('12345') // 'item-12345'
ensureNonNumericSlug('Hello') // 'hello'
```

This is useful when slugs are used as identifiers in systems that require non-numeric keys.
