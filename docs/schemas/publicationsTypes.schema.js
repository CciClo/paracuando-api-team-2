/**
 * @openapi
 * components:
 *   schemas:
 *     
 *     requestUpdatePublicationType:
 *       type: object
 *       properties:
 *         name: 
 *           type: string
 *           example: Marcas y tiendas
 *         description:
 *           type: string
 *     
 *     
 *     responseGetAllPubliblicationsTypes:
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
 *               example: [ { "id": "9429e152-ea59-46f4-b9b2-262fff47e6f7", "name": "Marcas y tiendas", "description": null, "created_at": "2023-02-22T22:07:04.875Z",  "updated_at": "2023-02-22T22:07:04.875Z" }, { "id": "5f7fa3bb-2118-4e74-998b-95564d6e080e", "name": "Artistas y conciertos", "description": null, "created_at": "2023-02-22T22:07:04.875Z", "updated_at": "2023-02-22T22:07:04.875Z" }, { "id": "61e375f4-a1c6-4fae-9243-291cff51111c", "name": "Torneos", "description": null, "created_at": "2023-02-22T22:07:04.875Z", "updated_at": "2023-02-22T22:07:04.875Z" }, { "id": "53e47b00-a28b-4058-9fe0-c104ac3fa986", "name": "Videos Games", "description": "All kinds of video games in general", "created_at": "2023-02-20T18:51:11.770Z", "updated_at": "2023-02-22T23:46:46.562Z" } ]
 *     responseGetPublicationById:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 9429e152-ea59-46f4-b9b2-262fff47e6f7
 *         name:
 *           type: string
 *           example: Marcas y tiendas
 *         description:
 *           type: string
 *           
 */