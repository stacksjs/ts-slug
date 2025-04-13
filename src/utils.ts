// This function's sole purpose is to help us ignore lone surrogates so that
// malformed strings don't throw in the browser while being processed
// permissively in Node.js. If we didn't care about parity, we could get rid
// of it.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
export function getWholeCharAndI(str: string, i: number): [string, number] {
  const code = str.charCodeAt(i)

  // This is a coherence check. `code` should never be `NaN`.
  /* c8 ignore next 3 */
  if (Number.isNaN(code)) {
    throw new RangeError(`Index ${i} out of range for string "${str}"; please open an issue at https://github.com/Trott/slug/issues/new`)
  }

  if (code < 0xD800 || code > 0xDFFF) {
    return [str.charAt(i), i] // Non-surrogate character, keeping 'i' the same
  }

  // High surrogate
  if (code >= 0xD800 && code <= 0xDBFF) {
    if (str.length <= (i + 1)) {
      // High surrogate without following low surrogate
      return [' ', i]
    }

    const next = str.charCodeAt(i + 1)
    if (next < 0xDC00 || next > 0xDFFF) {
      // High surrogate without following low surrogate
      return [' ', i]
    }

    return [str.charAt(i) + str.charAt(i + 1), i + 1]
  }

  // Low surrogate (0xDC00 <= code && code <= 0xDFFF)
  if (i === 0) {
    // Low surrogate without preceding high surrogate
    return [' ', i]
  }

  const prev = str.charCodeAt(i - 1)

  if (prev < 0xD800 || prev > 0xDBFF) {
    // Low surrogate without preceding high surrogate
    return [' ', i]
  }

  /* c8 ignore next */
  throw new Error(`String "${str}" reaches code believed to be unreachable; please open an issue at https://github.com/Trott/slug/issues/new`)
}
