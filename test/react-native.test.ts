import { afterEach, beforeEach, describe, expect, it } from 'bun:test'

// Only run in Node.js.
if (typeof window === 'undefined') {
  describe('react Native-like environment', () => {
    beforeEach(() => {
      // @ts-expect-error - Intentionally mocking window for testing
      globalThis.window = {}
    })
    afterEach(() => {
      // @ts-expect-error - Allows deleting non-optional property
      delete globalThis.window
    })

    it('should work for window object with no btoa function', async () => {
      expect(globalThis.window.btoa).toBeUndefined()
      const slug = (await import('../src/slug')).default
      // Letters are kept now, so the base64 fallback runs for text with none.
      expect(slug('🥑')).toBe('8jlkq')
      expect(slug(String.fromCodePoint(56714) + '🥑')).toBe('ipcfpze')
      expect(slug(String.fromCodePoint(56714))).toBe('ia')
      expect(slug(String.fromCodePoint(55296))).toBe('ia')
    })
  })
}
