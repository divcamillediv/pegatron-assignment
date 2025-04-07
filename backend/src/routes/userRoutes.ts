import express, { Request, Response } from 'express';
import UserModel from '../../models/user.ts';
import mongoose from 'mongoose';

const router = express.Router();

const User = UserModel;

// Create a new user
router.post('/users', async (req: Request, res: Response) => {
  try {
    const { name, gender, birthday, occupation, phoneNumber, profilePic } = req.body;
    
    if (!name || !gender || !birthday || !occupation) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    const user = new User({
      name,
      gender,
      birthday,
      occupation,
      phoneNumber,
      profilePic
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all or searched users
router.get('/users', async (req: Request, res: Response) => {
    const search = req.query.search?.toString().trim(); 
  
    try {
      let users;
  
      if (search) {
        users = await User.find({
          $or: [
            { name: { $regex: search, $options: 'i' } },
            {
              $expr: {
                $eq: [
                  { $toLower: '$gender' },
                  search
                ]
              } },
            { occupation: { $regex: search, $options: 'i' } },
            { phoneNumber: { $regex: search, $options: 'i' } },
          ]
        });
      } else {
        users = await User.find();
      }
  
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// Find a specific user - for testing purposes
router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Cannot find user' });
  }
});

// Edit a user
router.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, gender, birthday, occupation, phoneNumber, profilePic } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid user ID' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        gender,
        birthday,
        occupation,
        phoneNumber,
        profilePic
      },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a user
router.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Cannot delete user' });
  }
});

export default router;