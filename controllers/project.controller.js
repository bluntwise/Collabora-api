import User from "../models/user.model.js";
import Project from "../models/project.model.js";
import {loggers} from "winston";
import logger from "../helpers/logger.js";

export const createProject  = async (req, res) => {
    try{
        const projectManager = await User.findById(req.body.projectManager);

        if (!projectManager || !["Administrator", "Project Manager"].includes(projectManager.role)) {
            return res.status(400).send({error: "Invalid Project Manager"});
        }

        for (let memberId of req.body.teamMembers) {
            const teamMember = await User.findById(memberId)
            if (!teamMember) {
                return res.status(400).send({ message : `Invalid Team Member : ${ memberId }` });
            }
        }

        const project = new Project(req.body);
        await project.save();
        res.send(project);

        logger.info("POST New Project Successfully");
        logger.info(JSON.stringify(project));
    }catch (error){
        res.status(400).send({ message: error.message });
        logger.error(JSON.stringify(error));
    }
}


export const getAllProjects = async (req, res) => {
    try{
        const project = await Project.find().populate(
            "projectManager",
            "firstName lastName email"
        );
        logger.info("GET All PROJECTS")
        res.send(project)
    }catch (error){
        res.status(400).send({ message: error.message });
        logger.error(JSON.stringify(error));
    }
}

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).send({error: "Project not found"});
        }

        res.send(project)
    }catch (error){
        res.status(400).send({ message: error.message });
    }
}

export const updateProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const updates = req.body;


        if (updates.projectManager) {
            const projectManager = await User.findById(updates.projectManager);
            if (!projectManager || !["Admin", "Project Manager"].includes(projectManager.role)){
                return res.status(404).send({error: "Project not found"});
            }
        }

        if (updates.teamMembers) {
            for (let memberId of updates.teamMembers) {
                const teamMember = await User.findById(memberId)
                if (!teamMember) {
                    return res.status(400).send({ message : `Invalid Team Member : ${ memberId }` });
                }
            }
        }


        const updatedProject = await Project.findByIdAndUpdate(projectId, updates, {new : true});

        if (!updatedProject){
            return res.status(400).send({ message : `Project not found` });
        }

        res.send(updatedProject);
    }catch (error){
        res.status(400).send({ message: error.message });
    }
}

export const deleteProject = async (request, reply) => {
    try {
        const project = await Project.findOneAndDelete({ projectId: request.params.id });

        if (!project) {
            return reply.code(404).send({ error: "Project not found" });
        }

        return reply.code(200).send({ message: "Project deleted", project });
    } catch (error) {
        return reply.code(400).send({ message: error.message });
    }
};