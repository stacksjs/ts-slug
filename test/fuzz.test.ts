import { describe, expect, it } from 'bun:test'
import slug from '../src/slug'

describe('fuzz-testing slug', () => {
  it('should return truthy results for any valid string', () => {
    const FUZZ_TESTS = 64
    const MAX_WORD_LENGTH = 16
    const MAX_WORD_COUNT = 4

    const MAX_BMP_CODE_POINT = 0xFFFF
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
    const MAX_CODE_POINT = 0x10FFFF

    function random(max: number) {
      return Math.floor(Math.random() * max + 1)
    }

    function getString(maxCodePoint: number) {
      const wordCount = random(MAX_WORD_COUNT)
      const wordLengths = Array.from({ length: wordCount }, () => random(MAX_WORD_LENGTH))
      const codePoints = wordLengths.map(wordLength => Array.from({ length: wordLength }, () => random(maxCodePoint)))
      const words = codePoints.map(wordCodePoints => String.fromCodePoint.apply(null, wordCodePoints))
      return { fuzzyString: words.join(' '), codePoints }
    }

    for (let i = 0; i < FUZZ_TESTS; i++) {
      {
        const theString = getString(MAX_BMP_CODE_POINT)
        expect(slug(theString.fuzzyString, { debug: true })).toBe(`STRING: ${theString.fuzzyString}\nCODEPOINTS: ${JSON.stringify(theString.codePoints)}`)
      }

      {
        const theString = getString(MAX_CODE_POINT)
        expect(slug(theString.fuzzyString, { debug: true })).toBe(`STRING: ${theString.fuzzyString}\nCODEPOINTS: ${JSON.stringify(theString.codePoints)}`)
      }
    }
  })
})
