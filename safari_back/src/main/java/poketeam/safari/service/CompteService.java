package poketeam.safari.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import poketeam.safari.dao.IDAOCompte;
import poketeam.safari.model.Admin;
import poketeam.safari.model.Compte;
import poketeam.safari.model.Joueur;

@Service
public class CompteService {
    
    @Autowired
    IDAOCompte daoCompte;

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    // @Autowired
	// PasswordEncoder passwordEncoder;

    // getById
    public Compte getById(Integer id) {
		Optional<Compte> opt = daoCompte.findById(id);
		if(opt.isEmpty()) {return null;}
		else {return opt.get();}
	}

    public Joueur getJoueurById(Integer id) {
		Optional <Compte> opt = daoCompte.findById(id);
		if(opt.isEmpty()) {return null;}
		else {
			if(opt.get() instanceof Joueur) {
				return (Joueur) opt.get();
			}
			else {
				throw new RuntimeException("L'id recu n'est pas celui d'un joueur...");
			}
		}
	}

    public Admin getAdminById(Integer id) {
		Optional<Compte> opt = daoCompte.findById(id);
		if(opt.isEmpty()) {return null;}
		else {
			if(opt.get() instanceof Admin) {
				return (Admin) opt.get();
			}
			else {
				throw new RuntimeException("L'id recu n'est pas celui d'un admin...");
			}
		}
	}

    public Compte getByLoginAndPassword(String login,String password) {
		return daoCompte.findByLoginAndPassword(login,password);
	}
	
    // getAll
	public List<Compte> getAll() {
		return daoCompte.findAll();
	}

    public List<Joueur> getAllJoueurs() {
		return daoCompte.findAllJoueurs();
	}
    
    public List<Admin> getAllAdmins() {
		return daoCompte.findAllAdmins();
	}

    // create / update / delete
	public Compte create(Compte compte) {
        compte.setPassword(passwordEncoder.encode(compte.getPassword()));
		return daoCompte.save(compte);
	}

	public Compte update(Compte compte) {
        // if (compte.getPassword() != null) {
		// 	compte.setPassword(passwordEncoder.encode(compte.getPassword()));
		// }
		return daoCompte.save(compte);
	}

	public void deleteById(Integer id) {
		daoCompte.deleteById(id);
	}

	public void delete(Compte compte) {
		daoCompte.delete(compte);
	}

}
