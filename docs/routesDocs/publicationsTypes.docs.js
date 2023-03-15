/**
 * @openapi
 * paths:
 *   /api/v1/publications-types:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: For all users, token is required
 *       tags:
 *         - Publications Types
 *       parameters:
 *         - in: query
 *           name: page
 *           type: integer
 *           example: 1
 *         - in: query
 *           name: size
 *           type: integer
 *           example: 4
 *       responses:
 *         200:
 *           description: Ok
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/responseGetAllPubliblicationsTypes'
 *   /api/v1/publications-types/{id}:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: For all users, token is required
 *       tags:
 *         - Publications Types
 *       parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           example: 1
 *       responses:
 *         200:
 *           description: Ok
 *           content: 
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/responseGetPublicationById'
 *         404:
 *           description: Not Found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Not Found Publication Type
 *     put:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Publications Types
 *       summary: For administrators only
 *       parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           example: 1
 *       requestBody:
 *         description: Fields need to be filled in order to update
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/requestUpdatePublicationType'
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
 *         404:
 *           description: Not Found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Not Found Publication Type
 */