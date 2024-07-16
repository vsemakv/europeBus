export function getLocaleFromRoute(route) {
    const localeRegex = /^\/([a-z]{2})(\/|$)/i
    const match = route.path.match(localeRegex)
    return match ? match[1] : 'uk'
  }