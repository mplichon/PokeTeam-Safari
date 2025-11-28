package poketeam.safari.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import poketeam.safari.model.Admin;
import poketeam.safari.model.Compte;
import poketeam.safari.model.Joueur;

public interface IDAOCompte extends JpaRepository<Compte, Integer> {

    @Query("FROM Joueur")
    public List<Joueur> findAllJoueurs();

    @Query("FROM Admin")
    public List<Admin> findAllAdmins();

    public Compte findByLoginAndPassword(String login, String password);

    public Optional<Compte> findByLogin(String login);
}
