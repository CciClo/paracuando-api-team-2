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
 *     change-password:
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *           example: 874622
 *     meGet:
 *       type:
 *         object
 *       properties:
 *         token:
 *           type: string
 *           example: JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
 *     responseMe:
 *       type:
 *         object
 *       properties:
 *         id:
 *           oneOf:
 *             - type: string
 *             - type: integer
 *           example: 548263ca-b792-4129-a050-2fc01955k94l
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
 *     profilesMe:
 *       type:
 *         object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           oneOF:
 *             - type: integer
 *             - type: string
 *           example: 740273ca-b792-4129-a050-2fc01957k94l
 *         role_id:
 *           type: integer
 *           example: 1
 *         created_at:
 *           type: date-time
 *           example: 2023-02-17 05:56:07.362+01
 *         updated_at:
 *           type: date-time
 *         example: 2023-02-17 05:56:07.362+01
 *     get-all:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *           example: Oscar
 *         last_name:
 *           type: string
 *           example: Tandioy
 *         email:
 *           type: string
 *           example: oscar@hotmail.com
 *         username:
 *           type: string
 *           example: Oscar
 *     get-user-by-id:
 *       type: object
 *       properties:
 *         id:
 *         email:
 *           type: string
 *           example: linda.hp@hotmail.com
 *         password:
 *           type: string
 *           example: 12345
 */