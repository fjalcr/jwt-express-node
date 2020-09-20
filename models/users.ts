import {Schema, model, Document} from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document{
    name: string,
    email: string,
    password: string,
    encrypPassword(password: string ): Promise<string>,
    validatePassword(password: string ): Promise<boolean>,
}

const userSchema = new Schema({
    name: {type: String, required: true, min: 8, lowercase: true, trim: true},
    email: {type: String, required: true, unique: true, trim: true, lowercase: true},
    password: {type: String, required: true, trim: true}
})

userSchema.methods.encrypPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}
userSchema.methods.validatePassword = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password,this.password);
}

export default model<IUser>('User', userSchema);