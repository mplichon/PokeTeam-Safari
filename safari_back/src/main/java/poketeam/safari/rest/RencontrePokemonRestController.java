package poketeam.safari.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import poketeam.safari.dto.response.RencontreInitResponse;
import poketeam.safari.dto.response.RencontreStatutResponse;
import poketeam.safari.model.Pokemon;
import poketeam.safari.model.RencontrePokemon;
import poketeam.safari.model.TableApparition;
import poketeam.safari.service.PokemonService;
import poketeam.safari.service.RencontrePokemonService;
import poketeam.safari.service.TableApparitionService;


@RestController
@RequestMapping("/api/rencontre")
@CrossOrigin("*")
public class RencontrePokemonRestController {
    
    @Autowired
    private RencontrePokemonService rencontrePokemonService;

    @Autowired
    private PokemonService pokemonService;

    @Autowired
    private TableApparitionService tableApparitionService;

    @GetMapping("/initialiser/{idJoueur}")
    public RencontreInitResponse initialiserRencontre(@PathVariable int idJoueur) {
        TableApparition pokemonPicker = tableApparitionService.getAll().get((int)(Math.random() * tableApparitionService.tableSize()));
        Pokemon pokemonPicked = pokemonService.getById(pokemonPicker.getIdPokemon());
        RencontrePokemon rencontre = rencontrePokemonService.createOrUpdate(new RencontrePokemon(pokemonPicked, idJoueur));
        return new RencontreInitResponse(rencontre.getId(),pokemonPicked.getId(), pokemonPicked.getNom());
    }

    @GetMapping("/pokeball/{idRencontre}")
    public RencontreStatutResponse lancerPokeball(@PathVariable Integer idRencontre) {
        String statut = rencontrePokemonService.lancerPokeball(rencontrePokemonService.getById(idRencontre));
        return new RencontreStatutResponse(statut);
    }

    @GetMapping("/boue/{idRencontre}")
    public RencontreStatutResponse lancerBoue(@PathVariable Integer idRencontre) {
        String statut = rencontrePokemonService.lancerBoue(rencontrePokemonService.getById(idRencontre));

        return new RencontreStatutResponse(statut);
    }

    @GetMapping("/appat/{idRencontre}")
    public RencontreStatutResponse donnerAppat(@PathVariable Integer idRencontre) {
        String statut = rencontrePokemonService.donnerAppat(rencontrePokemonService.getById(idRencontre));
        return new RencontreStatutResponse(statut);
    }

    @GetMapping("/fuir/{idRencontre}")
    public RencontreStatutResponse fuir(@PathVariable Integer idRencontre) {
        rencontrePokemonService.deleteById(idRencontre);
        return new RencontreStatutResponse("abandon");
    }
	
}
