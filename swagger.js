const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
require("dotenv").config();

const options = {
  apis: [
    './docs/routesDocs/auth.docs.js',
    './docs/routesDocs/user.docs.js', './docs/schemas/userModel.schema.js',
    './docs/routesDocs/publicationsTypes.docs.js', './docs/schemas/publicationsTypes.schema.js',
    './docs/routesDocs/countries.docs.js', './docs/schemas/countries.schema.js',
    './docs/routesDocs/cities.docs.js', './docs/schemas/cities.schema.js',
    './docs/routesDocs/states.docs.js', './docs/schemas/states.schema.js',
    './docs/routesDocs/roles.docs.js', './docs/schemas/roles.schema.js',
    './docs/routesDocs/tags.docs.js', './docs/schemas/tags.schema.js',
    './docs/routesDocs/publications.docs.js', './docs/schemas/publications.schema.js',
    './docs/schemas/profileModel.schema.js',
  ],
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Para Cuando Project',
      version: '0.0.9',
      description: 'Voting API',
    },
    servers: [
      {
        url: `${process.env.DOMAIN}/docs`
      }
    ],
  },
}

//generar una especificacin en json para nuestra documentacion

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
  app.get('/docs.json', (req, res) => {
    res.setHeader({ 'Content-Type': 'application/json' });
    res.send(swaggerSpec)
  });

  console.log(`La documentacion esta disponible en ${process.env.URL}:${port}/api/v1/docs`);
}

module.exports = swaggerDocs;