/**
 * @openapi
 * /api/v1/publications:
 *   get:
 *     summary: For all users
 *     tags: 
 *       - Publications
 *     parameters:
 *       - in: query
 *         name: page
 *         type: integer
 *         example: 1
 *       - in: query
 *         name: size
 *         type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/responses/responseGetAllPublications'
 * paths:
 *   /api/v1/publications:
 *     post:
 *       summary: For all users
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
 */