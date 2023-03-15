/**
 * @openapi
 * components:
 *   schemas:
 *     
 *     
 *     
 *     
 *     responseGetAllStates:
 *       type: object
 *       properties:
 *         result:
 *           type: object
 *           properties:
 *             count:
 *               type: integer
 *               example: 4
 *             totalPages:
 *               type: integer
 *               example: 2
 *             currentPage:
 *               type: integer
 *               example: 1
 *             results:
 *               type: array
 *               items:
 *                 oneOf:
 *                 - type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 117e7cce-4a94-4d52-bf2a-f4027acc47c1
 *                     name:
 *                       type: string
 *                       example: Cusco
 *                     country_id:
 *                       type: integer
 *                       example: 1
 *                 - type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 227e4cce-5a94-4d52-bf2a-g4027acc47c1
 *                     name:
 *                       type: string
 *                       example: Cundinamarca
 *                     country_id:
 *                       type: integer
 *                       example: 2
 */