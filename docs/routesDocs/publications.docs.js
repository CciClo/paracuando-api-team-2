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
 *         description: Images as form data
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 images: 
 *                   type: array
 *                   items:
 *                     oneOf:
 *                     - type: file
 *                       format: binary
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
 *       summary: Delete an image in publication
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