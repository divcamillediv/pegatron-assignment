import express, { Request, Response } from "express";
import cors from "cors";
import UserModel from "../models/user";

export const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

const User = UserModel;

app.get('/users', async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
});

app.post('/users', async (req: Request, res: Response) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
});

