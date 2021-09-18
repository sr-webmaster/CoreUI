export const addBeforeRouteEnterOrUpdateMethod = pageClass => {
  if (pageClass.beforeRouteEnterOrUpdate) {
    pageClass.beforeRouteEnter = (to, from, next) => {
      next(vm => {
        pageClass.beforeRouteEnterOrUpdate(vm, to, from, next)
      })
    }
    pageClass.beforeRouteUpdate = function (to, from, next) {
      pageClass.beforeRouteEnterOrUpdate(this, to, from, next)
    }
  }
}

export const standardizePageClass = pageClass => {
  addBeforeRouteEnterOrUpdateMethod(pageClass)
  return pageClass
}

export const mapMiddleware = (context) => {
  const results = {}
  context.keys().forEach(key => {
    let name = key.slice(2, -3)
    results[name] = context(key)
  })
  return results
}

export const getMeta = (pageClass, middlewareContext) => {
  const meta = pageClass.meta || {}
  if (pageClass.layout) meta.layout = pageClass.layout
  const availableMiddleware = middlewareContext ? mapMiddleware(middlewareContext) : {}
  if (pageClass.middleware) {
    meta.middleware = []
    let mware = Array.isArray(pageClass.middleware) ? pageClass.middleware : [pageClass.middleware]
    for (let i in mware) {
      if (availableMiddleware[mware[i]] && availableMiddleware[mware[i]].default) {
        meta.middleware.push(availableMiddleware[mware[i]].default)
      } else {
        console.warn(`Middleware ${mware[i]} is not available, yet is specified by the Page`)
      }
    }
  }
  return meta
}

export const makePageRoute = (pageClass, name, path, middlewareContext) => {
  return {
    path,
    name,
    component: standardizePageClass(pageClass),
    meta: getMeta(pageClass, middlewareContext)
  }
}

export const makePageRoutes = (pages, options) => {
  let pageRoutes = []
  let alphaKeys = []
  let underKeys = []

  let middlewareContext = options.middleware

  // Put explicit routes first (above variable/underscore routes)
  pages.keys().forEach(key => {
    if (key.indexOf('_') > -1) {
      underKeys.push(key)
    } else if (!(options.excludePage && options.excludePage(key))) {
      alphaKeys.push(key)
    }
  })

  alphaKeys.concat(underKeys).forEach(key => {
    let lastOptional = false
    let mod = pages(key)
    let base = key.slice(2, -4)
    let last = base.split('/').slice(-1)[0]
    if (last.substr(0, 1) === '_') lastOptional = true
    let name = base.replace('/index', '').replace(/[/]/g, '-').replace(/[_]/g, '')
    let path = '/' + base.replace(/[_]/g, ':').replace('/index', '')
    if (lastOptional) path += '?'
    if (path === '/index') path = '/'
    const pageClass = mod.default
    pageRoutes.push(makePageRoute(pageClass, name, path, middlewareContext))
  })
  return pageRoutes
}
