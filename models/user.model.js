import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
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
        unique: true
    },
    role: {
        type: String,
        enum: ['Administrator', 'Project Manager', 'Team Member'],
        default: 'Team Member',
    },
    password : {
        type: String,
        required: true
    }
})
UserSchema.virtual('id').get(function() {
    return this._id.toHexString();
});


UserSchema.set('toJSON', {
    virtuals: true,    // Inclut `id`
    versionKey: false, // Supprime `__v`
    transform: (doc, ret) => {
        delete ret._id;     // Supprime `_id`, ne garde que `id`
        delete ret.password; // Optionnel : ne pas exposer le mot de passe
    }
});
UserSchema.set('toObject', { virtuals: true });

const User = mongoose.model('User', UserSchema);

export default User;


