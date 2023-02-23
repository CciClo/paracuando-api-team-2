const express = require('express')
const swaggerDocs = require('../swagger')

// const routesUsers = require('./users.routes')

// const isAuthenticatedByPassportJwt = require('../libs/passport')

const routesAuth = require('./auth.routes')
const routesUsers = require('./users.routes')
const routesCountries = require('./countries.routes')
const routesStates = require('./states.routes')
const routesCities = require('./cities.routes')
const routesRoles = require('./roles.routes')
const routesTags = require('./tags.routes')
const routesPublicationsTypes = require('./publicationsTypes.routes')

function routerModels(app, PORT) {
  const router = express.Router()

  app.use('/api/v1', router)
  router.use('/auth', routesAuth)
  router.use('/users', routesUsers)
  router.use('/publications-types', routesPublicationsTypes)
  router.use('/countries', routesCountries)
  router.use('/states', routesStates)
  router.use('/cities', routesCities)
  router.use('/roles', routesRoles)
  router.use('/tags', routesTags)
  swaggerDocs(router, PORT)
}

module.exports = routerModels
