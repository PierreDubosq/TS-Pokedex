import IUser from '../interfaces/IUser';

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
});


UserSchema.pre<IUser>('save', function (next): void {
  if (!this.isModified('password')) return next();

  bcrypt.hash(this.password, 10, (error, hash) => {
    if (error) return next(error);

    this.password = hash;
    next();
  });
});


UserSchema.methods.comparePassword = function (password: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (error, same) => {
      if (error) return reject(error);

      resolve(same);
    });
  });
}


const User = mongoose.model<IUser>('User', UserSchema);


export default User;