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
 *   /api/v1/publications/{id}/vote:
 *     post:
 *       summary: Add a Vote in Publication
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
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Vote add / removed
 *         400:
 *           description: Not found
 *           content:
 *             application/json:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: not found
 *   /api/v1/publications/{id}/add-image:
 *     post:
 *       summary: Add an image
 *       tags:
 *         - Publications
 *       parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           example: f7bc4e56-3cdb-41da-8751-909c35caad9b
 *       requestBody:
 *         description: Image
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: binary
 *                   example: imag1, img2, img3
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
 *                     example: Add image
 *         400:
 *           description: not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: not found
 *   /api/v1/publications/{id}/image-order:
 *     put:
 *       summary: Change order publication
 *       tags:
 *         - Publications:
 *       parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           example: f7bc4e56-3cdb-41da-8751-909c35caad9b
 *       requestBody:
 *         description: Change order image
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: xx actual order y siguiente order
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
 *                     example: Add image
 *         400:
 *           description: not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: not found
 *   /api/v1/publications/{id}/remove-image/{order}:
 *     delete:
 *       summary: Delete an image in publication
 *       tags:
 *         - Publications:
 *       parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           example: f7bc4e56-3cdb-41da-8751-909c35caad9b
 *         - in: path
 *           name: order
 *           type: string
 *           example: xx
 *       responses:
 *         200:
 *           description: Ok
 *           content:
 *             application/json:
 *               schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Image removed
 *         400:
 *           description: Not found
 *           content:
 *             application/json:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: not found
 */