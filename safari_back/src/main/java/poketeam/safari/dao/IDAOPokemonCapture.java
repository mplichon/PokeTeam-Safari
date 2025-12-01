package poketeam.safari.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import poketeam.safari.model.PokemonCapture;

public interface IDAOPokemonCapture extends JpaRepository<PokemonCapture, Integer> {

    @Query("SELECT pc FROM PokemonCapture pc WHERE pc.joueur.id=:id")
    public List<PokemonCapture> findAllByIdJoueur(@Param("id") Integer id);
}
