/**
 * @openapi
 * components:
 *   schema:
 *     sign-up:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *           example: Linda
 *         last_name:
 *           type: string
 *           example: Perea
 *         email:
 *           type: string
 *           example: linda.hp@hotmail.com
 *         password:
 *           type: string
 *           example: 12345
 *     login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: linda.hp@hotmail.com
 *         password:
 *           type: string
 *           example: 12345
 *     loginResponse:
 *       type:
 *         object
 *       properties:
 *         email:
 *           type: string
 *           example: linda.hp@hotmail.com
 *         token:
 *           type: string
 *           example: JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
 *     forget-password:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: linda.hp@hotmail.com
 *     responseMe:
 *       type:
 *         object
 *       properties:
 *         id:
 *           oneOf:
 *             - type: string
 *             - type: integer
 *           example: 740273ca-b792-4129-a050-2fc01957d94d
 *         first_name:
 *           type: string
 *           example: Oscar
 *         last_name:
 *           type: string
 *           example: Tandioy
 *         email:
 *           type: string
 *           example: oscartandioy@gmail.com
 *         username:
 *           type: string
 *           example: oscartandioy@gmail.com
 *         image_url:
 *           type: null
 */