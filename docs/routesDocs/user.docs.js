/**
 * @openapi
 * paths:
 *   /api/v1/users:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: For administrators only
 *       tags:
 *         - User
 *       responses:
 *         200:
 *           description: Ok
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schema/get-all-users'
 *   /api/v1/users/{id}:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - User
 *       parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           example: bde48768-31dc-4e1e-a298-fbb115a65feb
 *       responses:
 *         200:
 *           description: Ok
 *           content: 
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Correct Credentials
 *         404:
 *           description: Not Found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Not Found User
 *     put:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - User
 *       parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           example: bde48768-31dc-4e1e-a298-fbb115a65feb
 *       requestBody:
 *         description: Fields are needed to be updated, if there is an extra field it will be reported as error that the field is not needed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 first_name:
 *                   type: string
 *                   example: Oscar
 *                 last_name: 
 *                   type: string
 *                   example: Apellido
 *                 country_id:
 *                   type: integer
 *                   example: 1
 *       responses:
 *         200:
 *           description: Ok
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Succes Update
 *   /api/v1/users/{id}/votes:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - User
 *       parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           example: bde48768-31dc-4e1e-a298-fbb115a65feb
 *         - in: query
 *           name: page
 *           type: integer
 *           example: 2
 *         - in: query
 *           name: size
 *           type: integer
 *           example: 30
 *       responses:
 *         200:
 *           description: Ok
 *           content: 
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Correct Credentials
 *         404:
 *           description: Not Found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Not Found User
 *   /api/v1/users/{id}/publications:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - User
 *       parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           example: bde48768-31dc-4e1e-a298-fbb115a65feb
 *         - in: query
 *           name: page
 *           type: integer
 *           example: 1
 *         - in: query
 *           name: size
 *           type: integer
 *           example: 60
 *       responses:
 *         200:
 *           description: Ok
 *           content: 
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Correct Credentials
 *         404:
 *           description: Not Found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Not Found id publications
 */

