import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hadhedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ username, email, password: hadhedPassword });
    try {
        await newUser.save()
        res.status(201).json({ message: 'User created' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};