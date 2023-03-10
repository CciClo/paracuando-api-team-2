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
 *       parameters:
 *         - in: query
 *           name: page
 *           type: integer
 *           example: 1
 *         - in: query
 *           name: size
 *           type: integer
 *           example: 2
 *         - in: query
 *           name: created_at
 *           type: string
 *           example: 2023-02-27T22:06:54.904Z
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
 *                   type: string
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
 *   /api/v1/users/:id/add-interest:
 *     post:
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
 *         description: Fields are needed to do the task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tag_id:
 *                   type: integer
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
 *                     example: Interest Added
 *         400:
 *           description: Not Found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Unable to complete Review fields
 *   /api/v1/users/remove-interest:
 *     delete:
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
 *         description: Fields are needed to do the task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tag_id:
 *                   type: integer
 *                   example: 1
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
 *                     example: Interest removed
 *         400:
 *           description: Not Found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Unable to complete Review fields
 *   /api/v1/users/{id}/add-image:
 *     post:
 *       tags:
 *         - User
 *       parameters:
 *         - in: path
 *           name: image_url
 *           type: string
 *           example:
 *       requestBody:
 *         description: Images as form data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 image_url:
 *                   type: string
 *                   example:
 *   /api/v1/users/{id}/remove-image:
 *     delete:
 *       tags:
 *         - User
 *       requestBody:
 *         description: I received the request that you want to rmeover the image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 image-url:
 *                   type: string
 *                   example:
 *         404:
 *           description: Not Found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Not Found Image
 */

