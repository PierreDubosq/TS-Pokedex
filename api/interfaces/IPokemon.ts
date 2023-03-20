import mongoose from 'mongoose';


interface IPokemon extends mongoose.Document {
  number: number;
  name: string;
  types: string[];
  image: string;
}


export default IPokemon;