import * as projectController from '../controllers/project.controller.js';
import {getMyProjects} from "../controllers/project.controller.js";

async function routes(fastify, options) {

    fastify.post('/', projectController.createProject);
    fastify.get('/', projectController.getAllProjects)
    fastify.get('/:id', projectController.getProjectById);
    fastify.put('/:id', projectController.updateProject);
    fastify.delete('/:id', projectController.deleteProject);
    fastify.get('/my-projects', {preHandler: fastify.authenticate}, projectController.getMyProjects);

}

export default routes;