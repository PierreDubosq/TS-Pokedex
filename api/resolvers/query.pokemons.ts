import IPokemon from '../interfaces/IPokemon';
import Pokemon from '../models/Pokemon';


const pokemons = async (): Promise<IPokemon[]> => {
  const pokemons: IPokemon[] = await Pokemon.find();

  return pokemons;
}


export default pokemons;