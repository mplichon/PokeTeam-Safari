package poketeam.safari.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import poketeam.safari.model.PokemonCapture;

public interface IDAOPokemonCapture extends JpaRepository<PokemonCapture, Integer> {

}
