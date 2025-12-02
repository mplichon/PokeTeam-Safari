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

import poketeam.safari.dto.response.AdminResponse;
import poketeam.safari.model.Admin;
import poketeam.safari.model.Compte;
import poketeam.safari.service.CompteService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminRestController {
    private static final Logger log = LoggerFactory.getLogger(AdminRestController.class);
	
	@Autowired
	CompteService compteSrv;


	@GetMapping
	public List<AdminResponse> allAdmins()
	{
		log.info("GET /api/admin - allAdmins() called");
		return compteSrv.getAllAdmins().stream()
				.map(admin -> new AdminResponse(admin.getId(), admin.getLogin()))
				.toList();
	}


	@GetMapping("/{id}")
	public AdminResponse ficheAdmin(@PathVariable Integer id, Admin admin) {
		log.info("GET /api/admin/{} - ficheAdmin() called", id);
		return new AdminResponse(compteSrv.getAdminById(id).getId(), compteSrv.getAdminById(id).getLogin());
	}


	@PostMapping
	public AdminResponse ajoutAdmin(@RequestBody Admin admin)
	{
		log.info("POST /api/admin - ajoutAdmin() called");
		Compte compte = compteSrv.findByLogin(admin.getLogin());
		if (compte != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Un compte avec ce login existe déjà");
		}
		Admin createdAdmin = (Admin) compteSrv.create(admin);
		return new AdminResponse(createdAdmin.getId(), createdAdmin.getLogin());
	}


	@PutMapping("/{id}")
	public AdminResponse modifierAdmin(@PathVariable Integer id, @RequestBody Admin admin)
	{
		log.info("PUT /api/admin/{} - modifierAdmin() called", id);
		admin.setId(id);
		Admin updatedAdmin = (Admin) compteSrv.update(admin);
		return new AdminResponse(updatedAdmin.getId(), updatedAdmin.getLogin());
	}


	@DeleteMapping("/{id}")
	public void supprimerAdmin(@PathVariable Integer id) {
		log.info("DELETE /api/admin/{} - supprimerAdmin() called", id);
		compteSrv.deleteById(id);
	}
}
