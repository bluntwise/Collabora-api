import * as projectController from '../controllers/project.controller.js';

async function routes(fastify, options) {
    fastify.post('/', projectController.createProject);
    fastify.get('/', projectController.getAllProjects)
    fastify.get('/:id', projectController.getProjectById);
    fastify.put('/:id', projectController.updateProject);
    fastify.delete('/:id', projectController.deleteProject);
}

export default routes;