/**
 * @openapi
 * /api/v1/auth/sign-up:
 *   post:
 *     summary: Sign-up at user into the App
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Required fields to sign-up at user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/sign-up'
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success Sign Up
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     requestBody:
 *      description: Required fields for the user to login
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: '#/components/schema/login'
 *     responses:
 *       200:
 *         description: OK
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#components/schema/loginResponse'
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
 * /api/v1/auth/me:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: get the profiles associated with the user's account
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Required fields for the user to login
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schema/meGet'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   $ref: '#/components/schema/responseMe'
 *                 profiles:
 *                   type: array
 *                   example: [ { "id": "6", "user_id": "740273ca-b792-4129-a050-2fc01957d94d", "role_id": 1, "created_at": "2023-02-09T23:32:03.233Z", "updated_at": "2023-02-09T23:32:03.233Z" } ]
 * /api/v1/auth/forget-password:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Reset user Password
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Required field to reset a password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/forget-password'
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/jason:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email sended!, check your inbox
 * /api/v1/auth/change-password/{token}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Change user password
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Required fields to change password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/change-password'
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           applicaton/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Succes Update
 */