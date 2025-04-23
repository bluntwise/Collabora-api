import * as userController from '../controllers/user.controller.js';  // Import correct des exports nommés
import { auth } from '../middlewares/auth.js'
async function routes(fastify, options) {
    fastify.get('/', userController.getAllUsers);
    fastify.get('/:id', userController.getUserById);
    fastify.post('/', {preHandler : auth}, userController.createUser);
    fastify.put('/:id', userController.updateUser);
    fastify.delete('/:id', userController.deleteUser);
    fastify.get('/test', userController.testUser)
}
export default routes;
