package poketeam.safari.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poketeam.safari.dao.IDAOPokemon;
import poketeam.safari.model.Pokemon;

@Service
public class PokemonService {
	
	@Autowired
	IDAOPokemon daoPokemon;

	public Pokemon getById(Integer id)
	{
		Optional <Pokemon> opt = daoPokemon.findById(id);
		if(opt.isEmpty()) {return null;}
		else {return opt.get();}
	}

	public List<Pokemon> getAll()
	{
		return daoPokemon.findAll();
	}

	public Pokemon create(Pokemon pokemon) 
	{
		return daoPokemon.save(pokemon);
	}

	public Pokemon update(Pokemon pokemon) 
	{
		return daoPokemon.save(pokemon);
	}

	public void deleteById(Integer id) 
	{
		daoPokemon.deleteById(id);
	}

	public void delete(Pokemon pokemon)
	{
		daoPokemon.delete(pokemon);
	}
}
