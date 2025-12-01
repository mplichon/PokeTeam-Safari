package poketeam.safari.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poketeam.safari.dao.IDAOPokemonCapture;
import poketeam.safari.model.Pokemon;
import poketeam.safari.model.PokemonCapture;

@Service
public class PokemonCaptureService {

    @Autowired
    IDAOPokemonCapture daoPokemonCapture;

    public PokemonCapture getById(Integer id) {
		Optional<PokemonCapture> opt = daoPokemonCapture.findById(id);
		if(opt.isEmpty()) {return null;}
		else {return opt.get();}
	}
	
	public List<PokemonCapture> getAll() {
		return daoPokemonCapture.findAll();
	}

	public List<Pokemon> getAllPokemonByIdJoueur(Integer id) {
		List<Pokemon> pokemons= new ArrayList<Pokemon>();
		
		for (PokemonCapture pokemonCapture : daoPokemonCapture.findAllByIdJoueur(id)) {
			pokemons.add(pokemonCapture.getPokemon());
		}

		return pokemons;
	}

	public PokemonCapture create(PokemonCapture pokemonCapture) {
		return daoPokemonCapture.save(pokemonCapture);
	}

	public PokemonCapture update(PokemonCapture pokemonCapture) {
		return daoPokemonCapture.save(pokemonCapture);
	}

	public void deleteById(Integer id) {
		daoPokemonCapture.deleteById(id);
	}

	public void delete(PokemonCapture pokemonCapture) {
		daoPokemonCapture.delete(pokemonCapture);
	}
}
