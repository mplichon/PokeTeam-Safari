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

import poketeam.safari.model.Joueur;
import poketeam.safari.service.CompteService;

@RestController
@RequestMapping("/api/joueur")
@CrossOrigin("*")
public class JoueurRestController {
    private static final Logger log = LoggerFactory.getLogger(JoueurRestController.class);
	
	@Autowired
	CompteService compteSrv;


	@GetMapping
	public List<Joueur> allJoueurs()
	{
		log.info("GET /api/joueur - allJoueurs() called");
		return compteSrv.getAllJoueurs();
	}


	@GetMapping("/{id}")
	public Joueur ficheJoueur(@PathVariable Integer id, Joueur joueur) {
		log.info("GET /api/joueur/{} - ficheJoueur() called", id);
		return compteSrv.getJoueurById(id);
	}


	@PostMapping
	public Joueur ajoutJoueur(@RequestBody Joueur joueur)
	{
		log.info("POST /api/joueur - ajoutJoueur() called");
		return (Joueur) compteSrv.create(joueur);
	}


	@PutMapping("/{id}")
	public Joueur modifierJoueur(@PathVariable Integer id, @RequestBody Joueur joueur)
	{
		log.info("PUT /api/joueur/{} - modifierJoueur() called", id);
		joueur.setId(id);
		return (Joueur) compteSrv.update(joueur);
	}


	@DeleteMapping("/{id}")
	public void supprimerJoueur(@PathVariable Integer id) {
		log.info("DELETE /api/joueur/{} - supprimerJoueur() called", id);
		compteSrv.deleteById(id);
	}
}
