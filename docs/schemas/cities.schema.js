/**
 * @openapi
 * components:
 *   schemas:
 *     requestBody:
 * 
 *     responses:
 *       responseGetAllCities:
 *         type: object
 *         properties:
 *           result:
 *             type: object
 *             properties:
 *               count:
 *                 type: integer
 *                 example: 4
 *               totalPages:
 *                 type: integer
 *                 example: 2
 *               currentPage:
 *                 type: integer
 *                 example: 1
 *               results:
 *                 type: array
 *                 items:
 *                   oneOf:
 *                   - type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 71c9253d-da63-2134-3434-7f98b26123cf
 *                       name:
 *                         type: string
 *                         example: Lima
 *                       state_id:
 *                         type: string
 *                         example: 117e7cce-4a94-4d52-bf2a-f4027acc47c1
 *                   - type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 41c9253d-da63-4721-9769-7f98b26123cf
 *                       name:
 *                         type: string
 *                         example: Bogota
 *                       state_id:
 *                         type: string
 *                         example: 227e4cce-5a94-4d52-bf2a-g4027acc47c1
 */