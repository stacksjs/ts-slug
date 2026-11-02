import { beforeEach, describe, expect, it } from 'bun:test'
import slug, { slugify } from '../src/slug'

describe('dashes', () => {
  beforeEach(slug.reset)

  it('separates words at an em dash, en dash or any other dash', () => {
    expect(slugify('Rock\u2014Paper\u2014Scissors')).toBe('rock-paper-scissors')
    expect(slugify('Pages 1\u201310')).toBe('pages-1-10')
    expect(slugify('a\u2012b\u2015c\u2010d')).toBe('a-b-c-d')
    expect(slugify('a \u2014 b')).toBe('a-b')
  })

  it('uses the replacement for a dash', () => {
    expect(slugify('Rock\u2014Paper', { replacement: '_' })).toBe('rock_paper')
    expect(slugify('Rock\u2014Paper', { mode: 'rfc3986' })).toBe('rock-paper')
  })
})
