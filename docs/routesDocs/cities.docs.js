/**
 * @openapi
 * paths:
 *   /api/v1/cities:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: For all tokenized users
 *       tags:
 *         - Cities
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
 *                 $ref: '#/components/schemas/responses/responseGetAllCities'
 */