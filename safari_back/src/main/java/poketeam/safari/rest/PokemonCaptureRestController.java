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
import poketeam.safari.model.PokemonCapture;
import poketeam.safari.service.PokemonCaptureService;

@RestController
@RequestMapping("/api/pokemon-capture")
@CrossOrigin("*")
public class PokemonCaptureRestController {
    private static final Logger log = LoggerFactory.getLogger(PokemonCaptureRestController.class);
	
	@Autowired
	PokemonCaptureService pokemonCaptureSrv;


	@GetMapping
	public List<PokemonCapture> allPokemonCapture()
	{
		log.info("GET /api/pokemon-capture - allPokemonCapture() called");
		return pokemonCaptureSrv.getAll();
	}

    @GetMapping("/joueur/{id}")
	public List<Pokemon> allPokemonCaptureByJoueur(@PathVariable Integer id)
	{
		log.info("GET /api/pokemon-capture/joueur/{} - allPokemonCapture() called", id);
		return pokemonCaptureSrv.getAllPokemonByIdJoueur(id);
	}


	@GetMapping("/{id}")
	public PokemonCapture fichePokemonCapture(@PathVariable Integer id, PokemonCapture pokemonCapture) {
		log.info("GET /api/pokemon-capture/{} - fichePokemonCapture() called", id);
		return pokemonCaptureSrv.getById(id);
	}


	@PostMapping
	public PokemonCapture ajoutPokemonCapture(@RequestBody PokemonCapture pokemonCapture)
	{
		log.info("POST /api/pokemon-capture - ajoutPokemonCapture() called");
		return pokemonCaptureSrv.create(pokemonCapture);
	}


	@PutMapping("/{id}")
	public PokemonCapture modifierPokemonCapture(@PathVariable Integer id, @RequestBody PokemonCapture pokemonCapture)
	{
		log.info("PUT /api/pokemon-capture/{} - modifierPokemonCapture() called", id);
		pokemonCapture.setId(id);
        
		return (PokemonCapture) pokemonCaptureSrv.update(pokemonCapture);
	}


	@DeleteMapping("/{id}")
	public void supprimerPokemonCapture(@PathVariable Integer id) {
		log.info("DELETE /api/pokemon-capture/{} - supprimerPokemonCapture() called", id);
		pokemonCaptureSrv.deleteById(id);
	}
}
