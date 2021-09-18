import VueRouter from 'vue-router'
import uniqBy from 'lodash/uniqBy'
import { makePageRoutes, standardizePageClass, getMeta } from './routes'

// Creates a function which runs the default next() callback and triggers subsequent Middleware function.
const nextFactory = function (context, middleware, index) {
  // Get next action
  let subsequentMiddleware = middleware[index]
  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters)
    // Then run the subsequent Middleware with a new `nextMiddleware()` callback.
    let nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

/**
 * See README.md section on Pages
 */
const createMiddlewareGuard = (router) => {
  return (to, from, next) => {
    if (to.meta.middleware) {
      let middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]
      let context = {
        from,
        next,
        router,
        to
      }
      let nextMiddleware = nextFactory(context, middleware, 1)
      return middleware[0]({ ...context, next: nextMiddleware })
    }
    return next()
  }
}

const optionDefaults = {
  excludePage: false,
  redirectOnNotFound: true
}
export const install = (Vue, options = {}) => {
  Vue.use(VueRouter)
  options = { ...optionDefaults, ...options }
  // Get any page routes that have been passed in
  let primaryPageRoutes = []
  if (options.pages) {
    primaryPageRoutes = Array.isArray(options.pages) ? options.pages : makePageRoutes(options.pages, options)
  }

  /* Our Vue Router Object */
  const router = new VueRouter({
    /* Use Pretty URL */
    mode: 'history',
    /* Save The Scroll Position , Useful When Redirecting Back */
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    routes: [
      // No route match, go to 404 page
      (options.redirectOnNotFound || !options.NotFoundPage)
        ? { path: '*', redirect: '/404' }
        : { path: '*', component: standardizePageClass(options.NotFoundPage), meta: getMeta(options.NotFoundPage, options.middleware) }
    ].concat(uniqBy(primaryPageRoutes, 'path'))
  })

  router.beforeEach(createMiddlewareGuard(router))

  Vue.router = router
  return router
}

export default (Vue, options) => {
  return install(Vue, options)
}
