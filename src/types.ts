// Define types for the slug function
export interface SlugOptions {
  replacement?: string
  charmap?: Record<string, string>
  multicharmap?: Record<string, string>
  remove?: RegExp | null
  lower?: boolean
  trim?: boolean
  mode?: 'rfc3986' | 'pretty'
  locale?: string
  fallback?: boolean
  debug?: boolean
}

export interface SlugModes {
  rfc3986: SlugOptions
  pretty: SlugOptions
}

export interface SlugDefaults {
  charmap: Record<string, string>
  multicharmap: Record<string, string>
  mode: 'rfc3986' | 'pretty'
  modes: SlugModes
  fallback: boolean
}

// Extend the slug function with properties
export interface SlugFunction {
  (string: string, opts?: SlugOptions | string): string
  charmap: Record<string, string>
  multicharmap: Record<string, string>
  defaults: SlugDefaults
  reset: () => void
  extend: (customMap: Record<string, string>) => void
  setLocale: (locale: string) => void
}
