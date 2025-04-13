# Usage

ts-slug provides a straightforward way to convert strings into URL-friendly slugs. Here are some examples to get you started.

## Basic Usage

Import the library and start creating slugs:

```ts
import slug from 'ts-slug'

// Basic usage
slug('Hello World') // Output: 'hello-world'

// Custom replacement character
slug('Hello World', '_') // Output: 'hello_world'

// Using options object
slug('Hello World', {
  replacement: '.'
}) // Output: 'hello.world'
```

## Handling Special Characters

ts-slug automatically handles special characters, diacritics, and non-Latin scripts:

```ts
// Latin characters with diacritics (accents)
slug('café') // Output: 'cafe'

// Multiple languages
slug('你好，世界') // Output: 'ni-hao-shi-jie'
slug('こんにちは世界') // Output: 'konnichihasei-jie'
slug('안녕하세요') // Output: 'annyeonghaseyo'
slug('Привет, мир') // Output: 'priviet-mir'
slug('مرحبا بالعالم') // Output: 'mrhba-balalm'

// Special characters
slug('$pecial characters?!') // Output: 'pecial-characters'
```

## Configuration Options

You can customize the behavior with various options:

```ts
// Keep uppercase letters
slug('Hello World', { lower: false }) // Output: 'Hello-World'

// Preserve trailing dashes
slug(' Hello World ', { trim: false }) // Output: '-hello-world-'

// Customize character mappings
slug('10% Off Sale!', {
  charmap: { '%': 'percent' }
}) // Output: '10percent-off-sale'

// Custom removal pattern
slug('Hello 123 World', {
  remove: /\d/g
}) // Output: 'hello-world'
```

## Different Modes

ts-slug supports different modes for formatting:

```ts
// RFC 3986 mode (default) - only allows characters defined in the URI standard
slug('Hello.World', { mode: 'rfc3986' }) // Output: 'hello-world'

// Pretty mode - keeps some special characters
slug('Hello.World', { mode: 'pretty' }) // Output: 'hello.world'
```

## Locale Support

Customize for specific language requirements:

```ts
// German umlauts
slug('Schöne Grüße', { locale: 'de' }) // Output: 'schoene-gruesse'

// Bulgarian
slug('Здравей, свят', { locale: 'bg' }) // Output: 'zdravey-svyat'

// Ukrainian
slug('Привіт світ', { locale: 'uk' }) // Output: 'pryvit-svit'
```

## Advanced: Extending Functionality

You can extend the character map for custom mappings:

```ts
// Add custom character mappings
slug.extend({ '☢': 'radioactive' })

slug('Danger ☢') // Output: 'danger-radioactive'

// Reset all settings to defaults
slug.reset()
```

## Multi-Character Mapping

Define substitutions for entire character sequences:

```ts
// Define complex multi-character mappings
const options = {
  multicharmap: {
    '&': 'and',
    '@': 'at',
    '©': '(c)',
    '®': '(r)',
    '℠': '(sm)'
  }
}

slug('Copyright © 2023', options) // Output: 'copyright-(c)-2023'
slug('Contact us @ our office', options) // Output: 'contact-us-at-our-office'
```
