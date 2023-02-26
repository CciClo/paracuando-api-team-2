/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Only users for Administrators
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schema/get-all-users'
 * /api/v1/users/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example: 2
 *     responses:
 *       200:
 *         description: Ok
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Correct Credentials
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Not Found User
 * /api/v1/users/{id}/votes:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example: we23421asdsd
 *       - in: query
 *         name: page
 *         type: integer
 *         example: 2
 *       - in: query
 *         name: size
 *         type: integer
 *         example: 30
 *     responses:
 *       200:
 *         description: Ok
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Correct Credentials
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Not Found User
 * /api/v1/users/{id}/publications:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example: qwwefgfghghuzdxfsd
 *       - in: query
 *         name: page
 *         type: integer
 *         example: 1
 *       - in: query
 *         name: size
 *         type: integer
 *         example: 60
 *     responses:
 *       200:
 *         description: Ok
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Correct Credentials
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Not Found id publications
 * paths:
 *   /api/v1/users/{id}:
 *     put:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - User
 * 
 */

