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

import poketeam.safari.dto.response.JoueurResponse;
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
	public List<JoueurResponse> allJoueurs()
	{
		log.info("GET /api/joueur - allJoueurs() called");
		return compteSrv.getAllJoueurs().stream()
				.map(joueur -> new JoueurResponse(joueur.getId(), joueur.getLogin(), joueur.getSurnom()))
				.toList();
	}


	@GetMapping("/{id}")
	public JoueurResponse ficheJoueur(@PathVariable Integer id, Joueur joueur) {
		log.info("GET /api/joueur/{} - ficheJoueur() called", id);
		Joueur foundJoueur = compteSrv.getJoueurById(id);
		return new JoueurResponse(foundJoueur.getId(), foundJoueur.getLogin(), foundJoueur.getSurnom());
	}


	@PostMapping
	public JoueurResponse ajoutJoueur(@RequestBody Joueur joueur)
	{
		log.info("POST /api/joueur - ajoutJoueur() called");
		Joueur createdJoueur = (Joueur) compteSrv.create(joueur);
		return new JoueurResponse(createdJoueur.getId(), createdJoueur.getLogin(), createdJoueur.getSurnom());
	}


	@PutMapping("/{id}")
	public JoueurResponse modifierJoueur(@PathVariable Integer id, @RequestBody Joueur joueur)
	{
		log.info("PUT /api/joueur/{} - modifierJoueur() called", id);
		joueur.setId(id);
		Joueur updatedJoueur = (Joueur) compteSrv.update(joueur);
		return new JoueurResponse(updatedJoueur.getId(), updatedJoueur.getLogin(), updatedJoueur.getSurnom());
	}


	@DeleteMapping("/{id}")
	public void supprimerJoueur(@PathVariable Integer id) {
		log.info("DELETE /api/joueur/{} - supprimerJoueur() called", id);
		compteSrv.deleteById(id);
	}
}
