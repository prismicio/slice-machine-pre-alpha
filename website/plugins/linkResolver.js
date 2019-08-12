export default doc => {
  if (doc.type === 'example-request') return '/example-request'
  return `/doc/${doc.id}`
}
