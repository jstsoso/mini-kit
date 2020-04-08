export const TOKEN_KEY = `token_${process.env.NODE_ENV}`
export const LANGUAGE = `language_${process.env.NODE_ENV}`

export const MEMORY_WARNING_LEVEL = {
  5: 'TRIM_MEMORY_RUNNING_MODERATE',
  10: 'TRIM_MEMORY_RUNNING_LOW',
  15: 'TRIM_MEMORY_RUNNING_CRITICAL',
}
