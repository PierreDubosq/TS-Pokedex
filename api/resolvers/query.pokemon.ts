import IPokemon from '../interfaces/IPokemon';
import Pokemon from '../models/Pokemon';


const pokemon = async (parent: any, args: any): Promise<IPokemon> => {
  const pokemon: IPokemon | null = await Pokemon.findOne({ number: args.number });

  if (!pokemon) throw new Error('Pokemon not found');

  return pokemon;
}


export default pokemon;