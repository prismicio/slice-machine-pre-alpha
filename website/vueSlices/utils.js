export const isRichText = (data, b = true) => Array.isArray(data)

export const maybeRichTextValidator = (prop) => {
  const type = typeof prop
  return ['string', 'array'].includes(type)
}
