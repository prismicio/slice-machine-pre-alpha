const camelizeRE = /-(\w)/g

/** Takes a snake-cased string and makes it CamelCased */
export const camelize = str => {
	str = str.replace(/_/g, "-").replace(camelizeRE, (_, c) => {
		return c ? c.toUpperCase() : ''
	})
	return str[0].toUpperCase() + str.slice(1)
}
