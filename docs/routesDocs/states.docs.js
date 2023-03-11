/**
 * @openapi
 * /api/v1/states:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: For all users, token is required
 *     tags:
 *       - States
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
 *               $ref: '#/components/schemas/responses/responseGetAllStates'
 */