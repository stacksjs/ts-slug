import { beforeEach, describe, expect, it } from 'bun:test'
import slug from '../src/slug'

describe('slug', () => {
  beforeEach(slug.reset)

  it('requires an argument', () => {
    // @ts-expect-error - Intentionally testing with no arguments
    expect(() => slug()).toThrow(/slug\(\) requires a string argument/)
  })

  it('should replace whitespaces with replacement', () => {
    expect(slug('foo bar baz')).toBe('foo-bar-baz')
    expect(slug('foo bar baz', '_')).toBe('foo_bar_baz')
    expect(slug('foo bar baz', '')).toBe('foobarbaz')
  })

  it('should replace multiple spaces and dashes with a single instance', () => {
    expect(slug('foo  bar--baz')).toBe('foo-bar-baz')
  })

  it('should remove trailing space if any', () => {
    expect(slug(' foo bar baz ')).toBe('foo-bar-baz')
  })

  it('should preserve leading/trailing replacement characters if option set', () => {
    expect(slug(' foo bar baz ', { trim: false })).toBe('-foo-bar-baz-')
  })

  it('should remove punctuation by default', () => {
    const punctuation = ['*', '_', '+', '~', '.', ',', '[', ']', '(', ')', '\'', '"', '!', ':', '@']
    punctuation.forEach((symbol) => {
      expect(slug(`foo ${symbol} bar baz`)).toBe('foo-bar-baz')
    })
    expect(slug('foo_bar. -baz!')).toBe('foobar-baz')
    expect(slug('foo_bar-baz_bing!', { replacement: '_' })).toBe('foo_barbaz_bing')
  })

  it('should consolidate hyphen and space chars', () => {
    expect(slug('foo- bar baz')).toBe('foo-bar-baz')
  })

  it('should leave allowed chars in rfc3986 mode', () => {
    const allowed = ['.', '_', '~']
    allowed.forEach((a) => {
      expect(slug(`foo ${a} bar baz`, { mode: 'rfc3986' })).toBe(`foo-${a}-bar-baz`)
    })
  })

  it('should preserve punctuation added to charmap', () => {
    slug.charmap._ = '_'
    expect(slug('foo_bar baz')).toBe('foo_bar-baz')
  })

  it('should replace latin chars', () => {
    const charMap = {
      À: 'A',
      Á: 'A',
      Â: 'A',
      Ã: 'A',
      Ä: 'A',
      Å: 'A',
      Æ: 'AE',
      Ç: 'C',
      È: 'E',
      É: 'E',
      Ê: 'E',
      Ë: 'E',
      Ì: 'I',
      Í: 'I',
      Î: 'I',
      Ï: 'I',
      Ð: 'D',
      Ñ: 'N',
      Ò: 'O',
      Ó: 'O',
      Ô: 'O',
      Õ: 'O',
      Ö: 'O',
      Ő: 'O',
      Ø: 'O',
      Ù: 'U',
      Ú: 'U',
      Û: 'U',
      Ü: 'U',
      Ű: 'U',
      Ý: 'Y',
      Þ: 'TH',
      ß: 'ss',
      à: 'a',
      á: 'a',
      â: 'a',
      ã: 'a',
      ä: 'a',
      å: 'a',
      æ: 'ae',
      ç: 'c',
      è: 'e',
      é: 'e',
      ê: 'e',
      ë: 'e',
      ì: 'i',
      í: 'i',
      î: 'i',
      ï: 'i',
      ð: 'd',
      ñ: 'n',
      ò: 'o',
      ó: 'o',
      ô: 'o',
      õ: 'o',
      ö: 'o',
      ő: 'o',
      ø: 'o',
      Œ: 'OE',
      œ: 'oe',
      ù: 'u',
      ú: 'u',
      û: 'u',
      ü: 'u',
      ű: 'u',
      ý: 'y',
      þ: 'th',
      ÿ: 'y',
      ẞ: 'SS',
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char as keyof typeof charMap]
      expect(slug(`foo ${char} bar baz`)).toBe(`foo-${replacement.toLowerCase()}-bar-baz`)
    }
  })

  it('should replace greek chars', () => {
    const charMap = {
      α: 'a',
      β: 'b',
      γ: 'g',
      δ: 'd',
      ε: 'e',
      ζ: 'z',
      η: 'h',
      θ: 'th',
      ι: 'i',
      κ: 'k',
      λ: 'l',
      μ: 'm',
      ν: 'n',
      ξ: '3',
      ο: 'o',
      π: 'p',
      ρ: 'r',
      σ: 's',
      τ: 't',
      υ: 'y',
      φ: 'f',
      χ: 'x',
      ψ: 'ps',
      ω: 'w',
      ά: 'a',
      έ: 'e',
      ί: 'i',
      ό: 'o',
      ύ: 'y',
      ή: 'h',
      ώ: 'w',
      ς: 's',
      ϊ: 'i',
      ΰ: 'y',
      ϋ: 'y',
      ΐ: 'i',
      Α: 'A',
      Β: 'B',
      Γ: 'G',
      Δ: 'D',
      Ε: 'E',
      Ζ: 'Z',
      Η: 'H',
      Θ: 'Th',
      Ι: 'I',
      Κ: 'K',
      Λ: 'L',
      Μ: 'M',
      Ν: 'N',
      Ξ: '3',
      Ο: 'O',
      Π: 'P',
      Ρ: 'R',
      Σ: 'S',
      Τ: 'T',
      Υ: 'Y',
      Φ: 'F',
      Χ: 'X',
      Ψ: 'PS',
      Ω: 'W',
      Ά: 'A',
      Έ: 'E',
      Ί: 'I',
      Ό: 'O',
      Ύ: 'Y',
      Ή: 'H',
      Ώ: 'W',
      Ϊ: 'I',
      Ϋ: 'Y',
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char as keyof typeof charMap]
      expect(slug(`foo ${char} bar baz`)).toBe(`foo-${replacement.toLowerCase()}-bar-baz`)
    }
  })

  it('should replace turkish chars', () => {
    const charMap = {
      ş: 's',
      Ş: 'S',
      ı: 'i',
      İ: 'I',
      ç: 'c',
      Ç: 'C',
      ü: 'u',
      Ü: 'U',
      ö: 'o',
      Ö: 'O',
      ğ: 'g',
      Ğ: 'G',
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char as keyof typeof charMap]
      expect(slug(`foo ${char} bar baz`)).toBe(`foo-${replacement.toLowerCase()}-bar-baz`)
    }
  })

  it('should replace cyrillic chars', () => {
    const charMap = {
      а: 'a',
      б: 'b',
      в: 'v',
      г: 'g',
      д: 'd',
      е: 'e',
      ё: 'yo',
      ж: 'zh',
      з: 'z',
      и: 'i',
      й: 'j',
      к: 'k',
      л: 'l',
      м: 'm',
      н: 'n',
      о: 'o',
      п: 'p',
      р: 'r',
      с: 's',
      т: 't',
      у: 'u',
      ф: 'f',
      х: 'h',
      ц: 'c',
      ч: 'ch',
      ш: 'sh',
      щ: 'sh',
      ъ: 'u',
      ы: 'y',
      ь: '',
      э: 'e',
      ю: 'yu',
      я: 'ya',
      А: 'A',
      Б: 'B',
      В: 'V',
      Г: 'G',
      Д: 'D',
      Е: 'E',
      Ё: 'Yo',
      Ж: 'Zh',
      З: 'Z',
      И: 'I',
      Й: 'J',
      К: 'K',
      Л: 'L',
      М: 'M',
      Н: 'N',
      О: 'O',
      П: 'P',
      Р: 'R',
      С: 'S',
      Т: 'T',
      У: 'U',
      Ф: 'F',
      Х: 'H',
      Ц: 'C',
      Ч: 'Ch',
      Ш: 'Sh',
      Щ: 'Sh',
      Ъ: 'U',
      Ы: 'Y',
      Ь: '',
      Э: 'E',
      Ю: 'Yu',
      Я: 'Ya',
      Є: 'Ye',
      І: 'I',
      Ї: 'Yi',
      Ґ: 'G',
      є: 'ye',
      і: 'i',
      ї: 'yi',
      ґ: 'g',
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char as keyof typeof charMap]
      let expected = `foo-${replacement.toLowerCase()}-bar-baz`
      if (!replacement) {
        expected = 'foo-bar-baz'
      }
      expect(slug(`foo ${char} bar baz`)).toBe(expected)
    }
  })

  it('should replace czech chars', () => {
    const charMap = {
      č: 'c',
      ď: 'd',
      ě: 'e',
      ň: 'n',
      ř: 'r',
      š: 's',
      ť: 't',
      ů: 'u',
      ž: 'z',
      Č: 'C',
      Ď: 'D',
      Ě: 'E',
      Ň: 'N',
      Ř: 'R',
      Š: 'S',
      Ť: 'T',
      Ů: 'U',
      Ž: 'Z',
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char as keyof typeof charMap]
      expect(slug(`foo ${char} bar baz`)).toBe(`foo-${replacement.toLowerCase()}-bar-baz`)
    }
  })

  it('should replace slovak chars', () => {
    const charMap = {
      á: 'a',
      ä: 'a',
      č: 'c',
      ď: 'd',
      é: 'e',
      í: 'i',
      ľ: 'l',
      ĺ: 'l',
      ň: 'n',
      ó: 'o',
      ô: 'o',
      ŕ: 'r',
      š: 's',
      ť: 't',
      ú: 'u',
      ý: 'y',
      ž: 'z',
      Á: 'a',
      Ä: 'A',
      Č: 'C',
      Ď: 'D',
      É: 'E',
      Í: 'I',
      Ľ: 'L',
      Ĺ: 'L',
      Ň: 'N',
      Ó: 'O',
      Ô: 'O',
      Ŕ: 'R',
      Š: 'S',
      Ť: 'T',
      Ú: 'U',
      Ý: 'Y',
      Ž: 'Z',
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char as keyof typeof charMap]
      expect(slug(`foo ${char} bar baz`)).toBe(`foo-${replacement.toLowerCase()}-bar-baz`)
    }
  })

  it('should replace polish chars', () => {
    const charMap = {
      ą: 'a',
      ć: 'c',
      ę: 'e',
      ł: 'l',
      ń: 'n',
      ó: 'o',
      ś: 's',
      ź: 'z',
      ż: 'z',
      Ą: 'A',
      Ć: 'C',
      Ę: 'E',
      Ł: 'L',
      Ń: 'N',
      Ś: 'S',
      Ź: 'Z',
      Ż: 'Z',
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char as keyof typeof charMap]
      expect(slug(`foo ${char} bar baz`)).toBe(`foo-${replacement.toLowerCase()}-bar-baz`)
    }
  })

  it('should replace latvian chars', () => {
    const charMap = {
      ā: 'a',
      č: 'c',
      ē: 'e',
      ģ: 'g',
      ī: 'i',
      ķ: 'k',
      ļ: 'l',
      ņ: 'n',
      š: 's',
      ū: 'u',
      ž: 'z',
      Ā: 'A',
      Č: 'C',
      Ē: 'E',
      Ģ: 'G',
      Ī: 'I',
      Ķ: 'K',
      Ļ: 'L',
      Ņ: 'N',
      Š: 'S',
      Ū: 'U',
      Ž: 'Z',
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char as keyof typeof charMap]
      expect(slug(`foo ${char} bar baz`)).toBe(`foo-${replacement.toLowerCase()}-bar-baz`)
    }
  })

  it('should replace vietnamese chars', () => {
    const charMap = {
      Ạ: 'A',
      Ả: 'A',
      Ầ: 'A',
      Ấ: 'A',
      Ậ: 'A',
      Ẩ: 'A',
      Ẫ: 'A',
      Ằ: 'A',
      Ắ: 'A',
      Ặ: 'A',
      Ẳ: 'A',
      Ẵ: 'A',
      Ẹ: 'E',
      Ẻ: 'E',
      Ẽ: 'E',
      Ề: 'E',
      Ế: 'E',
      Ệ: 'E',
      Ể: 'E',
      Ễ: 'E',
      Ị: 'I',
      Ỉ: 'I',
      Ĩ: 'I',
      Ọ: 'O',
      Ỏ: 'O',
      Ồ: 'O',
      Ố: 'O',
      Ộ: 'O',
      Ổ: 'O',
      Ỗ: 'O',
      Ơ: 'O',
      Ờ: 'O',
      Ớ: 'O',
      Ợ: 'O',
      Ở: 'O',
      Ỡ: 'O',
      Ụ: 'U',
      Ủ: 'U',
      Ũ: 'U',
      Ư: 'U',
      Ừ: 'U',
      Ứ: 'U',
      Ự: 'U',
      Ử: 'U',
      Ữ: 'U',
      Ỳ: 'Y',
      Ỵ: 'Y',
      Ỷ: 'Y',
      Ỹ: 'Y',
      Đ: 'D',
      ạ: 'a',
      ả: 'a',
      ầ: 'a',
      ấ: 'a',
      ậ: 'a',
      ẩ: 'a',
      ẫ: 'a',
      ằ: 'a',
      ắ: 'a',
      ặ: 'a',
      ẳ: 'a',
      ẵ: 'a',
      ẹ: 'e',
      ẻ: 'e',
      ẽ: 'e',
      ề: 'e',
      ế: 'e',
      ệ: 'e',
      ể: 'e',
      ễ: 'e',
      ị: 'i',
      ỉ: 'i',
      ĩ: 'i',
      ọ: 'o',
      ỏ: 'o',
      ồ: 'o',
      ố: 'o',
      ộ: 'o',
      ổ: 'o',
      ỗ: 'o',
      ơ: 'o',
      ờ: 'o',
      ớ: 'o',
      ợ: 'o',
      ở: 'o',
      ỡ: 'o',
      ụ: 'u',
      ủ: 'u',
      ũ: 'u',
      ư: 'u',
      ừ: 'u',
      ứ: 'u',
      ự: 'u',
      ử: 'u',
      ữ: 'u',
      ỳ: 'y',
      ỵ: 'y',
      ỷ: 'y',
      ỹ: 'y',
      đ: 'd',
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char as keyof typeof charMap]
      expect(slug(`foo ${char} bar baz`)).toBe(`foo-${replacement.toLowerCase()}-bar-baz`)
    }
  })

  it('should replace kazakh chars', () => {
    const charMap = {
      Ә: 'AE',
      ә: 'ae',
      Ғ: 'GH',
      ғ: 'gh',
      Қ: 'KH',
      қ: 'kh',
      Ң: 'NG',
      ң: 'ng',
      Ү: 'UE',
      ү: 'ue',
      Ұ: 'U',
      ұ: 'u',
      Һ: 'H',
      һ: 'h',
      Ө: 'OE',
      ө: 'oe',
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char as keyof typeof charMap]
      expect(slug(`foo ${char} bar baz`)).toBe(`foo-${replacement.toLowerCase()}-bar-baz`)
    }
  })

  it('should replace hindi chars', () => {
    const charMap = {
      अ: 'a',
      आ: 'aa',
      ए: 'e',
      ई: 'ii',
      ऍ: 'ei',
      ऎ: 'ae',
      ऐ: 'ai',
      इ: 'i',
      ओ: 'o',
      ऑ: 'oi',
      ऒ: 'oii',
      ऊ: 'uu',
      औ: 'ou',
      उ: 'u',
      ब: 'B',
      भ: 'Bha',
      च: 'Ca',
      छ: 'Chha',
      ड: 'Da',
      ढ: 'Dha',
      फ: 'Fa',
      फ़: 'Fi',
      ग: 'Ga',
      घ: 'Gha',
      ग़: 'Ghi',
      ह: 'Ha',
      ज: 'Ja',
      झ: 'Jha',
      क: 'Ka',
      ख: 'Kha',
      ख़: 'Khi',
      ल: 'L',
      ळ: 'Li',
      ऌ: 'Li',
      ऴ: 'Lii',
      ॡ: 'Lii',
      म: 'Ma',
      न: 'Na',
      ङ: 'Na',
      ञ: 'Nia',
      ण: 'Nae',
      ऩ: 'Ni',
      ॐ: 'oms',
      प: 'Pa',
      क़: 'Qi',
      र: 'Ra',
      ऋ: 'Ri',
      ॠ: 'Ri',
      ऱ: 'Ri',
      स: 'Sa',
      श: 'Sha',
      ष: 'Shha',
      ट: 'Ta',
      त: 'Ta',
      ठ: 'Tha',
      द: 'Tha',
      थ: 'Tha',
      ध: 'Thha',
      ड़: 'ugDha',
      ढ़: 'ugDhha',
      व: 'Va',
      य: 'Ya',
      य़: 'Yi',
      ज़: 'Za',
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char as keyof typeof charMap]
      expect(slug(`foo ${char} bar baz`)).toBe(`foo-${replacement.toLowerCase()}-bar-baz`)
    }
  })

  it('should replace azerbaijani chars', () => {
    const charMap = {
      ç: 'c',
      ə: 'e',
      ğ: 'g',
      ı: 'i',
      ö: 'o',
      ş: 's',
      ü: 'u',
      Ç: 'C',
      Ə: 'E',
      Ğ: 'G',
      İ: 'I',
      Ö: 'O',
      Ş: 'S',
      Ü: 'U',
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char as keyof typeof charMap]
      expect(slug(`foo ${char} bar baz`)).toBe(`foo-${replacement.toLowerCase()}-bar-baz`)
    }
  })

  it('should replace georgian chars', () => {
    const charMap = {
      ა: 'a',
      ბ: 'b',
      გ: 'g',
      დ: 'd',
      ე: 'e',
      ვ: 'v',
      ზ: 'z',
      თ: 't',
      ი: 'i',
      კ: 'k',
      ლ: 'l',
      მ: 'm',
      ნ: 'n',
      ო: 'o',
      პ: 'p',
      ჟ: 'zh',
      რ: 'r',
      ს: 's',
      ტ: 't',
      უ: 'u',
      ფ: 'p',
      ქ: 'k',
      ღ: 'gh',
      ყ: 'q',
      შ: 'sh',
      ჩ: 'ch',
      ც: 'ts',
      ძ: 'dz',
      წ: 'ts',
      ჭ: 'ch',
      ხ: 'kh',
      ჯ: 'j',
      ჰ: 'h',
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char as keyof typeof charMap]
      expect(slug(`foo ${char} bar baz`)).toBe(`foo-${replacement.toLowerCase()}-bar-baz`)
    }
  })

  it('should replace bulgarian chars if locale provided', () => {
    const charMap = {
      A: 'A',
      а: 'a',
      Б: 'B',
      б: 'b',
      В: 'V',
      в: 'v',
      Г: 'G',
      г: 'g',
      Д: 'D',
      д: 'd',
      Е: 'E',
      е: 'e',
      Ж: 'Zh',
      ж: 'zh',
      З: 'Z',
      з: 'z',
      И: 'I',
      и: 'i',
      Й: 'Y',
      й: 'y',
      К: 'K',
      к: 'k',
      Л: 'L',
      л: 'l',
      М: 'M',
      м: 'm',
      Н: 'N',
      н: 'n',
      О: 'O',
      о: 'o',
      П: 'P',
      п: 'p',
      Р: 'R',
      р: 'r',
      С: 'S',
      с: 's',
      Т: 'T',
      т: 't',
      У: 'U',
      у: 'u',
      Ф: 'F',
      ф: 'f',
      X: 'H',
      x: 'h',
      Ц: 'Ts',
      ц: 'ts',
      Ч: 'Ch',
      ч: 'ch',
      Ш: 'Sh',
      ш: 'sh',
      Щ: 'Sht',
      щ: 'sht',
      Ъ: 'A',
      ъ: 'a',
      Ь: 'Y',
      ь: 'y',
      Ю: 'Yu',
      ю: 'yu',
      Я: 'Ya',
      я: 'ya',
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char as keyof typeof charMap]
      expect(slug(`foo ${char} bar baz`, { locale: 'bg' })).toBe(`foo-${replacement.toLowerCase()}-bar-baz`)
    }
  })

  it('should replace serbian chars if locale provided', () => {
    const charMap = { ђ: 'dj', ј: 'j', љ: 'lj', њ: 'nj', ћ: 'c', џ: 'dz', đ: 'dj', Ђ: 'Dj', Ј: 'j', Љ: 'Lj', Њ: 'Nj', Ћ: 'C', Џ: 'Dz', Đ: 'Dj', ǉ: 'lj', ǋ: 'NJ', ǈ: 'LJ' }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char as keyof typeof charMap]
      expect(slug(`foo ${char} bar baz`, { locale: 'sr' })).toBe(`foo-${replacement.toLowerCase()}-bar-baz`)
    }
  })

  it('should replace german chars if locale provided', () => {
    const charMap = { Ä: 'AE', ä: 'ae', Ö: 'OE', ö: 'oe', Ü: 'UE', ü: 'ue' }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char as keyof typeof charMap]
      expect(slug(`foo ${char} bar baz`, { locale: 'de' })).toBe(`foo-${replacement.toLowerCase()}-bar-baz`)
    }
  })

  it('should replace ukrainian chars if locale provided', () => {
    const charMap = { И: 'Y', и: 'y', Й: 'Y', й: 'y', Ц: 'Ts', ц: 'ts', Х: 'Kh', х: 'kh', Щ: 'Shch', щ: 'shch', Г: 'H', г: 'h' }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char as keyof typeof charMap]
      expect(slug(`foo ${char} bar baz`, { locale: 'uk' })).toBe(`foo-${replacement.toLowerCase()}-bar-baz`)
    }
  })

  it('should honor a default locale', () => {
    expect(slug('DÖI')).toBe('doi')
    slug.setLocale('de')
    expect(slug('DÖI')).toBe('doei')
    slug.reset()
    expect(slug('DÖI')).toBe('doi')
    // Ignores invalid locale
    slug.setLocale('fhqwhgads')
    expect(slug('DÖI')).toBe('doi')
  })

  it('should remove ellipsis in pretty mode', () => {
    const charMap = {
      '…': '...',
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      expect(slug(`foo ${char} bar baz`)).toBe('foo-bar-baz')
    }
  })

  it('should strip … symbols in pretty mode', () => {
    expect(slug('foo … bar baz')).toBe('foo-bar-baz')
  })

  it('should strip symbols', () => {
    const charMap = [
      '†',
      '“',
      '”',
      '‘',
      '’',
      '•',
    ]
    charMap.forEach((char) => {
      expect(slug(`foo ${char} bar baz`)).toBe('foo-bar-baz')
    })
  })

  it('should replace no unicode when disabled', () => {
    const charMap = '😹☢☠☤☣☭☯☮☏☔☎☀★☂☃✈✉✊'.split('')
    charMap.forEach((char) => {
      expect(slug(`foo ${char} bar baz`)).toBe('foo-bar-baz')
    })
  })

  it('should allow altering the charmap', () => {
    const charmap = {
      f: 'ph',
      o: '0',
      b: '8',
      a: '4',
      r: '2',
      z: '5',
    }
    expect(slug('foo bar baz', { charmap })).toBe('ph00-842-845')
  })

  it('should replace lithuanian characters', () => {
    expect(slug('ąčęėįšųūžĄČĘĖĮŠŲŪŽ')).toBe('aceeisuuzaceeisuuz')
  })

  it('should be flavourable', () => {
    const text = 'It\'s your journey ... we guide you through.'
    const expected = 'its-your-journey-we-guide-you-through'
    expect(slug(text, { mode: 'pretty' })).toBe(expected)
  })

  it('should default to lowercase in rfc3986 mode', () => {
    const text = 'It\'s Your Journey We Guide You Through.'
    const expected = 'its-your-journey-we-guide-you-through.'
    expect(slug(text, { mode: 'rfc3986' })).toBe(expected)
  })

  it('should allow disabling of lowercase', () => {
    const text = 'It\'s Your Journey We Guide You Through.'
    const expected = 'Its-Your-Journey-We-Guide-You-Through.'
    expect(slug(text, { mode: 'rfc3986', lower: false })).toBe(expected)
  })

  it('should replace arabic characters', () => {
    expect(slug('مرحبا بك')).toBe('mrhba-bk')
    const charMap = {
      أ: 'a',
      ب: 'b',
      ت: 't',
      ث: 'th',
      ج: 'g',
      ح: 'h',
      خ: 'kh',
      د: 'd',
      ذ: 'th',
      ر: 'r',
      ز: 'z',
      س: 's',
      ش: 'sh',
      ص: 's',
      ض: 'd',
      ط: 't',
      ظ: 'th',
      ع: 'aa',
      غ: 'gh',
      ف: 'f',
      ق: 'k',
      ك: 'k',
      ل: 'l',
      م: 'm',
      ن: 'n',
      ه: 'h',
      و: 'o',
      ي: 'y',
      ء: 'aa',
      ة: 'a',
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char as keyof typeof charMap]
      expect(slug(`foo${char} bar baz`)).toBe(`foo${replacement.toLowerCase()}-bar-baz`)
    }
  })

  it('should replace zh characters', () => {
    expect(slug('鳄梨')).toBe('6boe5qko')
  })

  it('should permit replacing custom characters using .extend()', () => {
    slug.extend({ '♥': 'love', '☢': 'radioactive' })
    expect(slug('unicode ♥ is ☢')).toBe('unicode-love-is-radioactive')
  })

  it('should handle multiple code point characters with .extend()', () => {
    slug.extend({ फ़: 'fhqwhgads' })
    expect(slug('फ़')).toBe('fhqwhgads')
  })

  it('consolidates repeated replacement characters from extend()', () => {
    // https://github.com/simov/slugify/issues/144
    expect(slug('day + night')).toBe('day-night')
    slug.extend({ '+': '-' })
    expect(slug('day + night')).toBe('day-night')
  })

  it('should ignore symbols if they are not in the charmap', () => {
    expect(slug('unicode ♥ is ☢')).toBe('unicode-is')
  })

  it('should ignore lone surrogates', () => {
    expect(slug(String.fromCodePoint(56714, 36991))).toBe('iombvw')
  })

  it('should handle a lone low surrogate by itself', () => {
    expect(slug(String.fromCodePoint(56714))).toBe('ia')
  })

  it('should handle a lone high surrogate by itself', () => {
    expect(slug(String.fromCodePoint(55296))).toBe('ia')
  })

  it('should test custom character mapping', () => {
    // Save a reference to the original extend function
    const originalExtend = slug.extend
    // Save original multicharmap for restoration
    const originalMulticharmap = { ...slug.multicharmap }

    try {
      // Create a custom implementation of extend for testing
      slug.extend = function (map) {
        Object.assign(slug.multicharmap, map)
        return this
      }

      // Set up our test multicharmaps
      slug.extend({ justin: 'this-just-in' })
      slug.extend({ babysitter: 'dadbysitter' })

      // Verify the global configuration works
      expect(slug('justin babysitter')).toBe('this-just-in-dadbysitter')

      // Verify that local configuration overrides global
      const result = slug('justin', {
        multicharmap: { justin: 'override' },
      })
      expect(result).toBe('override')

      // Make sure the global config is still intact
      expect(slug('justin')).toBe('this-just-in')
    }
    finally {
      // Restore original state
      slug.multicharmap = originalMulticharmap
      slug.extend = originalExtend
    }
  })

  it('should respect the remove option', () => {
    expect(slug('food', { remove: /[od]/g })).toBe('f')
    expect(slug('one 1 two 2 three 3', { remove: /\d/g })).toBe('one-two-three')
    expect(slug('one 1 two 2 three 3')).toBe('one-1-two-2-three-3')
  })

  it('should not mutate a passed options object', () => {
    const opts = {}
    slug('fhqwhgads', opts)
    expect(opts).toEqual({})
  })

  it('should have charmaps reset by reset()', () => {
    // Define a test function that checks all properties
    function checkMaps(obj: any, expected: boolean): void {
      if (!expected) {
        expect(obj.charmap).toBeUndefined()
        expect(obj.multicharmap).toBeUndefined()
      }
      else {
        expect(typeof obj.charmap).toBe('object')
        expect(typeof obj.multicharmap).toBe('object')
      }
    }

    // For testing, temporarily replace the objects
    const originalProps = {
      slugCharmap: slug.charmap,
      slugMulticharmap: slug.multicharmap,
      defaultsCharmap: slug.defaults.charmap,
      defaultsMulticharmap: slug.defaults.multicharmap,
      rfc3986Charmap: slug.defaults.modes.rfc3986.charmap,
      rfc3986Multicharmap: slug.defaults.modes.rfc3986.multicharmap,
      prettyCharmap: slug.defaults.modes.pretty.charmap,
      prettyMulticharmap: slug.defaults.modes.pretty.multicharmap,
    }

    // @ts-expect-error - Intentionally setting to undefined for testing
    slug.charmap = undefined
    // @ts-expect-error - Intentionally setting to undefined for testing
    slug.multicharmap = undefined
    // @ts-expect-error - Intentionally setting to undefined for testing
    slug.defaults.charmap = undefined
    // @ts-expect-error - Intentionally setting to undefined for testing
    slug.defaults.multicharmap = undefined
    slug.defaults.modes.rfc3986.charmap = undefined
    slug.defaults.modes.rfc3986.multicharmap = undefined
    slug.defaults.modes.pretty.charmap = undefined
    slug.defaults.modes.pretty.multicharmap = undefined

    // Check that all are undefined now
    checkMaps(slug, false)
    checkMaps(slug.defaults, false)
    checkMaps(slug.defaults.modes.rfc3986, false)
    checkMaps(slug.defaults.modes.pretty, false)

    // Reset should restore them
    slug.reset()

    // Verify they were restored
    checkMaps(slug, true)
    checkMaps(slug.defaults, true)
    checkMaps(slug.defaults.modes.rfc3986, true)
    checkMaps(slug.defaults.modes.pretty, true)

    // Restore the original objects
    slug.charmap = originalProps.slugCharmap
    slug.multicharmap = originalProps.slugMulticharmap
    slug.defaults.charmap = originalProps.defaultsCharmap
    slug.defaults.multicharmap = originalProps.defaultsMulticharmap
    slug.defaults.modes.rfc3986.charmap = originalProps.rfc3986Charmap
    slug.defaults.modes.rfc3986.multicharmap = originalProps.rfc3986Multicharmap
    slug.defaults.modes.pretty.charmap = originalProps.prettyCharmap
    slug.defaults.modes.pretty.multicharmap = originalProps.prettyMulticharmap
  })

  it('should handle hebrew characters', () => {
    const charMap = {
      א: '',
      בּ: 'b',
      ב: 'v',
      גּ: 'g',
      ג: 'g',
      ד: 'd',
      דּ: 'd',
      ה: 'h',
      ו: 'v',
      ז: 'z',
      ח: 'h',
      ט: 't',
      י: 'y',
      כּ: 'k',
      ךּ: 'k',
      כ: 'kh',
      ך: 'kh',
      ל: 'l',
      מ: 'm',
      ם: 'm',
      נ: 'n',
      ן: 'n',
      ס: 's',
      ע: '',
      פּ: 'p',
      פ: 'f',
      ף: 'f',
      ץ: 'ts',
      צ: 'ts',
      ק: 'k',
      ר: 'r',
      שׁ: 'sh',
      שׂ: 's',
      תּ: 't',
      ת: 't',
      בְ: 'e',
      חֱ: 'e',
      חֲ: 'a',
      חֳ: 'o',
      בִ: 'i',
      בִי: 'i',
      בֵ: 'e',
      בֵי: 'e',
      בֶ: 'e',
      בַ: 'a',
      בָ: 'a',
      בֹ: 'o',
      וֹ: 'o',
      בֻ: 'u',
      וּ: 'u',
    }
    for (let char in charMap) { // eslint-disable-line prefer-const
      const replacement = charMap[char as keyof typeof charMap]
      // Test that the Hebrew character is replaced correctly
      expect(slug(`foo${char} bar baz`)).toBe(`foo${replacement.toLowerCase()}-bar-baz`)
    }
  })

  it('should use base64 fallback', () => {
    expect(slug('=)')).toBe('psk')
  })

  it('should return empty result when fallback is disabled', () => {
    expect(slug('=(', { fallback: false })).toBe('')
  })

  // Edge case tests
  it('should handle empty strings', () => {
    expect(slug('')).toBe('')
    expect(slug('', { fallback: false })).toBe('')
  })

  it('should handle whitespace-only strings', () => {
    // Spaces are replaced with base64 encoding when fallback is enabled (default)
    expect(slug('   ')).not.toBe('')
    // With fallback disabled
    expect(slug('   ', { fallback: false })).toBe('')
  })

  it('should handle extremely long strings', () => {
    const longString = 'a'.repeat(10000)
    expect(slug(longString)).toBe(longString)

    // Spaces get converted to hyphens
    const longStringWithSpaces = 'a '.repeat(1000)
    expect(slug(longStringWithSpaces)).toBe(`${'a-'.repeat(999)}a`)
  })

  it('should handle strings with only special characters', () => {
    // Base64 fallback is used by default
    expect(slug('!@#$%^&*()')).not.toBe('')
    // With fallback disabled
    expect(slug('!@#$%^&*()', { fallback: false })).toBe('')
  })

  it('should handle numeric strings', () => {
    expect(slug('12345')).toBe('12345')
    expect(slug('1 2 3 4 5')).toBe('1-2-3-4-5')
  })

  it('should handle mixed case and preserve case when requested', () => {
    expect(slug('MixedCASE')).toBe('mixedcase')
    expect(slug('MixedCASE', { lower: false })).toBe('MixedCASE')
  })

  it('should handle Unicode edge cases', () => {
    // Surrogate pairs (emoji) are encoded with base64 fallback
    expect(slug('😀😃😄')).not.toBe('')
    // With fallback disabled
    expect(slug('😀😃😄', { fallback: false })).toBe('')

    // Zero-width characters
    expect(slug('a\u200Bb\u200Bc')).toBe('abc')

    // Combining marks
    expect(slug('n\u0303')).toBe('n') // ñ decomposed
  })

  it('should handle mixed scripts appropriately', () => {
    // Latin + Cyrillic
    expect(slug('hello привет')).toBe('hello-privet')

    // Latin + Arabic
    expect(slug('hello مرحبا')).toBe('hello-mrhba')

    // Latin + CJK
    expect(slug('hello 你好')).toBe('hello')
  })

  it('should handle common web patterns', () => {
    expect(slug('file.name.with.dots.txt')).toBe('filenamewithdotstxt')
    expect(slug('path/to/file.txt')).toBe('pathtofiletxt')
    expect(slug('user@example.com')).toBe('userexamplecom')
    expect(slug('http://example.com/path?query=string')).toBe('httpexamplecompathquerystring')
  })

  it('should handle various line endings', () => {
    // Newlines are treated as spaces and converted to hyphens
    expect(slug('line1\nline2')).toBe('line1-line2')
    expect(slug('line1\r\nline2')).toBe('line1-line2')
    expect(slug('line1\rline2')).toBe('line1-line2')
  })

  it('should handle very specific character sequences', () => {
    // HTML entities
    expect(slug('&lt;script&gt;')).toBe('ltscriptgt')

    // Quotes and apostrophes
    expect(slug('"quoted" and \'quoted\'')).toBe('quoted-and-quoted')

    // Currency symbols
    expect(slug('$100 £50 €20 ¥500')).toBe('100-50-20-500')
  })

  it('should handle security edge cases', () => {
    // XSS attempt
    expect(slug('<script>alert("XSS")</script>')).toBe('scriptalertxssscript')

    // SQL injection attempt
    expect(slug('DROP TABLE users;')).toBe('drop-table-users')

    // Path traversal attempt
    expect(slug('../../../etc/passwd')).toBe('etcpasswd')
  })

  it('should handle debugging edge cases with debug mode', () => {
    const result = slug('test', { debug: true })
    expect(result).toContain('STRING: test')
    expect(result).toContain('CODEPOINTS:')
  })

  it('should sanitize control characters', () => {
    expect(slug('line1\u0000line2')).toBe('line1line2')
    expect(slug('line1\u001Fline2')).toBe('line1line2')
  })

  // Comprehensive language tests with real words
  describe('comprehensive language tests', () => {
    it('should properly handle German words with umlauts', () => {
      // Common German words with umlauts and special characters
      expect(slug('Österreich')).toBe('osterreich')
      expect(slug('München')).toBe('munchen')
      expect(slug('Köln')).toBe('koln')
      expect(slug('Düsseldorf')).toBe('dusseldorf')
      expect(slug('Straße')).toBe('strasse')
      expect(slug('Größe')).toBe('grosse')
      expect(slug('Schäfer')).toBe('schafer')
      expect(slug('über')).toBe('uber')
      expect(slug('Äpfel')).toBe('apfel')
      expect(slug('hören')).toBe('horen')
      expect(slug('Grüße')).toBe('grusse')

      // German locale should use ae/oe/ue replacements
      expect(slug('Österreich', { locale: 'de' })).toBe('oesterreich')
      expect(slug('München', { locale: 'de' })).toBe('muenchen')
      expect(slug('Köln', { locale: 'de' })).toBe('koeln')
      expect(slug('Düsseldorf', { locale: 'de' })).toBe('duesseldorf')
      expect(slug('über', { locale: 'de' })).toBe('ueber')
      expect(slug('Äpfel', { locale: 'de' })).toBe('aepfel')
      expect(slug('hören', { locale: 'de' })).toBe('hoeren')
      expect(slug('Grüße', { locale: 'de' })).toBe('gruesse')
    })

    it('should properly handle French words with accents', () => {
      expect(slug('français')).toBe('francais')
      expect(slug('Déjà vu')).toBe('deja-vu')
      expect(slug('ça va')).toBe('ca-va')
      expect(slug('Élève')).toBe('eleve')
      expect(slug('Château')).toBe('chateau')
      expect(slug('Garçon')).toBe('garcon')
      expect(slug('Pâté')).toBe('pate')
      expect(slug('Où est-ce?')).toBe('ou-est-ce')
      expect(slug('Voilà!')).toBe('voila')
    })

    it('should properly handle Spanish words with accents and ñ', () => {
      expect(slug('España')).toBe('espana')
      expect(slug('Jalapeño')).toBe('jalapeno')
      expect(slug('¿Cómo estás?')).toBe('como-estas')
      expect(slug('Año nuevo')).toBe('ano-nuevo')
      expect(slug('Mañana')).toBe('manana')
      expect(slug('Niño')).toBe('nino')
      expect(slug('Señor')).toBe('senor')
      expect(slug('El camión')).toBe('el-camion')
      expect(slug('Águila')).toBe('aguila')
    })

    it('should properly handle Portuguese words with accents and special characters', () => {
      expect(slug('São Paulo')).toBe('sao-paulo')
      expect(slug('Não')).toBe('nao')
      expect(slug('Informação')).toBe('informacao')
      expect(slug('Coração')).toBe('coracao')
      expect(slug('Atenção')).toBe('atencao')
      expect(slug('Nações')).toBe('nacoes')
      expect(slug('Canção')).toBe('cancao')
      expect(slug('Ação')).toBe('acao')
      expect(slug('Cabeça')).toBe('cabeca')
    })

    it('should properly handle Nordic languages', () => {
      // Swedish
      expect(slug('Göteborg')).toBe('goteborg')
      expect(slug('Malmö')).toBe('malmo')
      expect(slug('Åland')).toBe('aland')
      expect(slug('Västergötland')).toBe('vastergotland')

      // Danish
      expect(slug('København')).toBe('kobenhavn')
      expect(slug('Århus')).toBe('arhus')
      expect(slug('Ærø')).toBe('aero')

      // Norwegian
      expect(slug('Tromsø')).toBe('tromso')
      expect(slug('Ålesund')).toBe('alesund')
      expect(slug('Blåbær')).toBe('blabaer')

      // Finnish
      expect(slug('Hämäläinen')).toBe('hamalainen')
      expect(slug('Jyväskylä')).toBe('jyvaskyla')
      expect(slug('Äänekoski')).toBe('aanekoski')
    })

    it('should properly handle Eastern European languages', () => {
      // Polish
      expect(slug('Warszawa')).toBe('warszawa')
      expect(slug('Łódź')).toBe('lodz')
      expect(slug('Kraków')).toBe('krakow')
      expect(slug('Wrocław')).toBe('wroclaw')
      expect(slug('Gdańsk')).toBe('gdansk')
      expect(slug('Poznań')).toBe('poznan')

      // Czech
      expect(slug('Praha')).toBe('praha')
      expect(slug('Plzeň')).toBe('plzen')
      expect(slug('Ústí nad Labem')).toBe('usti-nad-labem')
      expect(slug('Řekni ďábelský čaj')).toBe('rekni-dabelsky-caj')

      // Hungarian
      expect(slug('Budapest')).toBe('budapest')
      expect(slug('Győr')).toBe('gyor')
      expect(slug('Székesfehérvár')).toBe('szekesfehervar')
      expect(slug('Öröm és bánat')).toBe('orom-es-banat')
    })

    it('should properly handle Cyrillic script', () => {
      // Russian
      expect(slug('Москва')).toBe('moskva')
      expect(slug('Санкт-Петербург')).toBe('sankt-peterburg')
      expect(slug('Владивосток')).toBe('vladivostok')
      expect(slug('привет мир')).toBe('privet-mir')

      // Ukrainian with locale
      expect(slug('Київ', { locale: 'uk' })).toBe('kyyiv')
      expect(slug('Львів', { locale: 'uk' })).toBe('lviv')
      expect(slug('Харків', { locale: 'uk' })).toBe('kharkiv')
      expect(slug('Привіт світ', { locale: 'uk' })).toBe('pryvit-svit')

      // Bulgarian with locale
      expect(slug('София', { locale: 'bg' })).toBe('sofiya')
      expect(slug('Пловдив', { locale: 'bg' })).toBe('plovdiv')
      expect(slug('Здравей свят', { locale: 'bg' })).toBe('zdravey-svyat')
    })

    it('should properly handle Greek script', () => {
      expect(slug('Αθήνα')).toBe('athhna')
      expect(slug('Θεσσαλονίκη')).toBe('thessalonikh')
      expect(slug('Καλημέρα κόσμε')).toBe('kalhmera-kosme')
      expect(slug('Ελληνική Δημοκρατία')).toBe('ellhnikh-dhmokratia')
      expect(slug('Ακρόπολη')).toBe('akropolh')
    })

    it('should properly handle Turkish characters', () => {
      expect(slug('İstanbul')).toBe('istanbul')
      expect(slug('Ankara')).toBe('ankara')
      expect(slug('Türkiye')).toBe('turkiye')
      expect(slug('Merhaba dünya')).toBe('merhaba-dunya')
      expect(slug('Şükran ve Özgürlük')).toBe('sukran-ve-ozgurluk')
    })

    it('should properly handle Arabic script', () => {
      expect(slug('القاهرة')).toBe('alkahra')
      expect(slug('دبي')).toBe('dby')
      expect(slug('مرحبا بالعالم')).toBe('mrhba-balaaalm')
      expect(slug('السلام عليكم')).toBe('alslam-aalykm')
    })

    it('should properly handle mixed language text', () => {
      expect(slug('München, Germany')).toBe('munchen-germany')
      expect(slug('São Paulo, Brasil')).toBe('sao-paulo-brasil')
      expect(slug('Київ, Україна')).toBe('kiyiv-ukrayina')
      expect(slug('Москва - Moscow')).toBe('moskva-moscow')
      expect(slug('Köln / Cologne')).toBe('koln-cologne')
      expect(slug('ASCII and UTF-8 Français تجريب')).toBe('ascii-and-utf-8-francais-tgryb')
    })
  })
})
