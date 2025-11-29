package poketeam.safari.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import poketeam.safari.model.RencontrePokemon;
import poketeam.safari.service.RencontrePokemonService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/rencontre")
public class RencontrePokemonRestController {
    
    @Autowired
    private RencontrePokemonService rencontrePokemonService;

    @Autowired
    private PokemonService pokemonService;

    @PostMapping("/initialiser")
    public RencontrePokemon initialiserRencontre(@RequestBody Integer idPokemon) {
        return rencontrePokemonService.createOrUpdate(new RencontrePokemon(pokemonService.getById(idPokemon)));
    }

    @GetMapping("/pokeball/{idRencontre}")
    public String lancerPokeball(@RequestParam Integer idRencontre) {
        return rencontrePokemonService.lancerPokeball(rencontrePokemonService.getById(idRencontre));
    }

    @GetMapping("/boue/{idRencontre}")
    public String lancerBoue(@RequestParam Integer idRencontre) {
        return rencontrePokemonService.lancerBoue(rencontrePokemonService.getById(idRencontre));
    }

    @GetMapping("/appat/{idRencontre}")
    public String donnerAppat(@RequestParam Integer idRencontre) {
        return rencontrePokemonService.donnerAppat(rencontrePokemonService.getById(idRencontre));
    }

    @GetMapping("/fuir/{idRencontre}")
    public String fuir(@RequestParam Integer idRencontre) {
        rencontrePokemonService.deleteById(idRencontre);
        return "Vous avez fuit la rencontre.";
    }
	
}
