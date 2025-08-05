// controllers/auth.controller.js
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

export async function login(request, reply) {
    const { firstName, password } = request.body;
    const user = await User.findOne({ firstName });
    if (!user) {
        return reply.code(401).send({ error: 'Email ou mot de passe incorrect' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return reply.code(401).send({ error: 'Passwords do not match' });
    }

    const token = request.server.jwt.sign({
        id: user._id.toString(),
        email: user.firstName,
        role: user.role
    });

    return reply.send({ token });
}
