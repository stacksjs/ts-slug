import { afterEach, beforeEach, describe, expect, it } from 'bun:test'

// Only run in Node.js.
if (typeof window === 'undefined') {
  describe('react Native-like environment', () => {
    beforeEach(() => {
      globalThis.window = {}
    })
    afterEach(() => {
      delete globalThis.window
    })

    it('should work for window object with no btoa function', async () => {
      expect(globalThis.window.btoa).toBeUndefined()
      const slug = (await import('../src/slug')).default
      expect(slug('鳄梨')).toBe('6boe5qko')
      expect(slug(String.fromCodePoint(56714, 36991))).toBe('iombvw')
      expect(slug(String.fromCodePoint(56714))).toBe('ia')
      expect(slug(String.fromCodePoint(55296))).toBe('ia')
    })
  })
}
