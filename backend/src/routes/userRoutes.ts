import express, { Request, Response } from 'express';
import UserModel from '../../models/user';

const router = express.Router();

router.post('/add', async (req: Request, res: Response) => {
    try {
        const { name, gender, birthday, occupation, phoneNumber, profilePicture } = req.body;

        if (!name || !gender || !birthday || !occupation || !phoneNumber || !profilePicture) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await UserModel.create({ name, gender, birthday, occupation, phoneNumber, profilePicture });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default router;