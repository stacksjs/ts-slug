# Localization

ts-slug provides specialized handling for various languages through its locale system. This allows for more natural and language-specific slug generation.

## Supported Locales

The library currently includes built-in support for the following locales:

- `bg`: Bulgarian
- `de`: German
- `sr`: Serbian
- `uk`: Ukrainian

Each locale defines specific character mappings tailored to that language's writing system and conventions.

## Using Locales

To use a locale, simply specify it in the options:

```ts
import slug from 'ts-slug'

// German - convert umlauts according to German convention
slug('Schöne Grüße', { locale: 'de' }) // 'schoene-gruesse'

// Bulgarian
slug('Здравей, свят', { locale: 'bg' }) // 'zdravey-svyat'

// Serbian
slug('Здраво свете', { locale: 'sr' }) // 'zdravo-svete'

// Ukrainian
slug('Привіт світ', { locale: 'uk' }) // 'pryvit-svit'
```

## How Localization Works

Each locale contains a set of character mappings specific to that language. These mappings take precedence over the global character map for characters that appear in both.

### Example: German Localization

German uses special mappings for umlauts that follow German orthographic conventions:

```ts
// German locale mappings
{
  'Ä': 'AE', 'ä': 'ae',
  'Ö': 'OE', 'ö': 'oe',
  'Ü': 'UE', 'ü': 'ue'
}
```

This ensures that German text is transliterated according to German conventions:

```ts
slug('Über', { locale: 'de' }) // 'ueber' (not 'uber')
```

### Example: Bulgarian Localization

Bulgarian uses a specialized Cyrillic-to-Latin transliteration scheme:

```ts
// Bulgarian locale mappings
{
  'Й': 'Y', 'й': 'y',
  'X': 'H', 'x': 'h',
  'Ц': 'Ts', 'ц': 'ts',
  'Щ': 'Sht', 'щ': 'sht',
  'Ъ': 'A', 'ъ': 'a',
  'Ь': 'Y', 'ь': 'y'
}
```

## Setting a Default Locale

You can set a default locale for all slug operations using the `setLocale` method:

```ts
// Set German as the default locale
slug.setLocale('de')

// Now all operations will use German locale by default
slug('Schöne Grüße') // 'schoene-gruesse'
```

## Extending Locale Support

If you need to add support for additional locales, you can extend the basic character map with your own mappings:

```ts
// Add basic Portuguese support
slug.extend({
  ã: 'a',
  Ã: 'A',
  õ: 'o',
  Õ: 'O',
  ç: 'c',
  Ç: 'C'
})

// Use it
slug('São Paulo, Brasil') // 'sao-paulo-brasil'
```

## Locale vs Global Character Map

The locale-specific character mappings take precedence over the global character map. If a character isn't found in the locale's mappings, the system falls back to the global character map.
