import express, { Request, Response } from 'express';
import UserModel from '../../models/user';

const router = express.Router();

router.post('/add', async (req: Request, res: Response) => {
    try {
        const { name, gender, birthday, occupation, phoneNumber, profilePicture } = req.body;

        const user = await UserModel.create({ name, gender, birthday, occupation, phoneNumber, profilePicture });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.put('/edit', async (req: Request, res: Response) => {
    try {
        const { id, name, gender, birthday, occupation, phoneNumber, profilePicture } = req.body;

        const user = await UserModel.findByIdAndUpdate(id, { name, gender, birthday, occupation, phoneNumber, profilePicture }, { new: true });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.delete('/delete', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        const user = await UserModel.findByIdAndDelete(id);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default router;