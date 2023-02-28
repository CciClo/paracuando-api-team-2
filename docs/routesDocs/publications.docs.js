/**
 * @openapi
 * paths:
 *   /api/v1/publications:
 *     get:
 *       summary: For all users
 *       tags: 
 *         - Publications
 *       parameters:
 *         - in: query
 *           name: page
 *           type: integer
 *           example: 1
 *         - in: query
 *           name: size
 *           type: integer
 *           example: 2
 *       responses:
 *         200:
 *           description: Ok
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/responses/responseGetAllPublications'
 *     post:
 *       summary: For all users
 *       security:
 *         - bearerAuth: []
 *       tags: 
 *         - Publications
 *       requestBody:
 *         description: These fields are required for the creation of a publication
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/requestBody/createPublication'
 *       responses:
 *         201:
 *           description: Ok
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Has been successfully created
 *   /api/v1/publications/{id}:
 *     get:
 *       summary: For all users
 *       tags: 
 *         - Publications
 *       parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           example: f7bc4e56-3cdb-41da-8751-909c35caad9b
 *       responses:
 *         200:
 *           description: Ok
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/responses/responseGetByIdPublication'
 *     delete:
 *       security:
 *         - bearerAuth: []
 *       summary: For all users
 *       tags:
 *         - Publications
 *       parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           example: f7bc4e56-3cdb-41da-8751-909c35caad9b
 *       responses:
 *         201:
 *           description: Ok
 *           content:
 *             application/json:
 *               schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: strict
 *                    example: remove
 */