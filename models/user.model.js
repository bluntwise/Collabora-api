    import mongoose from 'mongoose';
    import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        unique : true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['Administrator', 'Project Manager', 'Team Member'],
        default: 'Team Member'
    },
    password: {
        type: String,
        required: true
    }
});

// Hachage du mot de passe avant sauvegarde
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model('User', UserSchema);
export default User;
