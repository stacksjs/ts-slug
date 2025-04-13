# Character Mapping

One of the core strengths of ts-slug is its comprehensive character mapping system. This allows the library to convert special characters, diacritics, and non-Latin scripts into URL-friendly alternatives.

## Default Character Map

ts-slug comes with an extensive built-in character map that handles most common scenarios:

```ts
import slug from 'ts-slug'

// Latin characters with diacritics
slug('café') // 'cafe'
slug('résumé') // 'resume'

// Greek characters
slug('Ελληνικά') // 'ellinika'

// Cyrillic characters
slug('Русский') // 'russkii'

// Turkish characters
slug('Türkçe') // 'turkce'

// And many more...
```

## Viewing the Default Map

You can inspect the default character map at any time:

```ts
// View the entire default character map
console.log(slug.charmap)
```

The character map is a simple JavaScript object where keys are the special characters and values are their ASCII replacements.

## Common Mappings

Here are some examples of common mappings included by default:

- Diacritics (accents): `é` → `e`, `ñ` → `n`, `ü` → `u`, etc.
- Currency symbols: `€` → `euro`, `£` → `pound`, `¥` → `yen`, etc.
- Math symbols: `∑` → `sum`, `∞` → `infinity`, `≠` → `inequality`, etc.
- Special punctuation: `«` → `<<`, `»` → `>>`, `‹` → `<`, `›` → `>`, etc.
- Special spaces and hyphens are normalized

## Adding Custom Mappings

If you need to add your own character mappings, you can do so using the `extend` method:

```ts
// Add custom character mappings
slug.extend({
  '☢': 'radioactive',
  '☣': 'biohazard',
  '♥': 'heart',
  '☕': 'coffee'
})

slug('I ♥ ☕') // 'i-heart-coffee'
```

## Multi-character Mapping

For more complex scenarios, you can use multi-character mapping to replace entire sequences:

```ts
const options = {
  multicharmap: {
    '&': 'and',
    '@': 'at',
    '©': '(c)',
    '®': '(r)',
    '℠': '(sm)'
  }
}

slug('Copyright © 2023', options) // 'copyright-(c)-2023'
```

This is particularly useful for common symbols that have well-known text representations.

## Resetting to Defaults

If you've made changes to the character map and want to revert to the original defaults:

```ts
// Reset all settings to defaults
slug.reset()
```
