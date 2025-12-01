package poketeam.safari.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import poketeam.safari.model.Pokemon;
import poketeam.safari.service.PokemonService;

@RestController
@RequestMapping("/api/pokemon")
@CrossOrigin("*")
public class PokemonRestController {

	private static final Logger log = LoggerFactory.getLogger(PokemonRestController.class);
	
	@Autowired
	PokemonService pokemonSrv;


	@GetMapping
	public List<Pokemon> allPokemon()
	{
		log.info("GET /api/pokemon - allPokemon() called");
		return pokemonSrv.getAll();
	}


	@GetMapping("/{id}")
	public Pokemon fichePokemon(@PathVariable Integer id, Pokemon pokemon) {
		log.info("GET /api/pokemon/{} - fichePokemon() called", id);
		return pokemonSrv.getById(id);
	}


	@PostMapping
	public Pokemon ajoutPokemon(@RequestBody Pokemon pokemon)
	{
		log.info("POST /api/pokemon - ajoutPokemon() called");
		return pokemonSrv.create(pokemon);
	}


	@PutMapping("/{id}")
	public Pokemon modifierPokemon(@PathVariable Integer id,@RequestBody Pokemon pokemon)
	{
		log.info("PUT /api/pokemon/{} - modifierPokemon() called", id);
		pokemon.setId(id);
		return (Pokemon) pokemonSrv.update(pokemon);
	}


	@DeleteMapping("/{id}")
	public void supprimerPokemon(@PathVariable Integer id) {
		log.info("DELETE /api/pokemon/{} - supprimerPokemon() called", id);
		pokemonSrv.deleteById(id);
	}
}
