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

import poketeam.safari.model.Admin;
import poketeam.safari.service.CompteService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminRestController {
    private static final Logger log = LoggerFactory.getLogger(AdminRestController.class);
	
	@Autowired
	CompteService compteSrv;


	@GetMapping
	public List<Admin> allAdmins()
	{
		log.info("GET /api/admin - allAdmins() called");
		return compteSrv.getAllAdmins();
	}


	@GetMapping("/{id}")
	public Admin ficheAdmin(@PathVariable Integer id, Admin admin) {
		log.info("GET /api/admin/{} - ficheAdmin() called", id);
		return compteSrv.getAdminById(id);
	}


	@PostMapping
	public Admin ajoutAdmin(@RequestBody Admin admin)
	{
		log.info("POST /api/admin - ajoutAdmin() called");
		return (Admin) compteSrv.create(admin);
	}


	@PutMapping("/{id}")
	public Admin modifierAdmin(@PathVariable Integer id, @RequestBody Admin admin)
	{
		log.info("PUT /api/admin/{} - modifierAdmin() called", id);
		admin.setId(id);
		return (Admin) compteSrv.update(admin);
	}


	@DeleteMapping("/{id}")
	public void supprimerAdmin(@PathVariable Integer id) {
		log.info("DELETE /api/admin/{} - supprimerAdmin() called", id);
		compteSrv.deleteById(id);
	}
}
