import {Request, Response} from 'express';
import User, {IUser} from '../models/users';
import jwt from 'jsonwebtoken';


export const signup = async (req: Request, res:Response) => {
    const user: IUser = new User({
        username:  req.body.username,
        email:  req.body.email,
        password:  req.body.password
    });
    user.password = await user.encrypPassword(user.password);

    try {
        const userSaved = await user.save();
        console.log(userSaved);
        const token: string = jwt.sign({_id: userSaved._id},process.env.TOKEN_SECRET || "SDFJ4579475USHDFHDSF", { expiresIn: '24h' });
        res.header('auth-token', token).send({message: "User saved"});
    } catch (err) {
        res.send({messge: 'Something went wrong', error: err})
    }
}

export const signin = async (req: Request, res:Response) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) 
            return res.status(400).send({message: "User or pass incorrect"});

        const correctPassword: boolean = await user.validatePassword(req.body.password);
        if (!correctPassword)
            return res.status(400).send({message: "User or pass incorrect"});

        const token: string = jwt.sign({_id: user._id},process.env.TOKEN_SECRET || "SDFJ4579475USHDFHDSF", { expiresIn: '24h' });
        res.header('auth-token', token).send({message: "User loged in", data: user});
    } catch (err) {
        res.send({messge: 'Something went wrong', error: err})
    }
}

export const profile = async (req: Request, res:Response) => {
    try {
        const user = await User.findById(req.userId, {password: 0});
        if(!user)
            return res.status(400).send({message: "Not user found"});
        res.send(user);
    } catch (err) {
        res.send({messge: 'Something went wrong', error: err});
    }
}