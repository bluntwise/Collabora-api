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

// UserSchema.pre("save", async function (next) {
//     try{
//         if (this.isModified('password') || this.isNew) {
//             const salt = await bcrypt.genSalt(10);
//         }
//     }catch(error){
//         return next(error);
//     }
// })

const User = mongoose.model('User', UserSchema);

export default User;


