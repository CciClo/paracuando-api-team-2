/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     summary: Only for Administrators
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Through the queries params they will receive their model fields so that it can be filtered, including the created_at
 *         content:
 *           application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: example example here
 * /api/v1/users/{id}:
 *   get:
 *     tags:
 *       - User
 *     requestBody:
 *      description: Required fields for the user to login
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: '#/components/schema/login'
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
 *     tags:
 *       - User
 *     requestBody:
 *      description: Required fields for the user to login
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: '#/components/schema/login'
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
 *     tags:
 *       - User
 *     requestBody:
 *      description: Required fields for the user to login
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: '#/components/schema/login'
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
 */
