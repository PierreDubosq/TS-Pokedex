import mongoose from 'mongoose';

import IPokemon from '../interfaces/IPokemon';


const PokemonSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  types: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});


const Pokemon = mongoose.model<IPokemon>('Pokemon', PokemonSchema);


export default Pokemon;