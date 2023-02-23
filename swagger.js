const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
require("dotenv").config();

const options = {
    apis: [
      "./docs/routesDocs/auth.docs.js", "./docs/routesDocs/user.docs.js",
      "./docs/schemas/userModel.schema.js", "./docs/schemas/profileModel.schema.js"],
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Para Cuando Project",
            version: "0.0.9",
            description: "Web de Votaciones",
        }
    }
}

//generar una especificacin en json para nuestra documentacion

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))
    app.get("/docs.json", (req, res) => {
        res.setHeader({"Content-Type" : "application/json"});
        res.send(swaggerSpec)
    });
    
    console.log(`La documentacion esta disponible en ${process.env.URL}:${port}/api/v1/docs` );
}

module.exports = swaggerDocs;