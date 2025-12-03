package poketeam.safari.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import poketeam.safari.dto.request.JoueurCreateAsAdminRequest;
import poketeam.safari.dto.request.JoueurCreationRequest;
import poketeam.safari.dto.request.JoueurUpdateAsAdminRequest;
import poketeam.safari.dto.response.JoueurResponse;
import poketeam.safari.model.Compte;
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
				.map(joueur -> new JoueurResponse(
					joueur.getId(), 
					joueur.getLogin(), 
					joueur.getSurnom(), 
					joueur.getInventaire().getNbPokeball(),
					joueur.getInventaire().getNbFriandise(),
					joueur.getInventaire().getNbBoue()
				))
				.toList();
	}
	


	@GetMapping("/{id}")
	public JoueurResponse ficheJoueur(@PathVariable Integer id, Joueur joueur) {
		log.info("GET /api/joueur/{} - ficheJoueur() called", id);
		Joueur foundJoueur = compteSrv.getJoueurById(id);
		return new JoueurResponse(
			foundJoueur.getId(), 
			foundJoueur.getLogin(), 
			foundJoueur.getSurnom(), 
			foundJoueur.getInventaire().getNbPokeball(),
			foundJoueur.getInventaire().getNbFriandise(),
			foundJoueur.getInventaire().getNbBoue()
		);
	}

    @GetMapping("/{id}/pseudo")
    public String getPseudoById(@PathVariable Integer id){
        Joueur foundJoueur = compteSrv.getJoueurById(id);
        return foundJoueur.getSurnom();
    }


	@PostMapping
	public JoueurResponse ajoutJoueur(@RequestBody JoueurCreationRequest joueurToCreate) throws Exception
	{
		log.info("POST /api/joueur - ajoutJoueur() called");
        Joueur joueur = new Joueur(joueurToCreate.getUsername(), joueurToCreate.getPassword(), joueurToCreate.getSurnom());
		Compte compte = compteSrv.findByLogin(joueur.getLogin());
		if (compte != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Un compte avec ce login existe déjà");
		}
		Joueur createdJoueur = (Joueur) compteSrv.create(joueur);
		return new JoueurResponse(
			createdJoueur.getId(), 
			createdJoueur.getLogin(), 
			createdJoueur.getSurnom(), 
			createdJoueur.getInventaire().getNbPokeball(),
			createdJoueur.getInventaire().getNbFriandise(),
			createdJoueur.getInventaire().getNbBoue()
		);
	}

	@PostMapping("/admin")
	public JoueurResponse ajoutJoueurAsAdmin(@RequestBody JoueurCreateAsAdminRequest joueurToCreate) throws Exception
	{
		log.info("POST /api/joueur/admin - ajoutJoueur() called");
        Joueur joueur = joueurToCreate.convert();
		Compte compte = compteSrv.findByLogin(joueur.getLogin());
		if (compte != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Un compte avec ce login existe déjà");
		}
		Joueur createdJoueur = (Joueur) compteSrv.create(joueur);
		return new JoueurResponse(
			createdJoueur.getId(), 
			createdJoueur.getLogin(), 
			createdJoueur.getSurnom(), 
			createdJoueur.getInventaire().getNbPokeball(),
			createdJoueur.getInventaire().getNbFriandise(),
			createdJoueur.getInventaire().getNbBoue()
		);
	}


	@PutMapping("/{id}")
	public JoueurResponse modifierJoueur(@PathVariable Integer id, @RequestBody Joueur joueur)
	{
		log.info("PUT /api/joueur/{} - modifierJoueur() called", id);
		joueur.setId(id);
		Joueur updatedJoueur = (Joueur) compteSrv.update(joueur);
		return new JoueurResponse(
			updatedJoueur.getId(), 
			updatedJoueur.getLogin(), 
			updatedJoueur.getSurnom(), 
			updatedJoueur.getInventaire().getNbPokeball(),
			updatedJoueur.getInventaire().getNbFriandise(),
			updatedJoueur.getInventaire().getNbBoue()
		);
	}

	@PutMapping("/admin/{id}")
	public JoueurResponse modifierJoueurAsAdmin(@PathVariable Integer id, @RequestBody JoueurUpdateAsAdminRequest joueurRequest)
	{
		log.info("PUT /api/joueur/admin/{} - modifierJoueur() called", id);
		
		joueurRequest.setId(id);
		Joueur joueur = joueurRequest.convert();
		Joueur joueurBdd = compteSrv.getJoueurById(id);

		joueur.setPassword(joueurBdd.getPassword());
		joueur.setPositionActuelle(joueurBdd.getPositionActuelle());

		Joueur updatedJoueur = (Joueur) compteSrv.update(joueur);
		return new JoueurResponse(
			updatedJoueur.getId(), 
			updatedJoueur.getLogin(), 
			updatedJoueur.getSurnom(), 
			updatedJoueur.getInventaire().getNbPokeball(),
			updatedJoueur.getInventaire().getNbFriandise(),
			updatedJoueur.getInventaire().getNbBoue()
		);
	}


	@DeleteMapping("/{id}")
	public void supprimerJoueur(@PathVariable Integer id) {
		log.info("DELETE /api/joueur/{} - supprimerJoueur() called", id);
		compteSrv.deleteById(id);
	}

	@GetMapping("/login/{login}")
	public String getCompteByLogin(@PathVariable String login) {
		log.info("GET /api/joueur/login/{} - getCompteByLogin() called", login);
		Compte compte = compteSrv.findByLogin(login);
		if (compte != null) {
			return "Compte found: ID = " + compte.getId() + ", Login = " + compte.getLogin();
		} else {
			return "No compte found with login: " + login;
		}
	}
	
}
