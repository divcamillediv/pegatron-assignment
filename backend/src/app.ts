import express, { Request, Response } from "express";
import cors from "cors";
import UserModel from "../models/user";
import multer from 'multer';
import fs from 'fs';
import bodyParser from 'body-parser';
import mongoose from "mongoose";

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
app.put('/user/:id', async (req: Request, res: Response) => {
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
      { new: true } // Return the updated document
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
app.delete('/user/:id', async (req: Request, res: Response) => {
  try{
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Cannot delete user' });
  }
});


// ignore

const pfpMiddleware = multer({ dest: 'upload-pfp/' });
app.post('/upload-pfp', pfpMiddleware.single('profilePic'), async (req: Request, res: Response) => {
  const uploadedPfp = [];
  if (req.file) {
    const { path, originalname } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedPfp.push(newPath.replace('upload-pfp/', ''));
  }
  res.json(uploadedPfp);
});

