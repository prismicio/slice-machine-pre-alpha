export default {
  name: 'PrismicEmbed',
  functional: true,
  props: {
    field: {
      type: Object,
      required: true
    },
    wrapper: {
      type: String,
      required: false,
      default: 'div'
    }
  },
  render(h, { props }) {
    const { field } = props
    if (!field || !field.html) {
      return null
    }

    const { embed_url: embedUrl, type, provider_name: providerName } = field

    const attrs = {
      ...(embedUrl && { 'data-oembed': embedUrl }),
      ...(type && { 'data-oembed-type': type }),
      ...(providerName && { 'data-oembed-provider': providerName })
    }

    return h('span', {
      attrs,
      domProps: {
        innerHTML: field.html
      }
    })
  }
}
