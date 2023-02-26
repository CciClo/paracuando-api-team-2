/**
 * @openapi
 * components:
 *   schemas:
 *     requestBody:
 * 
 *     responses:
 *       responseGetAllRoles:
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
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: admin
 *                   - type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       name:
 *                         type: string
 *                         example: public
 */