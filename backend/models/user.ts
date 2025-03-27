import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
    name: String,
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    birthday: String,
    occupation: { type: String, enum: ["Student", "Teacher", "Engineer", "Unemployed"] },
    phoneNumber: String,
    profilePicture: String,
});

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;