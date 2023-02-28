/**
 * @openapi
 * /api/v1/countries:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: For all tokenized users
 *     tags:
 *       - Countries
 *     parameters:
 *       - in: query
 *         name: page
 *         type: integer
 *         example: 1
 *       - in: query
 *         name: size
 *         type: integer
 *         example: 4
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/responses/responseGetAllCountries'
 */