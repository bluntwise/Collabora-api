import Fastify from 'fastify';
import  mongoose from 'mongoose';
import fastifyMongo from '@fastify/mongodb';
import cors from '@fastify/cors'

// Import routes
import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js';
import dotenv from "dotenv";
import fastifyJwt from "@fastify/jwt";
import authRoutes from "./routes/auth.routes.js";



dotenv.config();

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
fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'secret123'
});

// Middleware d'authentification réutilisable
fastify.decorate("authenticate", async function (request, reply) {
    try {
        await request.jwtVerify(); // vérifie le token présent dans Authorization: Bearer <token>
    } catch (err) {
        reply.code(401).send({ error: "Unauthorized" }); // si pas de token ou token invalide
    }
});



fastify.register(cors, {
    origin: '*', // ou ['http://localhost:5173'] si besoin
    methods: ['GET', 'POST', 'PUT', 'DELETE']
});
fastify.register(userRoutes, { prefix : '/api/v1/users'});
fastify.register(projectRoutes, { prefix : '/api/v1/projects'});
fastify.register(authRoutes, { prefix: '/api/v1/auth' });


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
