import { beforeEach, describe, expect, it } from 'bun:test'
import slug, { slugify, TRANSLITERATED_SCRIPT } from '../src/slug'

describe('scripts the charmap does not transliterate', () => {
  beforeEach(slug.reset)

  it('keeps Japanese, Chinese and Korean letters instead of slugging them to ""', () => {
    expect(slugify('日本語のタイトル')).toBe('日本語のタイトル')
    expect(slugify('中文标题')).toBe('中文标题')
    expect(slugify('한국어 제목')).toBe('한국어-제목')
    expect(slugify('Hello 世界')).toBe('hello-世界')
  })

  it('keeps a vowel sign on its letter', () => {
    expect(slugify('নমস্কার বিশ্ব')).toBe('নমস্কার-বিশ্ব')
    expect(slugify('สวัสดีครับ')).toBe('สวัสดีครับ')
  })

  it('still removes a letter of a romanized script the charmap has no entry for', () => {
    // Plain shin has none (only its dotted forms do); kept raw it would sit
    // inside the romanized word.
    expect(slugify('שלום')).toBe('lvm')
  })

  it('names every script the charmap romanizes', () => {
    const letters = [...Object.keys(slug.charmap), ...Object.keys(slug.multicharmap)]
      .map(key => [...key][0]!)
      .filter(first => /\p{L}/u.test(first))
    expect(letters.length).toBeGreaterThan(500)
    expect(letters.filter(letter => !TRANSLITERATED_SCRIPT.test(letter))).toEqual([])
  })

  it('keeps a letter outside the BMP whole', () => {
    expect(slugify('\u{20000}\u{20001} text')).toBe('\u{20000}\u{20001}-text')
  })

  it('still transliterates what the charmap covers, and drops a mark with its transliterated letter', () => {
    expect(slugify('Crème Brûlée')).toBe('creme-brulee')
    expect(slugify('Привет мир')).toBe('privet-mir')
    expect(slugify('e\u0301cole')).toBe('ecole')
  })

  it('still removes punctuation and symbols in any script', () => {
    expect(slugify('タイトル。')).toBe('タイトル')
    expect(slugify('emoji 🎉 party')).toBe('emoji-party')
    expect(slugify('!!!')).toBe('')
  })

  it('stays ASCII in rfc3986 mode, which allows only unreserved characters', () => {
    expect(slugify('日本語 title', { mode: 'rfc3986' })).toBe('title')
    expect(slug('日本語', { mode: 'rfc3986' })).toMatch(/^[\w\-.~]+$/)
  })
})
