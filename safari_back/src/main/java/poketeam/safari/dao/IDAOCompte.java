package poketeam.safari.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import poketeam.safari.model.Compte;

public interface IDAOCompte extends JpaRepository<Compte, Integer> {

}
