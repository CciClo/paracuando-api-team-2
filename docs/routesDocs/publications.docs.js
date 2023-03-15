/**
 * @openapi
 * paths:
 *   /api/v1/publications:
 *     get:
 *       summary: Open to all users with or without token, you do not need the query, but with them you could navigate ...
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
 *                 $ref: '#/components/schemas/responseGetAllPublications'
 *     post:
 *       summary: For all users, token required
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
 *               $ref: '#/components/schemas/createPublication'
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
 *                 $ref: '#/components/schemas/responseGetByIdPublication'
 *         404:
 *           description: Not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: not found publication
 *     delete:
 *       security:
 *         - bearerAuth: []
 *       summary: Delete publication, for all users, token required
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
 *         404:
 *           description: Not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: not found publication
 *   /api/v1/publications/{id}/vote:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       summary: For all users, token required
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
 *         404:
 *           description: Not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: not found publication
 *   /api/v1/publications/{id}/add-image:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       summary: Add an image, for all users, token required
 *       tags:
 *         - Publications
 *       parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           example: f7bc4e56-3cdb-41da-8751-909c35caad9b
 *       requestBody:
 *         description: Images as form data
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: binary
 *                   description: It is necessary to send a minimum of one image or a maximum of 3, if you exceed or miss images this will be sent
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
 *         404:
 *           description: not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: not found publication
 *         416:
 *           description: when the user has reached the limit and can no longer upload images
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Limit of images reached
 *   /api/v1/publications/{id}/image-order:
 *     put:
 *       security:
 *         - bearerAuth: []
 *       summary: Change order publication
 *       tags:
 *         - Publications
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
 *                 actual_order:
 *                   type: string
 *                   example: 1
 *                 next_order:
 *                   type: string
 *                   example: 2
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
 *       security:
 *         - bearerAuth: []
 *       summary: Delete an image in publication, for all users, token required
 *       tags:
 *         - Publications
 *       parameters:
 *         - in: path
 *           required: true
 *           name: id
 *           type: string
 *         - in: path
 *           required: true
 *           name: order
 *           type: string
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
 *                     example: Image removed
 *         400:
 *           description: Not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: not found
 */