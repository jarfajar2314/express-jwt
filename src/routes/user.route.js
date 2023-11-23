const { authJwt, verifyUser } = require("../middleware");
const controller = require("../controllers/user.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * @swagger
   * /api/users/register:
   *   post:
   *     tags:
   *       - User Management
   *     summary: Register new user
   *     description: Register new user.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                name:
   *                  type: string
   *                  description: New user's name.
   *                  example: James Edward
   *                username:
   *                  type: string
   *                  description: New user's username.
   *                  example: jamesedward
   *                password:
   *                  type: string
   *                  description: New user's password.
   *                  example: 123456
   *     responses:
   *       200:
   *          description: User was registered successfully.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Result message.
   *                    example: User was registered successfully.
   *       400:
   *          description: username already used.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Result message.
   *                    example: Failed! username is already in use!
   *       500:
   *          description: Application Error.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Application Error.
   *                    example: Failed to register user. Please check application log.
   */
  app.post(
    "/api/users/register",
    [verifyUser.checkDuplicateUsername],
    controller.create
  );

  /**
   * @swagger
   * /api/users/login:
   *   post:
   *     tags:
   *       - User Management
   *     summary: Logs user into application
   *     description: Logs user into application using registered username & password.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                username:
   *                  type: string
   *                  description: The user's username.
   *                  example: superadmin
   *                password:
   *                  type: string
   *                  description: The user's password.
   *                  example: 123456
   *     responses:
   *       200:
   *          description: Successfully logged in.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  id:
   *                    type: string
   *                    description: User's uuid.
   *                    example: a588f982-af3e-4b9e-85dc-4e662e93a8be
   *                  username:
   *                    type: string
   *                    description: User's username.
   *                    example: admintest
   *                  accessToken:
   *                    type: string
   *                    description: User's access token to access API.
   *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1ODhmOTgyLWFmM2UtNGI5ZS04NWRjLTRlNjYyZTkzYThiZSIsImlhdCI6MTY3ODMwODMwMywiZXhwIjoxNjc4MzExOTAzfQ.S6o8jOirnqTy7N59049xBIdfujWFBHmA5fNgt_C1P64
   *                  refreshToken:
   *                    type: string
   *                    description: User's refresh token to generate new access token.
   *                    example: 95100f31-90d9-4173-9b4c-18980aa5499d
   *       401:
   *         description: Invalid password. incorrect password.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: Invalid Password.
   *       404:
   *         description: User not found, incorrect username.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: username address is not registered. Check the username address again.
   *       500:
   *         description: Application error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Application error.
   *                  example: Failed to login. Please check application log.
   */
  app.post("/api/users/login", controller.login);

  /**
   * @swagger
   * /api/users/refreshToken:
   *   post:
   *     tags:
   *       - User Management
   *     summary: Generate new access token
   *     description: Generate new access token using user's refresh token.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                refreshToken:
   *                  type: string
   *                  description: Send out user's refresh token.
   *                  example: 9ad656a6-4c90-4701-8cd1-2d65ff08a0ae
   *     responses:
   *       200:
   *          description: Access token was generated successfully.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  accessToken:
   *                    type: string
   *                    description: New generated access token.
   *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5MjRiOTBjLTQ4MDUtNGY0Mi1hNGMxLWRhNWRkMjQzZWZmMiIsImlhdCI6MTY3ODMwOTE4NSwiZXhwIjoxNjc4MzEyNzg1fQ.QtXPJ4Xknj6JGDCzIvj92cZKmsu3206kJvXyi-Y-p30
   *                  refreshToken:
   *                    type: string
   *                    description: User's refresh token.
   *                    example: 9ad656a6-4c90-4701-8cd1-2d65ff08a0ae
   *       400:
   *          description: Refresh token is invalid.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Result message.
   *                    example: Refresh token is not in database!
   *       403:
   *          description: Refresh token was expired.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Result message.
   *                    example: Refresh token was expired. Please make a new signin request
   *       500:
   *          description: Application Error.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Application Error.
   *                    example: Failed to generate access token. Please check application log.
   */
  app.post("/api/users/refreshtoken", controller.refreshToken);

  /**
   * @swagger
   * /api/users/{id}:
   *   delete:
   *     tags:
   *       - User Management
   *     summary: Delete user
   *     description: Delete user using user id.
   *     parameters:
   *     - name: id
   *       in: path
   *       description: User's id
   *       required: true
   *       type: string
   *     - name: x-access-token
   *       in: header
   *       description: User's access token
   *       required: true
   *       type: string
   *     responses:
   *       200:
   *          description: User was deleted successfully.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Result message.
   *                    example: User was deleted successfully.
   *       404:
   *          description: User not found, incorrect id.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Result message.
   *                    example: User not found.
   *       500:
   *          description: Application Error.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Application Error.
   *                    example: Failed to delete user. Please check application log.
   */
  app.delete(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isNotUser],
    controller.delete
  );

  /**
   * @swagger
   * /api/users:
   *   get:
   *     tags:
   *       - User Management
   *     summary: Get all user accounts.
   *     description: Get all user accounts.
   *     parameters:
   *     - name: x-access-token
   *       in: header
   *       description: User's access token
   *       required: true
   *       type: string
   *     responses:
   *       200:
   *          description: Users successfully fetched.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Result message.
   *                    example: Users was fetched successfully.
   *                  data:
   *                    type: array
   *                    items:
   *                      type: object
   *                      properties:
   *                        id:
   *                          type: string
   *                          example: e9c03ec2-3cf3-4bec-9d72-85fad5e4a06b
   *                        name:
   *                          type: string
   *                          example: Super Admin
   *                        username:
   *                          type: string
   *                          example: superadmin
   *                        password:
   *                          type: string
   *                          example: $2a$08$BWDAcdpTIZ/Yuy33vXZld.QWx4kv8t.JHBSvEI3fWLngVHIM5n/Ma
   *                        role:
   *                          type: number
   *                          example: 2
   *                        position:
   *                          type: string
   *                          example: superadmin1
   *                        approval:
   *                          type: boolean
   *                          example: false
   *                        createdAt:
   *                          type: string
   *                          example: 2023-03-19T14:07:50.893Z
   *                        updatedAt:
   *                          type: string
   *                          example: 2023-03-19T14:07:50.893Z
   *       403:
   *          description: Token not provided.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Result message.
   *                    example: No token provided!
   *       404:
   *         description: User not found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: User not found.
   *       500:
   *         description: Application error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Application error.
   *                  example: Failed to fetch users. Please check application log.
   */
  app.get("/api/users", [authJwt.verifyToken], controller.getAll);

  /**
   * @swagger
   * /api/users/{id}:
   *   get:
   *     tags:
   *       - User Management
   *     summary: Get user account detail.
   *     description: Get user account detail by ID.
   *     parameters:
   *     - name: id
   *       in: path
   *       description: User's ID
   *       required: true
   *       type: string
   *     - name: x-access-token
   *       in: header
   *       description: User's access token
   *       required: true
   *       type: string
   *     responses:
   *       200:
   *          description: User successfully fetched.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Result message.
   *                    example: User was fetched successfully.
   *                  data:
   *                    type: array
   *                    items:
   *                      type: object
   *                      properties:
   *                        id:
   *                          type: string
   *                          example: e9c03ec2-3cf3-4bec-9d72-85fad5e4a06b
   *                        name:
   *                          type: string
   *                          example: Super Admin
   *                        username:
   *                          type: string
   *                          example: superadmin
   *                        password:
   *                          type: string
   *                          example: $2a$08$BWDAcdpTIZ/Yuy33vXZld.QWx4kv8t.JHBSvEI3fWLngVHIM5n/Ma
   *                        role:
   *                          type: number
   *                          example: 2
   *                        position:
   *                          type: string
   *                          example: superadmin1
   *                        approval:
   *                          type: boolean
   *                          example: false
   *                        createdAt:
   *                          type: string
   *                          example: 2023-03-19T14:07:50.893Z
   *                        updatedAt:
   *                          type: string
   *                          example: 2023-03-19T14:07:50.893Z
   *       404:
   *         description: User not found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Result message.
   *                  example: User not found.
   *       500:
   *         description: Application error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                message:
   *                  type: string
   *                  description: Application error.
   *                  example: Failed to fetch user. Please check application log.
   */
  app.get("/api/users/:id", [authJwt.verifyToken], controller.getOne);

  /**
   * @swagger
   * /api/users/{id}:
   *   patch:
   *     tags:
   *       - User Management
   *     summary: Update user
   *     description: Update user using user id.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                username:
   *                  type: string
   *                  description: The user's username.
   *                  example: newadmin
   *                password:
   *                  type: string
   *                  description: The user's password.
   *                  example: 111222333
   *     parameters:
   *     - name: id
   *       in: path
   *       description: User's id
   *       required: true
   *       type: string
   *     - name: x-access-token
   *       in: header
   *       description: User's access token
   *       required: true
   *       type: string
   *     responses:
   *       200:
   *          description: User was updated successfully.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Result message.
   *                    example: User was updated successfully.
   *       404:
   *          description: User not found, incorrect id.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Result message.
   *                    example: User not found.
   *       500:
   *          description: Application Error.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Application Error.
   *                    example: Failed to update user. Please check application log.
   */
  app.patch(
    "/api/users/:id",
    [
      authJwt.verifyToken,
      verifyUser.checkDuplicateUsername,
      verifyUser.checkRolesExisted,
    ],
    controller.update
  );
};
