package poketeam.safari.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import poketeam.safari.model.Pokemon;
import poketeam.safari.model.TableApparition;
import poketeam.safari.service.PokemonService;
import poketeam.safari.service.TableApparitionService;


@RestController
@RequestMapping("/api/apparition")
public class TablaApparitionRestController {

    @Autowired
    private TableApparitionService tableApparitionService;

    @Autowired
    private PokemonService pokemonService;



   @GetMapping("/init")
   public void initialisation() {
    tableApparitionService.deleteAll();
    List<Pokemon> listePokemon = pokemonService.getAll();
        for (Pokemon p : listePokemon) {
            for (int i = 0; i < p.getFacteurApparition(); i++) {
            TableApparition ta = new TableApparition(p.getId(), 1);
            tableApparitionService.save(ta);
            }
        }
    }

    @GetMapping
    public TableApparition getAll() {
        List<TableApparition> tableApparitions = tableApparitionService.getAll();
        TableApparition tableApparition = tableApparitions.get((int)(Math.random() * tableApparitions.size()));
        return tableApparition;
    }
}