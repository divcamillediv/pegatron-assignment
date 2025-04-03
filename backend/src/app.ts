import express, { Request, Response } from "express";
import cors from "cors";
import UserModel from "../models/user";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export const app = express();
app.use(express.json());
app.use(cors()); 
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

const User = UserModel;

// Create a new user
app.post('/users', async (req: Request, res: Response) => {
  try {
    const { name, gender, birthday, occupation, phoneNumber, profilePicture } = req.body;
    
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
      profilePicture
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// get all users
app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// find a specific user
app.get('/users/:id', async (req: Request, res: Response) => {
  try{
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Cannot find user' });
  }
});

// Update a user
app.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, gender, birthday, occupation, phoneNumber, profilePicture } = req.body;

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
        profilePicture
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

// delete a user
app.delete('/users/:id', async (req: Request, res: Response) => {
  try{
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Cannot delete user' });
  }
});