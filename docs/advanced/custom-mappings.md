# Custom Mappings

While ts-slug ships with an extensive character mapping system, there are cases where you might need to create your own custom mappings for special use cases.

## Extending the Character Map

The simplest way to add your own character mappings is to use the `extend` method:

```ts
import slug from 'ts-slug'

// Add custom character mappings
slug.extend({
  // Emoji mappings
  '😀': 'smile',
  '👍': 'thumbs-up',
  '❤️': 'heart',

  // Special symbols
  '℃': 'celsius',
  '℉': 'fahrenheit',
  '₿': 'bitcoin',

  // Replace or override existing mappings
  '@': 'at'
})
```

Once added, these mappings will be used in all subsequent slug operations:

```ts
slug('I 👍 this!') // 'i-thumbs-up-this'
slug('Temperature: 22℃') // 'temperature-22-celsius'
```

## Creating Multi-character Mappings

For more complex scenarios, you can use multi-character mappings to replace entire character sequences:

```ts
// Define options with custom multi-character mappings
const options = {
  multicharmap: {
    '&': 'and',
    '@': 'at',
    '©': '(c)',
    '®': '(r)',
    '℠': '(sm)',
    '™': '(tm)',
    '→': 'to',
    '←': 'from',
    '♥': 'love'
  }
}

// Use in specific slug operations
slug('A → B', options) // 'a-to-b'
slug('I ♥ coding', options) // 'i-love-coding'
```

## Overriding Default Mappings

You can override the default character mappings by extending with your own replacements:

```ts
// Override standard mappings
slug.extend({
  ä: 'a', // Default would be 'ae' for German
  ö: 'o', // Default would be 'oe' for German
  ü: 'u' // Default would be 'ue' for German
})

// Now it will use your mappings
slug('Schöne Grüße') // 'schone-grusse' instead of 'schoene-gruesse'
```

## Locale-specific Custom Mappings

When working with specific languages, it may be more appropriate to use the locale option rather than extending the global character map:

```ts
// Define custom options with locale
const options = {
  locale: 'de',
  // You can still add additional custom mappings
  charmap: {
    '§': 'paragraph',
    '€': 'euro'
  }
}

slug('§100 → €80', options) // 'paragraph100-to-euro80'
```

## Creating a Complete Custom Mapping Set

For maximum control, you can create a completely custom mapping by overriding the defaults:

```ts
// Save the original defaults
const originalDefaults = Object.assign({}, slug.defaults)

// Replace with your own mapping system
slug.defaults.charmap = {
  // Your custom mappings only
  a: '4',
  e: '3',
  i: '1',
  o: '0',
  s: '5',
  t: '7'
}

// Now slugs will use your custom "leet speak" mapping
slug('testing') // '73571ng'

// Restore the original defaults when done
slug.defaults = originalDefaults
// Or simply use reset()
slug.reset()
```

## Best Practices

When creating custom mappings, consider these best practices:

1. **Be consistent**: Use a consistent style for all your mappings
2. **Avoid conflicts**: Ensure your mappings don't create ambiguous results
3. **Keep it readable**: The purpose of slugs is to be both machine and human-readable
4. **Test thoroughly**: Always test your custom mappings with a variety of inputs
5. **Document your changes**: Make sure to document any custom mappings for future reference

## Persistent Customizations

To make your custom mappings persistent across your application:

```ts
// Create a custom slug function with your mappings
function createCustomSlug() {
  // Start with a fresh instance
  const customSlug = slug

  // Add your custom mappings
  customSlug.extend({
    // Your mappings here
    '☢': 'radioactive',
    '☣': 'biohazard'
  })

  return customSlug
}

// Use your custom slug function throughout your application
const mySlug = createCustomSlug()
mySlug('Warning: ☢ Area') // 'warning-radioactive-area'
```
