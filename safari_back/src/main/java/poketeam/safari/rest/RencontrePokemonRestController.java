package poketeam.safari.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import poketeam.safari.dao.dto.request.RencontreInitRequest;
import poketeam.safari.dao.dto.response.RencontreInitResponse;
import poketeam.safari.dao.dto.response.RencontreStatutResponse;
import poketeam.safari.model.RencontrePokemon;
import poketeam.safari.service.RencontrePokemonService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/rencontre")
public class RencontrePokemonRestController {
    
    @Autowired
    private RencontrePokemonService rencontrePokemonService;

    @Autowired
    private PokemonService pokemonService;

    @PostMapping("/initialiser")
    public RencontreInitResponse initialiserRencontre(@RequestBody RencontreInitRequest request) {
        
        RencontrePokemon rencontre = rencontrePokemonService.createOrUpdate(new RencontrePokemon(pokemonService.getById(request.getIdPokemon())));
        return new RencontreInitResponse(rencontre.getId());
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
