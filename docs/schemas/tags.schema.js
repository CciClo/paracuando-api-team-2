/**
 * @openapi
 * components:
 *   schemas:
 *     requestBody:
 *       createTag:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *             example: New Tags
 *           description:
 *             type: string
 *             example: Create Tags
 *       updateTag:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *             example: Update Tags
 *           description:
 *             type: string
 *             example: Modifying Tag
 * 
 * 
 * 
 *     responses:
 *       responseGetAllTags:
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
 *                         example: Ropa y Accesorios
 *                       description:
 *                         type: string
 *                         example: A series of events involving exposure to one or more hazards
 *                       img-url:
 *                         type: string
 *                         example: example image

 */