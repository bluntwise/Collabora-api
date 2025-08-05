import * as userController from '../controllers/user.controller.js';  // Import correct des exports nommés
async function routes(fastify, options) {
    fastify.get('/me', { preHandler : fastify.authenticate}, userController.getCurrentUser)
    fastify.get('/', { preHandler: fastify.authenticate }, userController.getAllUsers);
    fastify.get('/:id', { preHandler: fastify.authenticate }, userController.getUserById);
    fastify.post('/', userController.createUser);
    fastify.put('/:id', { preHandler: fastify.authenticate }, userController.updateUser);
    fastify.delete('/:id', { preHandler: fastify.authenticate }, userController.deleteUser);
}
export default routes;
