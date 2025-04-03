import mongoose from "mongoose";
import UserModel from '../../models/user';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, gender, birthday, occupation, phoneNumber, profilePicture } = req.body;
        
        if (!name || !gender || !birthday || !occupation || !phoneNumber) {
          res.status(400).json({ message: 'All fields are required' });
        }
    
        const user = new User({
          name,
          gender,
          birthday,
          occupation,
          phoneNumber,
          profilePicture
        });
    
        const savedUser = await user.save();
        res.status(201).json(savedUser);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
  
}
