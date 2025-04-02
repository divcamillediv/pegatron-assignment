import mongoose from 'mongoose';
import { Gender, Occupation } from '../types/types';
const {Schema} = mongoose;

// Interface for User document
interface IUser extends Document {
  name: string;
  gender: Gender;
  birthday: Date;
  occupation: Occupation;
  phoneNumber: string;
  profilePicture: string;
}

const userSchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  birthday: { type: Date, required: true },
  occupation: { type: String, required: true, enum: ["Student", "Teacher", "Engineer", "Unemployed"] },
  phoneNumber: { type: String, required: true },
  profilePicture: { type: String, required: false },
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;