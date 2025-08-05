import * as authController from '../controllers/auth.controller.js';

export default async function (fastify, opts) {
    fastify.post('/login', authController.login);
}