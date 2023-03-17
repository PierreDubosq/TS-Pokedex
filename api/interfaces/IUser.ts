import mongoose from 'mongoose';


interface IUser extends mongoose.Document {
  username: string;
  password: string;
  email: string;
  comparePassword(password: string): Promise<boolean>;
}


export default IUser;