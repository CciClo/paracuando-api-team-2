/**
 * @openapi
 * components:
 *   schemas:
 *     requestBody:
 *       createPublication:
 *         type: object
 *         properties:
 *           title:
 *             type: string
 *             example: Exploracion de minas
 *           description:
 *             type: string
 *             example: SE explorara nuevas zonas para sacar oro
 *           content:
 *             type: string
 *             example: content de ejemplo
 *           publication_type_id:
 *             type: string
 *             example: cc95b8c2-a4fd-4323-9273-a239dcb42cfd
 *           city_id:
 *             type: string
 *             example: e89243c8-1673-442f-8d4d-86fa460cdcc4
 *           tags:
 *             type: array
 *             example: [11, 4]
 *     responses:
 *       responseGetAllPublications:
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
 *                         example: d116979e-130f-442c-b8d5-7f1350747d42
 *                       publication_type_id:
 *                         type: string
 *                         example: cc95b8c2-a4fd-4323-9273-a239dcb42cfd
 *                       title:
 *                         type: string
 *                         example: Videos Games
 *                       description:
 *                         type: string
 *                         example: All kinds of video games in general
 *                       votes_count:
 *                         type: integer
 *                         example: 2
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: a7da2813-cf22-4c10-b682-45da5553d5f4
 *                           first_name:
 *                             type: string
 *                             example: Oscar
 *                       tags:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 2
 *                           tag:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 2
 *                               name:
 *                                 type: string
 *                                 example: Video Games
 *                   - type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 34efdf38-0ec8-41be-9124-be6d41df2348
 *                       publication_type_id:
 *                         type: string
 *                         example: bde48768-31dc-4e1e-a298-fbb115a65feb
 *                       title:
 *                         type: string
 *                         example: Musica
 *                       description:
 *                         type: string
 *                         example: Iremos a un concierto de...
 *                       votes_count:
 *                         type: integer
 *                         example: 10
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: b840699e-990c-4036-bcc6-f64ab7ce44d3
 *                           first_name:
 *                             type: string
 *                             example: Linda
 *                       tags:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 2
 *                           tag:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 4
 *                               name:
 *                                 type: string
 *                                 example: Conciertos y Musica
 *       responseGetByIdPublication:
 *         type: object
 *         properties:
 *           result:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: d116979e-130f-442c-b8d5-7f1350747d42
 *               title:
 *                 type: string
 *                 example: Videos Games
 *               description:
 *                 type: string
 *                 example: All kinds of video games in general
 *               votes_count:
 *                 type: integer
 *                 example: 2
 *               user:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: a7da2813-cf22-4c10-b682-45da5553d5f4
 *                   first_name:
 *                     type: string
 *                     example: Oscar
 *               cities:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: e89243c8-1673-442f-8d4d-86fa460cdcc4
 *                   state_id:
 *                     type: string
 *                     example: 41f31935-cd9b-4920-9751-60b3e09be838
 *                   name:
 *                     type: string
 *                     example: Videos Games
 *               publication_type:
 *                 type: object
 *                 id:
 *                   type: string
 *                   example: cc95b8c2-a4fd-4323-9273-a239dcb42cfd
 *                 name:
 *                   type: string
 *                   example: Videos Games
 *               tags:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 2
 *                   tag:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       name:
 *                         type: string
 *                         example: Video Games
 *               votes:
 *                 type: array
 *                 items:
 *                   oneOf:
 *                   - type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 2dc095e3-ba31-4168-9aa8-beed59d11830
 *                       publication_id:
 *                         type: strict
 *                         example: d116979e-130f-442c-b8d5-7f1350747d42
 *                       user_id:
 *                         type: string
 *                         example: a7da2813-cf22-4c10-b682-45da5553d5f4
 */