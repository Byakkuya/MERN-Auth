import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hadhedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ username, email, password: hadhedPassword });
    try {
        await newUser.save()
        res.status(201).json({ message: 'User created' });
    }
    catch (error) {
        next(error);
    }
};
export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(new errorHandler(404,'user not found'));
        const validPassword = await bcryptjs.compare(password, validUser.password);
        if (!validPassword) return next(new errorHandler(401,'invalid credentials'));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hadhedPassword, ...rest } = validUser._doc;
        res
            .cookie('acces_token', token, { httpOnly: true , expires: new Date(Date.now() + 36000)})
            .status(200)
            .json(rest);


    } catch (error) {
        next(error);
    }
};