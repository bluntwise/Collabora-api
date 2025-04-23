import Fastify from 'fastify';
import  mongoose from 'mongoose';
import fastifyMongo from '@fastify/mongodb';
import { auth } from './middlewares/auth.js';
import cors from '@fastify/cors'

// Import routes
import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js';
import dotenv from "dotenv";



dotenv.config();

console.log(process.env.MONGODB_URI);
// connect database
mongoose
    .connect(process.env.MONGODB_URI)
    .then((conn) => {
        console.log('MongoDB Connected');
    })
    .catch((err) => {
        console.error("MongoDB Not Connected", err);
});


// start my server
const fastify = Fastify();
//
// fastify.register(fastifyMongo, {
//     forceClose: true,
//     url: process.env.MONGODB_URI
// });

fastify.addHook("preHandler", auth);

fastify.register(cors, {
    origin: '*', // ou ['http://localhost:5173'] si besoin
    methods: ['GET', 'POST', 'PUT', 'DELETE']
});
fastify.register(userRoutes, { prefix : '/api/v1/users'});
fastify.register(projectRoutes, { prefix : '/api/v1/projects'});


const start = async () => {
    try {
        await fastify.listen({ port: process.env.PORT, host: '0.0.0.0' });
        console.log('Serveur démarré sur http://localhost:' + process.env.PORT);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

await start();

export default fastify;
