// eslint-disable-next-line
export const isRichText = (data) => Array.isArray(data)

export const maybeRichTextValidator = prop => {
  const type = typeof prop
  return ['string', 'object'].includes(type)
}
